'use client';

import React, { useState } from 'react';

import DialogBase from '@/components/sub_components/dialog/DialogBase';
import DialogActions from '@/components/sub_components/dialog/DialogActions';
import BucketSettingsForm from '@/components/sub_components/forms/BucketSettingsForm';

interface BucketsSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (buckets: { id: string; title: string; description: string }[]) => void;
}

const BucketsSettingsDialog: React.FC<BucketsSettingsDialogProps> = ({
  open,
  onOpenChange,
  onSave,
}) => {
  // Initial bucket data for example purposes
  const initialBuckets = [
    { id: '1', title: 'Bucket 1', description: 'This is bucket 1' },
    { id: '2', title: 'Bucket 2', description: 'This is bucket 2' },
    { id: '3', title: 'Bucket 3', description: 'This is bucket 3' },
    { id: '4', title: 'Bucket 4', description: 'This is bucket 4' },
    { id: '5', title: 'Bucket 5', description: 'This is bucket 5' },
  ];

  const [buckets, setBuckets] = useState(initialBuckets);

  const handleSave = () => {
    onSave(buckets);
    onOpenChange(false); // Close the dialog after saving
  };

  return (
    <DialogBase
      open={open}
      onOpenChange={onOpenChange}
      title="Manage Buckets Settings"
      footer={
        <DialogActions
          onCancel={() => onOpenChange(false)}
          onCreate={handleSave}
        //   createLabel="Save"
        />
      }
    >
      <BucketSettingsForm buckets={buckets} setBuckets={setBuckets} />
    </DialogBase>
  );
};

export default BucketsSettingsDialog;
