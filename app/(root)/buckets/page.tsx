'use client';

import React, { useState, useEffect } from 'react';
import { PlusIcon, Settings } from 'lucide-react';
import Buckets_cards from '@/components/main_components/cards/buckets_cards';
import BucketsDialog from '@/components/main_components/dialog/BucketsDialog';
import BucketsSettingsDialog from '@/components/main_components/dialog/BucketSetttingsDialog';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';

const Buckets = () => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSettingsDialogOpen, setIsSettingsDialogOpen] = useState(false);
  const [bucketsData, setBucketsData] = useState<any[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    const fetchBuckets = async () => {
      try {
        const response = await fetch('/api/buckets');
        const data = await response.json();
        console.log('Fetched buckets:', data);
        setBucketsData(data);
      } catch (error) {
        console.error('Error fetching buckets:', error);
      }
    };
    fetchBuckets();
  }, []);

  const handleCreateBucket = async (bucketData: any) => {
    try {
      const response = await fetch('/api/buckets', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(bucketData),
      });

      if (!response.ok) {
        throw new Error('Failed to create bucket');
      }

      const newBucket = await response.json();
      setBucketsData((prev) => [...prev, newBucket]);

      toast({
        title: 'Bucket Created',
        description: `Bucket "${bucketData.name}" has been successfully created.`,
        variant: 'default',
      });
    } catch (error) {
      console.error('Error creating bucket:', error);
      toast({
        title: 'Error',
        description: 'Could not create the bucket. Please try again.',
        variant: 'destructive',
      });
    }
  };

  const handleUpdateBucket = (id: string, bucketName: string, bucketDescription: string) => {
    setBucketsData((prev) =>
      prev.map((bucket) =>
        bucket.$id === id
          ? { ...bucket, name: bucketName, description: bucketDescription }
          : bucket
      )
    );
    toast({
      title: 'Bucket Updated',
      description: `Bucket "${bucketName}" has been successfully updated.`,
      variant: 'default',
    });
  };

  const handleDeleteBucket = (id: string) => {
    const deletedBucket = bucketsData.find((bucket) => bucket.$id === id)?.name;
    setBucketsData((prev) => prev.filter((bucket) => bucket.$id !== id));
    toast({
      title: 'Bucket Deleted',
      description: `Bucket "${deletedBucket}" has been successfully deleted.`,
      variant: 'destructive',
    });
  };

  return (
    <div className="p-6 w-full h-screen flex flex-col bg-[#F5F7F9]">
      <div className="flex items-center justify-between">
        <div className="flex flex-col">
          <h2 className="text-2xl font-semibold mb-0">Buckets</h2>
          <span className="text-md">
            View and manage all task buckets in one place for seamless organization.
          </span>
        </div>
        <div className="gap-2 flex items-center justify-center">
          <Button variant={'outline'} onClick={() => setIsDialogOpen(true)}>
            <PlusIcon className="size-4" />
          </Button>
          <Button variant={'outline'} onClick={() => setIsSettingsDialogOpen(true)}>
            <Settings className="size-4" />
          </Button>
        </div>
      </div>

      <div className="mt-6 max-h-[90vh] flex-1 overflow-y-scroll grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 rounded-xl custom-scrollbar">
        {bucketsData.map((bucket) => (
          <Buckets_cards
            key={bucket.$id}
            id={bucket.$id}  // Passing the ID here
            name={bucket.name}
            description={bucket.description}
            priority={bucket.priority}
            status={bucket.status}
            type={bucket.type}
            tag={bucket.tag[0]}
            progress={50}  // Placeholder
            assignedTaskCount={10}  // Placeholder
            completedTaskCount={5}  // Placeholder
            onEdit={(bucketName: string, bucketDescription: string) =>
              handleUpdateBucket(bucket.$id, bucketName, bucketDescription)
            }
            onDelete={() => handleDeleteBucket(bucket.$id)}
          />
        ))}
      </div>

      <BucketsDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onCreate={handleCreateBucket}
      />

      <BucketsSettingsDialog
        open={isSettingsDialogOpen}
        onOpenChange={setIsSettingsDialogOpen}
        onSave={(updatedBuckets) => {
          setBucketsData(updatedBuckets);
          toast({
            title: 'Buckets Updated',
            description: 'Buckets have been successfully updated.',
            variant: 'default',
          });
        }}
      />
    </div>
  );
};

export default Buckets;
