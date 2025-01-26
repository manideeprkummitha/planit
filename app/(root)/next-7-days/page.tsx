'use client';

import React, { useState, useEffect } from 'react';
import { DataTable } from '@/components/table_components/data-table';
import { columns } from '@/components/table_components/columns';
import { z } from 'zod';
import { taskSchema } from '@/lib/schema';
import tasksData from '@/lib/tasks.json';

const Page = () => {
  const [tasks, setTasks] = useState<Array<z.infer<typeof taskSchema>>>([]);

  useEffect(() => {
    // Validate and set the tasks using zod schema
    const loadTasks = async () => {
      try {
        const validatedTasks = z.array(taskSchema).parse(tasksData);
        setTasks(validatedTasks);
      } catch (error) {
        console.error('Error validating tasks:', error);
        setTasks([]);
      }
    };

    loadTasks();
  }, []);

  return (
    <div className="p-4 w-full h-screen flex flex-col">
      <div className="flex flex-col">
        <h2 className="text-2xl mb-4">Next 7 Days Tasks</h2>
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
};

export default Page;
