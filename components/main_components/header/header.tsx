'use client'

import React from 'react';
import { User } from 'lucide-react';
const header = () => {
  return (
    <header className='sticky top-0 z-50 flex h-14 items-center border-b bg-muted/40 px-4 lg:h-[65px] lg:px-6 justify-between'>
        <div className='w-full flex items-center justify-end gap-4'>
            <div>
                <p className='hidden md:block text-xl font-semibold'>
                    Welcome, <span className='text-blue-600 font-bold'>User</span>
                </p>
            </div>
            <div className='rounded-full bg-gray-200 p-2'>
                <User className='size-6' />
            </div>
        </div>
    </header>
  )
}

export default header