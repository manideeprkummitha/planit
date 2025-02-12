'use client';

import React, { useState } from 'react';

import DialogBase from '@/components/sub_components/dialog/DialogBase';
import DialogActions from '@/components/sub_components/dialog/DialogActions';
import BucketSettingsForm from '@/components/sub_components/forms/BucketSettingsForm';

interface Bucket {
  id: string;
  title: string;
  description: string;
}

interface BucketsSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (buckets: Bucket[]) => void;
}

const BucketsSettingsDialog: React.FC<BucketsSettingsDialogProps> = ({
  open,
  onOpenChange,
  onSave,
}) => {
  const initialBuckets: Bucket[] = [
    { id: '1', title: 'Bucket 1', description: 'This is bucket 1' },
    { id: '2', title: 'Bucket 2', description: 'This is bucket 2' },
    { id: '3', title: 'Bucket 3', description: 'This is bucket 3' },
    { id: '4', title: 'Bucket 4', description: 'This is bucket 4' },
    { id: '5', title: 'Bucket 5', description: 'This is bucket 5' },
    { id: '6', title: 'Bucket 6', description: 'This is bucket 6' },
    { id: '7', title: 'Bucket 7', description: 'This is bucket 7' },
    { id: '8', title: 'Bucket 8', description: 'This is bucket 8' },
    { id: '9', title: 'Bucket 9', description: 'This is bucket 9' },
    { id: '10', title: 'Bucket 10', description: 'This is bucket 10' },
  ];

  const [buckets, setBuckets] = useState<Bucket[]>(initialBuckets);

  const handleSave = () => {
    onSave(buckets);
    onOpenChange(false); // Close the dialog after saving
  };

  const handleCancel = () => {
    onOpenChange(false); // Close the dialog without saving
  };

  return (
    <DialogBase
      open={open}
      onOpenChange={onOpenChange}
      title="Manage Buckets Settings"
      description="Drag and drop the cards below to adjust bucket priorities. The top card represents the highest priority."
      footer={
        <DialogActions
          buttons={[
            {
              text: 'Cancel',
              color: 'bg-red-600 hover:bg-red-700 text-white',
              onClick: handleCancel,
            },
            {
              text: 'Save',
              color: 'bg-blue-600 hover:bg-blue-700 text-white',
              onClick: handleSave,
            },
          ]}
        />
      }
    >
      <BucketSettingsForm buckets={buckets} setBuckets={setBuckets} />
    </DialogBase>
  );
};

export default BucketsSettingsDialog;
