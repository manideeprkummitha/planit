"use client";

import React, { useState, useEffect } from "react";
import { DataTable } from "@/components/table_components/data-table";
import { columns } from "@/components/table_components/columns";
import { z } from "zod";
import { taskSchema } from "@/lib/schema";

export default function Page() {
  const [tasks, setTasks] = useState<z.infer<typeof taskSchema>[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [bucketsData, setBucketsData] = useState<any[]>([]);

  // Fetch buckets & tasks once, then sort tasks immediately
  useEffect(() => {
    async function fetchAllData() {
      try {
        // 1. Fetch buckets
        const bucketsResponse = await fetch("/api/buckets");
        if (!bucketsResponse.ok) {
          throw new Error(
            `Failed to fetch buckets. Status: ${bucketsResponse.status}`
          );
        }
        const buckets = await bucketsResponse.json();
        console.log("Fetched buckets:", buckets);

        // 2. Fetch tasks
        const tasksResponse = await fetch("/api/tasks");
        if (!tasksResponse.ok) {
          throw new Error(
            `Failed to fetch tasks. Status: ${tasksResponse.status}`
          );
        }
        const tasksData = await tasksResponse.json();
        console.log("Tasks data:", tasksData);

        // Validate tasks array with Zod
        const validatedTasks = z.array(taskSchema).parse(tasksData);

        // 3. Sort tasks by the priority level of their bucket
        const sortedTasks = [...validatedTasks].sort((taskA, taskB) => {
          // Find the corresponding buckets for each task
          const bucketA = buckets.find((bk) => bk.$id === taskA.bucket_id);
          const bucketB = buckets.find((bk) => bk.$id === taskB.bucket_id);

          // Fallback to 9999 if bucket/priority_level is missing
          const priorityA = bucketA
            ? parseInt(bucketA.priority_level ?? "9999", 10)
            : 9999;
          const priorityB = bucketB
            ? parseInt(bucketB.priority_level ?? "9999", 10)
            : 9999;

          return priorityA - priorityB;
        });

        // 4. Update state
        setBucketsData(buckets);
        setTasks(sortedTasks);
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Could not load tasks. Please try again.");
        setTasks([]);
      }
    }

    fetchAllData();
  }, []);

  return (
    <div className="p-4 w-full h-screen flex flex-col">
      <div className="flex flex-col">
        <h2 className="text-2xl mb-4">All Tasks (Sorted by Bucket Priority)</h2>
        {error && <p className="text-red-500 mb-2">{error}</p>}
        {tasks.length > 0 ? (
          <div className="w-full max-w-full">
            <DataTable data={tasks} columns={columns} />
          </div>
        ) : (
          <p className="text-gray-500">No tasks available</p>
        )}
      </div>
    </div>
  );
}
