export interface CreateNewPostFromValues {
  label: string;
  title: string;
  subjectId: number;
  content: string;
  type: string;
  modalFiles: File[];
  cover: File;
  recordTable: 'Homework' | 'News';
  recordId: number;
  startDate: string;
  endDate: string;
  filesToDelete: number[];
}

export interface CreateNewTaskFromValues {
  title: string;
  description: string;
  modalFiles: File[];
  recordId: number;
  startDate: string;
  endDate: string;
  filesToDelete: number[];
  taskId: number;
  parentId: number;
}