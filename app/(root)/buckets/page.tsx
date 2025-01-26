'use client';
import React, { useState } from 'react';

import { PlusIcon, Settings } from 'lucide-react';

import Buckets_cards from '@/components/main_components/cards/buckets_cards';
import BucketsDialog from '@/components/main_components/dialog/BucketsDialog';
import BucketsSettingsDialog from '@/components/main_components/dialog/BucketSetttingsDialog';
import { Button } from '@/components/ui/button';

const Buckets = () => {
  // State to control the dialog
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  // State to control the settings dialog
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);

  // Function to toggle the dialog
  const handleCreateBucket = (bucketName: string, bucketDescription: string) => {
    console.log('Creating bucket:', bucketName);
    console.log('Description:', bucketDescription);
  };

  return (
    <div className="p-4 w-full h-screen flex flex-col">
      {/* Titles Section */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold mb-0">Buckets</h2>
          <span className="text-md">
            View and manage all task buckets in one place for seamless organization.
          </span>
        </div>
        <div className='gap-2 flex items-center justify-center'>
          <Button variant={'outline'} onClick={() => setIsDialogOpen(true)}>
            <PlusIcon className="size-4" />
          </Button>
          <Button variant={'outline'} onClick={() => setIsSettingsDialogOpen(true)}>
            <Settings className="size-4" />
          </Button>
        </div>
      </div>

      {/* Buckets Display Section */}
      <div
        className="mt-6 max-h-[90vh] flex-1 overflow-y-scroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 py-4 px-4 rounded-xl bg-[#34d399] overflow-y-scroll custom-scrollbar"
      >
        <Buckets_cards />
        <Buckets_cards />
        <Buckets_cards />
        <Buckets_cards />
        <Buckets_cards />
        <Buckets_cards />
        <Buckets_cards />
        <Buckets_cards />
      </div>

      <BucketsDialog
        open={isDialogOpen} // Controls the visibility of the dialog
        onOpenChange={setIsDialogOpen} // Function to toggle the dialog
        onCreate={handleCreateBucket} // Handles the creation of a new bucket
      />

    <BucketsSettingsDialog
      open={isSettingsDialogOpen}
      onOpenChange={setIsSettingsDialogOpen}
      onSave={(updatedBuckets) => console.log('Updated Buckets:', updatedBuckets)}
    />
    </div>
  );
};

export default Buckets;
