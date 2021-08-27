export type TaskInfo = {
  id: string;
  name: string;
  status: number;
  description: string;
  createDate: string;
  dueDate: string;
  closingDate?: string;
};
