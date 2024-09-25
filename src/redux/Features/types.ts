export interface UserProps {
    _id: string ;
    name: string;
    favourite?: string[];  // Optional, in case the user has no favorites
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
    userInfo: UserProps ;
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
    date: string;
    description: string;
    status: boolean;
    subtasks: Subtask[];
    createdAt: Date;
    updatedAt: Date;
}

export interface collectionResTyp {
    _id: string;
    collectionName: string;
    collectionImg: string;
    createdAt: Date;
    updatedAt: Date;
    tasks: Task[];
}

export interface GetAllCollectionsResponse {
    success: boolean;
    collections: collectionResTyp[];
}

export interface GetCollectionByIdResponse {
    success: boolean;
    collection: collectionResTyp;
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
    subtasks: Subtask[];
}
export interface EditTaskProp {
    task: Task;
    onClose: () => void; // Function to close the modal
  }

  export interface Subtask {
    _id: string;
    description: string;
    status: boolean; // Assuming status is a boolean indicating completion
  }
  
  export interface Task {
    _id: string;
    description: string;
    status: boolean; // Assuming status is a boolean indicating completion
    date: string; // Assuming date is in ISO format
    subtasks: Subtask[]; // Array of subtasks
  }
  
  export interface TaskListProps {
    tasks: Task[]; // Array of Task objects
  }
  export interface Task {
    _id: string;
    description: string;
    status: boolean; // Assuming status is a boolean indicating completion
    date: string; // Assuming date is in ISO format
  }
  
  export interface Collection {
    _id: string;
    collectionName: string;
    tasks: Task[];
  }
  
  export interface UserFavouritesResponse {
    favourite: Collection[]; // Assuming this is the structure of the user's favourites
  }
  
export interface TaskListProps {
    tasks: Task[]; // Ensure this is an array of Task objects
}