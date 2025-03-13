"use client";

import React, { useState, useEffect } from "react";
import DialogBase from "@/components/sub_components/dialog/DialogBase";
import DialogActions from "@/components/sub_components/dialog/DialogActions";
import BucketSettingsForm from "@/components/sub_components/forms/BucketSettingsForm";

interface Bucket {
  id: string;          // We'll store the actual ID here
  name: string;
  description: string;
  // optional: priority_level?: number;
}

interface BucketsSettingsDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (buckets: Bucket[]) => void; // or you can remove if you don't need "save" callback
}

const BucketsSettingsDialog: React.FC<BucketsSettingsDialogProps> = ({
  open,
  onOpenChange,
  onSave,
}) => {
  const [buckets, setBuckets] = useState<Bucket[]>([]);

  // Fetch the buckets when the dialog opens
  useEffect(() => {
    if (open) {
      fetchBuckets();
    }
  }, [open]);

  async function fetchBuckets() {
    try {
      const response = await fetch("/api/buckets");
      if (!response.ok) {
        throw new Error(`Failed to fetch buckets. Status: ${response.status}`);
      }
      const data = await response.json();

      // If your data has $id, rename it to id, etc.
      // For example:
      const mapped = data.map((item: any) => ({
        id: item.$id,            // rename $id to id
        name: item.name,
        description: item.description,
      }));
      setBuckets(mapped);
    } catch (error) {
      console.error("Error fetching buckets:", error);
    }
  }

  // "Save" just calls a parent callback and closes
  // (the actual priority update logic is done in the form on drag)
  const handleSave = () => {
    onSave?.(buckets);
    onOpenChange(false);
  };

  const handleCancel = () => {
    onOpenChange(false);
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
              text: "Cancel",
              color: "bg-red-600 hover:bg-red-700 text-white",
              onClick: handleCancel,
            },
            {
              text: "Save",
              color: "bg-blue-600 hover:bg-blue-700 text-white",
              onClick: handleSave,
            },
          ]}
        />
      }
    >
      {/* Pass the fetched buckets to the drag-and-drop form */}
      <BucketSettingsForm buckets={buckets} setBuckets={setBuckets} />
    </DialogBase>
  );
};

export default BucketsSettingsDialog;
