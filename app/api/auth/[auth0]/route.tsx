// app/api/auth/[auth0]/route.js
import { handleAuth } from '@auth0/nextjs-auth0';
// import type { NextApiRequest, NextApiResponse } from 'next';
// import {client, Databases, ID} from 'node-appwrite';
export const GET = handleAuth();