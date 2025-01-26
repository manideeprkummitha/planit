'use client';

import { useUser } from '@auth0/nextjs-auth0/client';
import { Loader } from 'lucide-react';
export default function ProfileClient() {
  const { user, error, isLoading } = useUser();

  if (isLoading) 
    return <div className="flex items-center justify-center w-full min-h-full"><Loader className='animate-spin size-6 text-muted-foreground' /></div>;
  if (error) return <div>{error.message}</div>;

  return (
    user && (
      <div>
        <img src={user.picture} alt={user.name} />
        <h2>{user.name}</h2>
        <p>{user.email}</p>
      </div>
    )
  );
}