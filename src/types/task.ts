export type TaskInfo = {
  id: string;
  name: string;
  status: string;
  description: string;
  createDate: string;
  dueDate: string;
  closingDate?: string;
};

export type Status = {
  value: "done" | "open" | "doing" | "closed";
  label: "Done" | "Open" | "Doing" | "Closed";
};
