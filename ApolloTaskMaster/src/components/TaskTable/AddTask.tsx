import { useMutation } from '@apollo/client';
import React, { useState } from 'react';
import { toast } from 'sonner';
import { CREATE_TASK } from '../../graphql/mutations';
import { GET_TASKS } from '../../graphql/queries';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { TableCell, TableRow } from '../ui/table';

interface TaskForm {
  title: string;
  description: string;
  status: 'TODO' | 'IN_PROGRESS' | 'COMPLETED';
  priority: 'LOW' | 'MEDIUM' | 'HIGH';
  dueDate: string;
}

const Form = () => {
  const [formData, setFormData] = useState<TaskForm>({
    title: '',
    description: '',
    status: 'TODO',
    priority: 'LOW',
    dueDate: '',
  });

  const [createTask] = useMutation(CREATE_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await createTask({
        variables: {
          input: formData,
        },
      });
      setFormData({
        title: '',
        description: '',
        status: 'TODO',
        priority: 'LOW',
        dueDate: '',
      });
      toast.success('Task created successfully');
    } catch (error) {
      console.error('Error creating task:', error);
      toast.error('Error creating task');
    }
  };

  return (
    <TableRow>
      <TableCell>
        <Input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          placeholder="Title"
        />
      </TableCell>
      <TableCell>
        <Input
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Description"
        />
      </TableCell>
      <TableCell>
        <select
          name="status"
          value={formData.status}
          onChange={handleChange}
          className="w-full rounded-md border border-input bg-background px-3 py-1"
        >
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </TableCell>
      <TableCell>
        <select
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          className="w-full rounded-md border border-input bg-background px-3 py-1"
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
          value={formData.dueDate}
          onChange={handleChange}
        />
      </TableCell>
      <TableCell>
        <Button onClick={handleSubmit} size="sm">
          Add Task
        </Button>
      </TableCell>
    </TableRow>
  );
};

export default Form;
