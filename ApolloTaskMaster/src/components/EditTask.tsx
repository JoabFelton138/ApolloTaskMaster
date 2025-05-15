import { UPDATE_TASK } from '@/graphql/mutations';
import { GET_TASKS } from '@/graphql/queries';
import { useMutation } from '@apollo/client';
import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { TableCell } from './ui/table';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
}

interface EditTaskProps {
  task: Task;
  onCancel: () => void;
}

export default function EditTask({ task, onCancel }: EditTaskProps) {
  const [editTask, setEditTask] = useState<Task>({
    id: task.id,
    title: task.title,
    description: task.description,
    status: task.status,
    priority: task.priority,
    dueDate: task.dueDate,
  });

  const [updateTask] = useMutation(UPDATE_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
  });

  const handleSubmit = async () => {
    try {
      await updateTask({
        variables: {
          id: task.id,
          input: {
            title: editTask.title,
            description: editTask.description,
            status: editTask.status,
            priority: editTask.priority,
            dueDate: editTask.dueDate,
          },
        },
      });
      onCancel();
    } catch (error) {
      console.error('Error updating task:', error);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setEditTask((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <>
      <TableCell>
        <Input
          type="text"
          name="title"
          value={editTask.title}
          onChange={handleChange}
          placeholder="Title"
        />
      </TableCell>
      <TableCell>
        <Input
          name="description"
          value={editTask.description}
          onChange={handleChange}
          placeholder="Description"
        />
      </TableCell>
      <TableCell>
        <select
          name="status"
          value={editTask.status}
          onChange={handleChange}
          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
        >
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </TableCell>
      <TableCell>
        <select
          name="priority"
          value={editTask.priority}
          onChange={handleChange}
          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
        >
          <option value="LOW">Low</option>
          <option value="MEDIUM">Medium</option>
          <option value="HIGH">High</option>
        </select>
      </TableCell>
      <TableCell>
        <Input
          type="date"
          name="dueDate"
          value={editTask.dueDate}
          onChange={handleChange}
        />
      </TableCell>
      <TableCell className="flex gap-1 pt-2.5">
        <Button size="sm" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button size="sm" onClick={handleSubmit}>
          Submit
        </Button>
      </TableCell>
    </>
  );
}
