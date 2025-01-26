'use client'
import React from 'react';

interface BucketDetail {
    icon: React.ElementType; // Icon component
    label: string;
    value: string;
}

interface BucketDetailsProps {
    details: BucketDetail[];
}

const bucket_details:React.FC<BucketDetailsProps> = ({details}) => {
  return (
    <div className='flex flex-col gap-4 w-full max-w-lg bg-white px-4 py-4'>
        {details.map(({icon:Icon, label, value}) => (
            <div key={label} className='flex w-full items-center justify-between'>
                <div className='flex items-center gap-3'>
                    <Icon className='size-4' />
                    <span className='text-md text-gray-700'>{label}</span>
                </div>
                <div>
                    <span className='text-md font-medium text-gray-800'>{value}</span>
                </div>
            </div>
        ))}

    </div>
  )
}

export default bucket_details