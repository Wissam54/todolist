export type Task={
   id:string;
   content: string;
   createAt:Date;
   completedAt?: Date;
   status: TaskStatus
}

export type TaskStatus = 'todo'| 'doing'|'done';