
export function getLatestDueDate(tasks: Array<{ task_due_date?: string }>): string | null {
    let latestDate: Date | null = null;
    console.log("🚀 ~ file: helper.ts:5 ~ getLatestDueDate ~ tasks:", tasks)
    for (const task of tasks) {
      console.log("🚀 ~ task:", task)
      if (task.task_due_date) {
        console.log("🚀 ~ task due date:", task.task_due_date)
        const current = new Date(task.task_due_date);
        if (!latestDate || current > latestDate) {
          latestDate = current;
        }
      }
    }
  
    return latestDate
      ? latestDate.toISOString().split("T")[0] // or your preferred date format
      : null;
  }
  