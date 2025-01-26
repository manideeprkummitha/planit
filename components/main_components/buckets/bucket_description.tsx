'use client'
import React from 'react'

interface BucketDescriptionProps {
    description: string
}

const bucket_description:React.FC<BucketDescriptionProps> = ({description}) => {
  return (
    <div className="w-full flex flex-col items-start justify-start gap-2">
        <h2 className="text-lg font-semibold px-4">Bucket Description</h2>
        <span className="text-md font-medium text-gray-800 px-4">{description}</span>
    </div>
  )
}

export default bucket_description