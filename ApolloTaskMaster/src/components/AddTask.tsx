import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_TASK, GET_TASKS } from '../graphql/queries';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { TableCell, TableRow } from './ui/table';

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
    console.log('Submitting form data:', formData);
    try {
      const result = await createTask({
        variables: {
          input: formData,
        },
      });
      console.log('Mutation result:', result);
      setFormData({
        title: '',
        description: '',
        status: 'TODO',
        priority: 'LOW',
        dueDate: '',
      });
    } catch (error) {
      console.error('Error creating task:', error);
    }
  };

  return (
    <TableRow>
      <TableCell>
        <Input
          type='text'
          name='title'
          value={formData.title}
          onChange={handleChange}
          placeholder='Title'
        />
      </TableCell>
      <TableCell>
        <Textarea
          name='description'
          value={formData.description}
          onChange={handleChange}
          placeholder='Description'
          className='h-10 resize-none'
        />
      </TableCell>
      <TableCell>
        <select
          name='status'
          value={formData.status}
          onChange={handleChange}
          className='w-full h-10 rounded-md border border-input bg-background px-3 py-2'
        >
          <option value='TODO'>To Do</option>
          <option value='IN_PROGRESS'>In Progress</option>
          <option value='COMPLETED'>Completed</option>
        </select>
      </TableCell>
      <TableCell>
        <select
          name='priority'
          value={formData.priority}
          onChange={handleChange}
          className='w-full h-10 rounded-md border border-input bg-background px-3 py-2'
        >
          <option value='LOW'>Low</option>
          <option value='MEDIUM'>Medium</option>
          <option value='HIGH'>High</option>
        </select>
      </TableCell>
      <TableCell>
        <Input
          type='date'
          name='dueDate'
          value={formData.dueDate}
          onChange={handleChange}
        />
      </TableCell>
      <TableCell>
        <Button onClick={handleSubmit}>Add Task</Button>
      </TableCell>
    </TableRow>
  );
};

export default Form;
