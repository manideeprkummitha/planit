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
  onSave: (bucketData: BucketData) => void;
  bucketData?: BucketData;
  bucket_id: string;
}

const EditBucketDialog: React.FC<EditBucketDialogProps> = ({
  open,
  onOpenChange,
  onSave,
  bucketData,
  bucket_id,
}) => {
  const [formData, setFormData] = useState<BucketData>({
    name: '',
    description: '',
    priority: '',
    type: '',
    status: '',
    tag: '',
  });

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  // Clear error when dialog opens or closes
  useEffect(() => {
    setError(null);
  }, [open]);

  // Fetch bucket details when the dialog opens
  useEffect(() => {
    const fetchBucketDetails = async () => {
      if (!bucket_id) return;
      setLoading(true);
      try {
        const response = await fetch(`/api/buckets/${bucket_id}`);
        const responseText = await response.text();

        console.log("Fetch Response Status:", response.status);
        console.log("Fetch Response Body:", responseText);

        if (!response.ok) {
          throw new Error(`Error fetching bucket details: ${responseText}`);
        }

        let data;
        try {
          data = JSON.parse(responseText);
        } catch (parseError) {
          console.error('Error parsing bucket details:', parseError);
          throw new Error('Invalid response format from server');
        }

        setFormData(data);
        setError(null);
      } catch (error) {
        console.error('Error fetching bucket details:', error);
        setError('Could not load bucket details. Please try again.');
      } finally {
        setLoading(false);
      }
    };

    if (open) {
      fetchBucketDetails();
    }
  }, [bucket_id, open]);

  // Handle updating the bucket
  const handleSave = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`/api/buckets/${bucket_id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const responseText = await response.text();
      console.log("Update Response Status:", response.status);
      console.log("Update Response Body:", responseText);

      if (!response.ok) {
        throw new Error(`Error updating bucket: ${responseText}`);
      }

      let updatedData;
      try {
        updatedData = responseText ? JSON.parse(responseText) : formData;
      } catch (parseError) {
        console.error('Error parsing response:', parseError);
        // Use the formData if parsing fails but request was successful
        updatedData = formData;
      }

      onSave(updatedData);
      setError(null);
      onOpenChange(false);
    } catch (error) {
      console.error('Error updating bucket:', error);
      setError('Failed to update bucket. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Handle cancel button
  const handleCancel = () => {
    setError(null);
    onOpenChange(false);
  };

  return (
    <DialogBase
      open={open}
      onOpenChange={(newOpen) => {
        setError(null);
        onOpenChange(newOpen);
      }}
      title="Edit Bucket"
      footer={
        <DialogActions
          buttons={[
            {
              text: 'Cancel',
              color: 'bg-red-600 hover:bg-red-700 text-white',
              onClick: handleCancel,
              disabled: loading,
            },
            {
              text: loading ? 'Updating...' : 'Update',
              color: 'bg-blue-600 hover:bg-blue-700 text-white',
              onClick: handleSave,
              disabled: loading,
            },
          ]}
        />
      }
    >
      {error && (
        <div className="text-red-600 mb-2">
          {error}
        </div>
      )}

      {loading ? (
        <p className="text-center text-gray-600">Loading...</p>
      ) : (
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
          onSubmit={handleSave}
        />
      )}
    </DialogBase>
  );
};

export default EditBucketDialog;