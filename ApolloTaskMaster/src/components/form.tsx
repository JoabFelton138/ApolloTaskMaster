import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CREATE_TASK, GET_TASKS } from '../graphql/queries';

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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
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
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor='title'>Title</label>
        <input
          type='text'
          id='title'
          name='title'
          value={formData.title}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor='description'>Description</label>
        <textarea
          id='description'
          name='description'
          value={formData.description}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor='status'>Status</label>
        <select
          id='status'
          name='status'
          value={formData.status}
          onChange={handleChange}
        >
          <option value='TODO'>To Do</option>
          <option value='IN_PROGRESS'>In Progress</option>
          <option value='COMPLETED'>Completed</option>
        </select>
      </div>
      <div>
        <label htmlFor='priority'>Priority</label>
        <select
          id='priority'
          name='priority'
          value={formData.priority}
          onChange={handleChange}
        >
          <option value='LOW'>Low</option>
          <option value='MEDIUM'>Medium</option>
          <option value='HIGH'>High</option>
        </select>
      </div>
      <div>
        <label htmlFor='dueDate'>Due Date</label>
        <input
          type='date'
          id='dueDate'
          name='dueDate'
          value={formData.dueDate}
          onChange={handleChange}
        />
      </div>
      <button type='submit'>Add Task</button>
    </form>
  );
};

export default Form;
