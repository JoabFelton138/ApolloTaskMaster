import { DELETE_TASK } from '@/graphql/mutations';
import { GET_TASKS } from '@/graphql/queries';
import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import AddTask from './AddTask';
import EditTask from './EditTask';
import { Button } from './ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
}

const TaskTable = () => {
  const [editingId, setIsEditingId] = useState<string | null>(null);
  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
  });

  const handleCancel = () => {
    setIsEditingId(null);
  };

  const handleDelete = async (id: string) => {
    await deleteTask({ variables: { id } });
  };

  const { loading, error, data } = useQuery(GET_TASKS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Table>
      <TableCaption>Apollo Task Master</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Title</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Priority</TableHead>
          <TableHead>Due Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.tasks.map((task: Task) => (
          <TableRow key={task.id}>
            {editingId === task.id ? (
              <EditTask task={task} onCancel={handleCancel} />
            ) : (
              <>
                <TableCell>{task.title}</TableCell>
                <TableCell>{task.description}</TableCell>
                <TableCell>{task.status}</TableCell>
                <TableCell>{task.priority}</TableCell>
                <TableCell>{task.dueDate}</TableCell>
                <TableCell className="flex gap-1">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsEditingId(task.id)}
                  >
                    Edit
                  </Button>
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={() => handleDelete(task.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </>
            )}
          </TableRow>
        ))}
        <AddTask />
      </TableBody>
    </Table>
  );
};

export default TaskTable;
