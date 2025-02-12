'use client';

import React, { useState, useEffect } from 'react';

import DialogBase from '@/components/sub_components/dialog/DialogBase';
import BucketForm from '@/components/sub_components/forms/BucketForm';
import DialogActions from '@/components/sub_components/dialog/DialogActions';

interface BucketData {
  name: string;
  description: string;
  priority: string;
  type: string;
  status: string;
  tag: string;
}

interface EditBucketDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (bucketData: BucketData) => void; // Function to save bucket data
  bucketData?: BucketData; // Optional bucket data for editing
}

const EditBucketDialog: React.FC<EditBucketDialogProps> = ({
  open,
  onOpenChange,
  onSave,
  bucketData,
}) => {
  const [formData, setFormData] = useState<BucketData>({
    name: '',
    description: '',
    priority: '',
    type: '',
    status: '',
    tag: '',
  });

  // Populate form data when dialog opens for editing
  useEffect(() => {
    if (bucketData) {
      setFormData(bucketData);
    }
  }, [bucketData]);

  const handleSave = () => {
    onSave(formData); // Save the updated bucket data
    onOpenChange(false); // Close the dialog
  };

  const handleCancel = () => {
    onOpenChange(false); // Close the dialog without saving
  };

  return (
    <DialogBase
      open={open}
      onOpenChange={onOpenChange}
      title="Edit Bucket"
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
      <BucketForm
        mode="edit"
        bucketName={formData.name}
        bucketDescription={formData.description}
        setBucketName={(value) =>
          setFormData((prev) => ({ ...prev, name: value }))
        }
        setBucketDescription={(value) =>
          setFormData((prev) => ({ ...prev, description: value }))
        }
        bucketPriority={formData.priority}
        setBucketPriority={(value) =>
          setFormData((prev) => ({ ...prev, priority: value }))
        }
        bucketType={formData.type}
        setBucketType={(value) =>
          setFormData((prev) => ({ ...prev, type: value }))
        }
        bucketStatus={formData.status}
        setBucketStatus={(value) =>
          setFormData((prev) => ({ ...prev, status: value }))
        }
        bucketTag={formData.tag}
        setBucketTag={(value) =>
          setFormData((prev) => ({ ...prev, tag: value }))
        }
        onSubmit={(data) => {
          setFormData(data); // Update form data
          handleSave(); // Save the bucket data
        }}
      />
    </DialogBase>
  );
};

export default EditBucketDialog;
