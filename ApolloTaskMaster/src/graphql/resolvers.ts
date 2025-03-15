enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  COMPLETED = 'COMPLETED',
}

enum TaskPriority {
  LOW = 'LOW',
  MEDIUM = 'MEDIUM',
  HIGH = 'HIGH',
}

interface Task {
  id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
}

interface CreateTaskInput {
  title: string;
  description: string;
  status: TaskStatus;
  priority: TaskPriority;
  dueDate: string;
}

const tasks: Task[] = [
  {
    id: '1',
    title: 'Task 1',
    description: 'Description 1',
    status: TaskStatus.TODO,
    priority: TaskPriority.LOW,
    dueDate: '2025-01-01',
  },
];

export const resolvers = {
  Query: {
    tasks: () => {
      return tasks;
    },
    task: (_: unknown, { id }: { id: string }) => {
      return tasks.find((task) => task.id === id);
    },
  },
  Mutation: {
    createTask: (_: unknown, { input }: { input: CreateTaskInput }) => {
      const newTask: Task = {
        id: String(tasks.length + 1),
        ...input,
      };
      tasks.push(newTask);
      return newTask;
    },
  },
};
