'use server';

import { ID, Query } from 'node-appwrite';
import { createAdminClient } from '../appwrite';
import { cookies } from 'next/headers';
import {
  getSession,
  handleLogin,
  handleSignup,
  handleLogout
} from '@auth0/nextjs-auth0';

/**
 * We assume these env variables are defined in your .env:
 *   APPWRITE_DATABASE_ID: your Appwrite DB
 *   APPWRITE_USERS_COLLECTION: the "users" collection ID
 */
const {
  APPWRITE_DATABASE_ID: DATABASE_ID,
  APPWRITE_USERS_COLLECTION: USERS_COLLECTION_ID,
} = process.env;

/**
 * Retrieves a user from Appwrite by either `userId` (Auth0 `sub`) or `email`.
 * Returns `null` if none found.
 */
export const getUserInfo = async ({
  userId,
  email
}: {
  userId?: string;
  email?: string;
}) => {
  try {
    console.log('Getting user info for userId or email:', userId || email);
    const { database } = await createAdminClient();

    // Build query by userId or email
    const query = userId
      ? [Query.equal('userId', userId)]
      : [Query.equal('email', email)];

    const result = await database.listDocuments(
      DATABASE_ID!,
      USERS_COLLECTION_ID!,
      query
    );

    if (result.total === 0) {
      console.log('No user found in Appwrite');
      return null;
    }

    console.log('User info:', result);
    return result.documents[0];
  } catch (error) {
    console.error('Error in getUserInfo:', error);
    return null;
  }
};

/**
 * Updates an existing Appwrite user doc (identified by `existingUser.$id`)
 * to set `userId = newUserId`. Used when you find a user by email
 * but need to store the correct Auth0 `sub`.
 */
export const updateUserInAppwrite = async (existingUser: any, newUserId: string) => {
  try {
    const { database } = await createAdminClient();

    const updatedUser = await database.updateDocument(
      DATABASE_ID!,
      USERS_COLLECTION_ID!,
      existingUser.$id,
      { userId: newUserId }
    );

    console.log('Updated user in Appwrite:', updatedUser);
    return updatedUser;
  } catch (error) {
    console.log('Error in updateUserInAppwrite:', error);
    return null;
  }
};

/**
 * syncUserFromAuth0 ensures that the Auth0 user data (sub, email, name, etc.)
 * is reflected in the Appwrite "users" collection. If no doc is found by sub
 * or email, a new one is created. If found by email, it is updated to store sub.
 */
export const syncUserFromAuth0 = async (session: any) => {
  const {
    sub: userId,
    email,
    phone_number: phoneNumber,
    given_name: firstName,
    family_name: lastName
  } = session.user;

  console.log('User details from Auth0:', { userId, email, phoneNumber, firstName, lastName });

  // Try to find user in Appwrite by userId
  let appwriteUser = await getUserInfo({ userId });

  if (!appwriteUser) {
    // If not found by userId, try email
    appwriteUser = await getUserInfo({ email });
    if (appwriteUser) {
      // Update existing user doc with new Auth0 userId
      appwriteUser = await updateUserInAppwrite(appwriteUser, userId);
    } else {
      // No existing doc => create new
      const newUser = {
        userId,
        email,
        phoneNumber,
        firstName,
        lastName
      };
      appwriteUser = await createUserInAppwrite(newUser);
    }
  }

  return appwriteUser;
};

/**
 * Attempts to sign in the user by calling Auth0's handleLogin,
 * then fetching their session, then returning any matching
 * user doc from Appwrite (or null if none found).
 */
export const signIn = async ({
  email,
  password
}: {
  email: string;
  password: string;
}) => {
  try {
    // Step 1: Log in with Auth0
    await handleLogin({
      returnTo: `${process.env.NEXT_PUBLIC_BASE_URL}/`
    });

    // Step 2: Get Auth0 session
    const session = await getSession();
    if (!session || !session.user) {
      console.error('Session not found');
      return null;
    }

    // Step 3: Return the matching Appwrite user (if any)
    const appwriteUser = await getUserInfo({ userId: session.user.sub });
    return appwriteUser;
  } catch (error) {
    console.error('Error in signIn:', error);
    return null;
  }
};

/**
 * Attempts to sign up the user by calling Auth0's handleSignup,
 * then creating any additional data in Appwrite or Dwolla as needed.
 * Returns the created user doc if successful, or throws on error.
 */
export const signUp = async ({
  email,
  password,
  ...userData
}: {
  email: string;
  password: string;
  [key: string]: any;
}) => {
  try {
    // Step 1: Sign up with Auth0
    await handleSignup({
      returnTo: `${process.env.NEXT_PUBLIC_BASE_URL}/`
    });

    // Step 2: Get session
    const session = await getSession();
    if (!session || !session.user) {
      console.error('Session not found');
      return null;
    }

    // (Optional) Insert Dwolla logic or anything else here...
    // e.g. createDwollaCustomer(...) etc.

    // Step 3: Prepare user data for Appwrite
    const userId = session.user.sub;
    const newUser = {
      ...userData,
      userId,
      email: session.user.email
    };

    // Step 4: Create user doc in Appwrite
    const { database } = await createAdminClient();
    const createdUser = await database.createDocument(
      DATABASE_ID!,
      USERS_COLLECTION_ID!,
      ID.unique(),
      newUser
    );

    return createdUser;
  } catch (error) {
    console.error('Error in signUp:', error);
    throw error;
  }
};

/**
 * Retrieves the currently logged-in Auth0 user (via getSession),
 * then calls syncUserFromAuth0 to ensure Appwrite doc is up-to-date.
 * Returns the Appwrite user doc or a redirect instruction if not found.
 */
export const getLoggedInUser = async () => {
  try {
    const session = await getSession();

    if (!session || !session.user) {
      console.log('No session found');
      return { redirect: '/sign-up' };
    }

    // Ensure user doc in Appwrite is created/updated
    const appwriteUser = await syncUserFromAuth0(session);
    return appwriteUser;
  } catch (error) {
    console.log('Error in getLoggedInUser:', error);
    return null;
  }
};

/**
 * Logs the user out by calling Auth0's handleLogout, then removing
 * cookies. Redirects them to the specified returnTo URL.
 */
export const logoutAccount = async () => {
  try {
    await handleLogout({
      returnTo: `${process.env.NEXT_PUBLIC_BASE_URL}/`
    });
    cookies().delete('auth0-session');
    return true;
  } catch (error) {
    console.log('Error in logoutAccount:', error);
    return null;
  }
};
