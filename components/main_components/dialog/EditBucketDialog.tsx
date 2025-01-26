'use client'

import React,{useState} from 'react';

import DialogBase from '@/components/sub_components/dialog/DialogBase';
import BucketForm from '@/components/sub_components/forms/BucketForm';
import DialogActions from '@/components/sub_components/dialog/DialogActions';

interface BucketsDialogProps {
    open:boolean;
    onOpenChange:(open: boolean) => void;
    onCreate:(bucketName:string, bucketDescription:string) => void;
}

const EditBucketDialog:React.FC<BucketsDialogProps> = ({open, onOpenChange, onCreate}) => {
    const [bucketName, setBucketName] = useState(''); // State to store the bucket name
    const [bucketDescription, setBucketDescription] = useState(''); // State to store the bucket description
    const [bucketPriority, setBucketPriority] = useState(''); // State to store the bucket priority
    const [bucketType, setBucketType] = useState(''); // State to store the bucket type
    const [bucketStatus, setBucketStatus] = useState(''); // State to store the bucket status
    const [bucketTag, setBucketTag] = useState(''); // State to store the bucket tag

    const handleCreate = () => {
        onCreate(bucketName, bucketDescription);
        setBucketName(''); // Clear the bucket name after creation
        setBucketDescription(''); // Clear the bucket description after creation
        onOpenChange(false); // Close the dialog
    }

  return (
    <DialogBase
      open={open}
      onOpenChange={onOpenChange}
      title='Create Bucket'
      footer={
        <DialogActions
          onCancel={() => onOpenChange(false)}
          onCreate={handleCreate}
        />
      }
    >
      <BucketForm
        mode='edit'
        bucketName={bucketName}
        bucketDescription={bucketDescription}
        setBucketName={setBucketName}
        setBucketDescription={setBucketDescription}
        bucketPriority={bucketPriority}
        setBucketPriority={setBucketPriority}
        bucketType={bucketType}
        setBucketType={setBucketType}
        bucketStatus={bucketStatus}
        setBucketStatus={setBucketStatus}
        bucketTag={bucketTag}
        setBucketTag={setBucketTag}
        onSubmit={(data) => console.log('Submit:', data)}
      />
    </DialogBase>
  )
}

export default EditBucketDialog