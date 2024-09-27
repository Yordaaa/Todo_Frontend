export interface UserProps {
  _id: string;
  name: string;
  favourite?: string[];
}

export interface LoginUserInputProps {
  name: string;
  password: string;
}

export interface RegistrationInputProps {
  name?: string;
  password?: string;
  confirmPassword?: string;
}

export interface RegistrationResponseProps {
  message: string;
}

export interface AuthStateProps {
  userInfo: UserProps | null;
}

export interface ResTypeProps {
  userInfo: UserProps;
}

export interface Subtask {
  _id: string;
  description: string;
  status: boolean;
  date: Date;
  createdAt: Date;
  updatedAt: Date;
  subtasks?: Subtask[];
}

export interface AddSubTaskProps {
  taskId: string;
  onClose: () => void;
}

export interface Task {
  _id: string;
  date: Date;
  description: string;
  status: boolean;
  subtasks: Subtask[];
  collectionId: {
    _id: string;
    collectionName: string;
    collectionImg: string;
  };
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}


export interface collectionResTyp {
  _id: string;
  collectionName: string;
  collectionImg: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface GetAllCollectionsResponse {
  success: boolean;
  collections: collectionResTyp[];
}
export interface EditTaskInputProps {
  id: string;
  description?: string;
  date?: string;
  status?: boolean;
}
export interface TaskListProps {
  task: Task | null;
}

export type CollectionsData = {
  collections: collectionResTyp[];
};
export interface EditTaskProps {
  task: {
    _id: string;
    description: string;
    date: Date;
    status: boolean;
  };
  onClose: () => void;
}
export interface favouritesResType {
  favourite: collectionResTyp[];
}
export interface SubtaskListProps {
  subtasks: Subtask[] | undefined;
}
export interface EditTaskProp {
  task: Task;
  onClose: () => void;
}

export interface Subtask {
  _id: string;
  description: string;
  date: Date;
  status: boolean;
  subtasks?: Subtask[];
  createdAt: Date;
  updatedAt: Date;
}

export interface Task {
  _id: string;
  description: string;
  status: boolean; 
  date: Date; 
  subtasks: Subtask[]; 
}

export interface TaskListProps {
  tasks: Task[]; 
  onAddSubtask: (taskId: string) => void;
}
export interface Task {
  _id: string;
  description: string;
  status: boolean; 
  date: Date; 
}

export interface Collection {
  _id: string;
  collectionName: string;
  tasks: Task[];
}

export interface UserFavouritesResponse {
  favourite: Collection[]; 
}

export interface GetTasksResponseProps {
  success: boolean;
  collectionName: string;
  tasks: Task[];
}

export interface getSubTaskProps {
  success: boolean;
  subtasks: Subtask[];
}

export interface AddTaskModalProps {
  showModal: boolean;
  onClose: () => void;
  collectionId?: string;
  taskId?: string;
}


export interface GetCollectionDetailsResponse {
  success: boolean;
  collectionName?: string; }