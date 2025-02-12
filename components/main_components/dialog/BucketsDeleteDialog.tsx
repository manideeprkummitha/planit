'use client';

import React from 'react';
import DialogBase from '@/components/sub_components/dialog/DialogBase';
import DialogActions from '@/components/sub_components/dialog/DialogActions';

interface BucketsDeleteDialogProps {
  open: boolean; // Controls the visibility of the dialog
  onOpenChange: (open: boolean) => void; // Callback to handle dialog visibility change
  onDelete: () => void; // Callback for confirming the delete action
  bucketName?: string; // Optional: Name of the bucket to delete
}

const BucketsDeleteDialog: React.FC<BucketsDeleteDialogProps> = ({
  open,
  onOpenChange,
  onDelete,
  bucketName,
}) => {
  return (
    <DialogBase
      open={open}
      onOpenChange={onOpenChange}
      title="Delete Bucket"
      description={`Are you sure you want to delete ${bucketName || 'this bucket'}? This action cannot be undone.`}
      footer={
        <DialogActions
          buttons={[
            {
              text: 'Cancel',
              color: 'bg-gray-400 hover:bg-gray-600 text-black',
              onClick: () => onOpenChange(false),
            },
            {
              text: 'Delete',
              color: 'bg-red-600 hover:bg-red-700 text-white',
              onClick: onDelete,
            },
          ]}
        />
      }
    >
      <div className="text-gray-700">
        Deleting this bucket will permanently remove all its data. Please confirm if you wish to proceed.
      </div>
    </DialogBase>
  );
};

export default BucketsDeleteDialog;
