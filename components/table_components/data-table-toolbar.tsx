"use client";

import { useState, useEffect } from "react";
import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DataTableViewOptions } from "./data-table-view-options";

import { priorities, statuses } from "@/lib/data";
import { DataTableFacetedFilter } from "./data-table-faceted-filter";
import TaskDialog from "@/components/main_components/dialog/BucketTaskDialog"; // Import the TaskDialog

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({ table }: DataTableToolbarProps<TData>) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isTasksPage, setIsTasksPage] = useState(false);

  useEffect(() => {
    // Determine if the current page is `/tasks` based on the URL
    if (typeof window !== "undefined") {
      console.log("Current Pathname:", window.location.pathname); // Debugging
      setIsTasksPage(window.location.pathname === "/tasks");
    }
  }, []);

  const handleAddTask = (data: any) => {
    console.log("Task added:", data);
    setIsDialogOpen(false); // Close the dialog after adding the task
  };

  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Filter tasks..."
            value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("title")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
          {/* Conditional Filters: Shown only on the tasks page */}
          {isTasksPage && (
            <>
              {table.getColumn("todaysTasks") && (
                <DataTableFacetedFilter
                  column={table.getColumn("todaysTasks")}
                  title="Today's Tasks"
                  options={[{ label: "Today", value: "today" }]}
                />
              )}
              {table.getColumn("next7Days") && (
                <DataTableFacetedFilter
                  column={table.getColumn("next7Days")}
                  title="Next 7 Days"
                  options={[{ label: "Next 7 Days", value: "next7Days" }]}
                />
              )}
              {table.getColumn("delegatedTasks") && (
                <DataTableFacetedFilter
                  column={table.getColumn("delegatedTasks")}
                  title="Delegated Tasks"
                  options={[{ label: "Delegated Tasks", value: "delegated" }]}
                />
              )}
              {table.getColumn("meetings") && (
                <DataTableFacetedFilter
                  column={table.getColumn("meetings")}
                  title="Meetings"
                  options={[{ label: "Meetings", value: "meetings" }]}
                />
              )}
            </>
          )}
          {/* Universal Filters */}
          {table.getColumn("status") && (
            <DataTableFacetedFilter
              column={table.getColumn("status")}
              title="Status"
              options={statuses}
            />
          )}
          {table.getColumn("priority") && (
            <DataTableFacetedFilter
              column={table.getColumn("priority")}
              title="Priority"
              options={priorities}
            />
          )}
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <X />
            </Button>
          )}
        </div>
        <div className="flex items-center justify-between gap-2">
          <Button
            variant="outline"
            size="sm"
            className="ml-auto hidden h-8 lg:flex"
            onClick={() => setIsDialogOpen(true)}
          >
            Add Task
          </Button>
          <DataTableViewOptions table={table} />
        </div>
      </div>

      {/* Add Task Dialog */}
      <TaskDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleAddTask}
        mode="add"
      />
    </>
  );
}
