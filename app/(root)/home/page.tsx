'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { Loader } from 'lucide-react';
import { useEffect, useRef } from 'react';

export default function ProfileClient() {
  const { user, error, isLoading } = useUser();
  const hasSynced = useRef(false); // Prevent double API call

  useEffect(() => {
    if (user && !hasSynced.current) {
      hasSynced.current = true; // Ensure this block runs only once

      fetch('/api/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: user.name,
          email: user.email,
          sub: user.sub,
          phoneNumber: user.phone_number || '', // Optional
        }),
      })
        .then((res) => res.json())
        .then((data) => console.log('User saved:', data))
        .catch((err) => console.error('Error saving user:', err));
    }
  }, [user]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center w-full min-h-full">
        <Loader className="animate-spin size-6 text-muted-foreground" />
      </div>
    );

  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div>
        <img src={user.picture} alt={user.name} />
        <p>{user.updated_at}</p>
        <h2>{user.name}</h2>
        <p>{user.email}</p>
        <p>Auth0 ID: {user.sub}</p>
      </div>
    )
  );
}
