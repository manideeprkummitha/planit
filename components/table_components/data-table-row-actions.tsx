import React, { useState } from "react";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal, Trash, Pencil, Eye, File } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { taskSchema } from "@/lib/schema";
import TaskDialog from "@/components/main_components/dialog/BucketTaskDialog";
import BucketsTaskSummaryDialog from "@/components/main_components/dialog/BucketsTaskSummaryDialog";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isSummaryDialogOpen, setIsSummaryDialogOpen] = useState(false);
  const [dialogMode, setDialogMode] = useState<"view" | "edit">("view");

  const task = taskSchema.safeParse(row.original);

  if (!task.success) {
    console.error("Invalid task data:", task.error);
    return null;
  }

  const handleDialogSubmit = (data: any) => {
    console.log(
      `${dialogMode === "edit" ? "Task edited:" : "Task viewed:"}`,
      data
    );
    setIsDialogOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[150px]">
          <DropdownMenuItem
            onClick={() => {
              setDialogMode("view");
              setIsDialogOpen(true);
            }}
          >
            <Eye className="mr-2 h-4 w-4" />
            View
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setDialogMode("edit");
              setIsDialogOpen(true);
            }}
          >
            <Pencil className="mr-2 h-4 w-4" />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem
            onClick={() => {
              setIsSummaryDialogOpen(true); // Open the summary dialog
            }}
          >
            <File className="mr-2 h-4 w-4" />
            Summarize
          </DropdownMenuItem>
          <DropdownMenuItem>
            <Trash className="mr-2 h-4 w-4" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <TaskDialog
        open={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        onSubmit={handleDialogSubmit}
        mode={dialogMode}
        taskData={task.data}
      />

      <BucketsTaskSummaryDialog
        isOpen={isSummaryDialogOpen}
        onClose={() => setIsSummaryDialogOpen(false)}
        task={task.data} // Pass valid task data
      />
    </>
  );
}
