import { useMutation, useQuery } from '@apollo/client';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './ui/table';
import { DELETE_TASK, GET_TASKS } from '@/graphql/queries';
import { Button } from './ui/button';
import AddTask from './AddTask';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
}

const TaskTable = () => {
  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
  });

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
            <TableCell>{task.title}</TableCell>
            <TableCell>{task.description}</TableCell>
            <TableCell>{task.status}</TableCell>
            <TableCell>{task.priority}</TableCell>
            <TableCell>{task.dueDate}</TableCell>
            <TableCell className='flex gap-1'>
              <Button size={'sm'} variant={'outline'}>
                Edit
              </Button>
              <Button
                size={'sm'}
                variant={'destructive'}
                onClick={() => handleDelete(task.id)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
        <AddTask />
      </TableBody>
    </Table>
  );
};

export default TaskTable;
