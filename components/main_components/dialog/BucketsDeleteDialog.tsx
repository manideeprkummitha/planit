'use client';

import React, { useState } from 'react';
import DialogBase from '@/components/sub_components/dialog/DialogBase';
import DialogActions from '@/components/sub_components/dialog/DialogActions';
import { useEffect } from 'react';

interface BucketsDeleteDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onDelete: () => void;
  bucketName?: string;
  bucket_id: string;
}

const BucketsDeleteDialog: React.FC<BucketsDeleteDialogProps> = ({
  open,
  onOpenChange,
  onDelete,
  bucketName,
  bucket_id
}) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Clear error when dialog opens or closes
  useEffect(() => {
    setError(null);
  }, [open]);

  const handleDelete = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/buckets/${bucket_id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      const responseText = await response.text();
      console.log("Delete Response Status:", response.status);
      console.log("Delete Response Body:", responseText);

      if (!response.ok) {
        throw new Error(`Error deleting bucket: ${responseText}`);
      }

      onDelete();
      setError(null);
      onOpenChange(false);
    } catch (error) {
      console.error('Error deleting bucket:', error);
      setError('Failed to delete bucket. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <DialogBase
      open={open}
      onOpenChange={(newOpen) => {
        setError(null);
        onOpenChange(newOpen);
      }}
      title="Delete Bucket"
      description={`Are you sure you want to delete ${bucketName || 'this bucket'}? This action cannot be undone.`}
      footer={
        <DialogActions
          buttons={[
            {
              text: 'Cancel',
              color: 'bg-gray-400 hover:bg-gray-600 text-black',
              onClick: () => onOpenChange(false),
              disabled: loading,
            },
            {
              text: loading ? 'Deleting...' : 'Delete',
              color: 'bg-red-600 hover:bg-red-700 text-white',
              onClick: handleDelete,
              disabled: loading,
            },
          ]}
        />
      }
    >
      {error && (
        <div className="text-red-600 mb-4">
          {error}
        </div>
      )}
      <div className="text-gray-700">
        Deleting this bucket will permanently remove all its data. Please confirm if you wish to proceed.
      </div>
    </DialogBase>
  );
};

export default BucketsDeleteDialog;