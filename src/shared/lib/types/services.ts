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

export interface CreateNewCustomActivity {
  title: string;
  description: string;
  modalFiles: File[];
  startDate: string;
  endDate: string;
  filesToDelete: number[];
  activityId: number;
  isPersonal: '0' | '1';
  recordId: number;
}