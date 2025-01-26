import React from 'react'
import { Button } from '@/components/ui/button';

const appbar = () => {
  return (
    <div className='flex w-full items-center justify-end p-4'>
        <div className='flex gap-2 items-center justify-center'>
        <Button variant={"outline"}>
            <a href="/api/auth/login?returnTo=/home">Login</a>
        </Button>
        <Button variant={"outline"}>
          <a href="/api/auth/login?returnTo=/home">Login</a>
        </Button>
        </div>
    </div>
  )
}

export default appbar