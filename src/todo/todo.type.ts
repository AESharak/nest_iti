enum status {
  TODO = 'todo',
  IN_PROGRESS = 'in-progress',
  DONE = 'done',
}

export class Todo {
  id: number;
  task: string;
  status: status;
}
