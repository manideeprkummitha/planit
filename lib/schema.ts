import { z } from "zod";

export const taskSchema = z.object({
  $id: z.string(),
  task_title: z.string(),
  task_status: z.string(),
  task_description: z.string(),
  task_priority: z.string(),

  // Optional fields
  task_due_date: z.string().optional(),
  task_delegated_to: z.string().optional(),
  task_meeting: z.boolean().nullable().optional(),
  task_notify: z.boolean().nullable().optional(),
  task_recurring: z.boolean().nullable().optional(),
  task_recurring_timeframe: z.string().optional(),
  task_notes: z.string().nullable(),
});

export type Task = z.infer<typeof taskSchema>;
