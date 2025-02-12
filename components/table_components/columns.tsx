"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { priorities, statuses } from "@/lib/data"
import { Task } from "@/lib/schema"
import { DataTableColumnHeader } from "./data-table-column-header"
import { DataTableRowActions } from "./data-table-row-actions"

export const columns: ColumnDef<Task>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px] border border-white"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "task_title",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task Title" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[200px] truncate font-medium">
          {row.getValue("task_title")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "task_description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task Description" />
    ),
    cell: ({ row }) => (
      <div className="flex space-x-2">
        <span className="max-w-[200px] truncate">
          {row.getValue("task_description")}
        </span>
      </div>
    ),
  },
  {
    accessorKey: "task_status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const statusValue = row.getValue("task_status")
      const status = statuses.find((s) => s.value === statusValue)
      if (!status) {
        return <div className="flex w-[100px] items-center">Unknown</div>
      }
      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "task_priority",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Priority" />
    ),
    cell: ({ row }) => {
      const priorityValue = row.getValue("task_priority")
      const priority = priorities.find((p) => p.value === priorityValue)
      if (!priority) {
        return <div className="flex items-center">Unknown</div>
      }
      return (
        <div className="flex items-center">
          {priority.icon && (
            <priority.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{priority.label}</span>
        </div>
      )
    },
    filterFn: (row, id, value) => value.includes(row.getValue(id)),
  },
  {
    accessorKey: "task_due_date",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Task Time" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">
        {row.getValue("task_due_date") ?? "No Time"}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "task_delegated_to",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Delegated Task" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">
        {row.getValue("task_delegated_to") ?? "Not Delegated"}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "task_meeting",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Meeting ?" />
    ),
    cell: ({ row }) => (
      <div className="w-[50px]">
        <Switch checked={row.getValue("task_meeting") ?? false} readOnly />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "task_notify",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Notify Me" />
    ),
    cell: ({ row }) => (
      <div className="w-[50px]">
        <Switch checked={row.getValue("task_notify") ?? false} readOnly />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "task_recurring",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Recurring Task" />
    ),
    cell: ({ row }) => (
      <div className="w-[50px]">
        <Switch checked={row.getValue("task_recurring") ?? false} readOnly />
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "task_notes",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Notes" />
    ),
    cell: ({ row }) => (
      <div className="w-[80px]">
        {row.getValue("task_notes") ?? ""}
      </div>
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
]
