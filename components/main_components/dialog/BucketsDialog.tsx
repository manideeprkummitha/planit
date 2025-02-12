'use client';

import React, { useState } from 'react';

import DialogBase from '@/components/sub_components/dialog/DialogBase';
import BucketForm from '@/components/sub_components/forms/BucketForm';
import DialogActions from '@/components/sub_components/dialog/DialogActions';

interface BucketsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (bucketData: {
    name: string;
    description: string;
    priority: string;
    type: string;
    status: string;
    tag: string;
  }) => void;
}

const BucketsDialog: React.FC<BucketsDialogProps> = ({
  open,
  onOpenChange,
  onCreate,
}) => {
  const [bucketData, setBucketData] = useState({
    name: '',
    description: '',
    priority: '',
    type: '',
    status: '',
    tag: '',
  });

  const handleInputChange = (key: string, value: string) => {
    setBucketData((prev) => ({ ...prev, [key]: value }));
  };

  const handleCreate = () => {
    onCreate(bucketData);
    setBucketData({
      name: '',
      description: '',
      priority: '',
      type: '',
      status: '',
      tag: '',
    }); // Reset form fields after creation
    onOpenChange(false); // Close the dialog
  };

  const handleCancel = () => {
    setBucketData({
      name: '',
      description: '',
      priority: '',
      type: '',
      status: '',
      tag: '',
    }); // Reset form fields
    onOpenChange(false); // Close the dialog
  };

  return (
    <DialogBase
      open={open}
      onOpenChange={onOpenChange}
      title="Create Bucket"
      footer={
        <DialogActions
          buttons={[
            {
              text: 'Cancel',
              color: 'bg-red-600 hover:bg-red-700 text-white',
              onClick: handleCancel,
            },
            {
              text: 'Create',
              color: 'bg-blue-600 hover:bg-blue-700 text-white',
              onClick: handleCreate,
            },
          ]}
        />
      }
    >
      <BucketForm
        mode="add"
        bucketName={bucketData.name}
        bucketDescription={bucketData.description}
        setBucketName={(value) => handleInputChange('name', value)}
        setBucketDescription={(value) => handleInputChange('description', value)}
        bucketPriority={bucketData.priority}
        setBucketPriority={(value) => handleInputChange('priority', value)}
        bucketType={bucketData.type}
        setBucketType={(value) => handleInputChange('type', value)}
        bucketStatus={bucketData.status}
        setBucketStatus={(value) => handleInputChange('status', value)}
        bucketTag={bucketData.tag}
        setBucketTag={(value) => handleInputChange('tag', value)}
        // onSubmit={(data) => console.log('Submitted data:', data)}
      />
    </DialogBase>
  );
};

export default BucketsDialog;
