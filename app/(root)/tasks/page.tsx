"use client";

import React, { useState, useEffect } from "react";
import { DataTable } from "@/components/table_components/data-table";
import { columns } from "@/components/table_components/columns";
import { z } from "zod";
import { taskSchema } from "@/lib/schema";

export default function Page() {
  const [tasks, setTasks] = useState<z.infer<typeof taskSchema>[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchAllTasks() {
      try {
        // Replace /api/tasks/all with the actual endpoint that returns all tasks
        const response = await fetch("/api/tasks");
        if (!response.ok) {
          throw new Error(`HTTP error, status = ${response.status}`);
        }
        console.log("Fetched Response", response)
        const data = await response.json();
        console.log("Data",data)
        // Validate tasks array with Zod
        const validatedTasks = z.array(taskSchema).parse(data);
        setTasks(validatedTasks);
      } catch (err) {
        console.error("Error fetching or validating tasks:", err);
        setError("Could not load tasks. Please try again.");
        setTasks([]);
      }
    }

    fetchAllTasks();
  }, []);

  return (
    <div className="p-4 w-full h-screen flex flex-col">
      <div className="flex flex-col">
        <h2 className="text-2xl mb-4">All Tasks</h2>
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
