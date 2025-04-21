import { useQuery, useMutation } from '@apollo/client';
import './App.css';
import { GET_TASKS, DELETE_TASK } from './graphql/queries';
import Form from './components/form';
import { Button } from './components/ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from './components/ui/table';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
}

function App() {
  const { loading, error, data } = useQuery(GET_TASKS);
  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
  });

  const handleDelete = async (id: string) => {
    await deleteTask({ variables: { id } });
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <div>
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
              <TableCell className='text-left'>{task.title}</TableCell>
              <TableCell className='text-left'>{task.description}</TableCell>
              <TableCell className='text-left'>{task.status}</TableCell>
              <TableCell className='text-left'>{task.priority}</TableCell>
              <TableCell className='text-left'>{task.dueDate}</TableCell>
              <TableCell className='text-left'>
                <Button variant={'outline'}>Edit</Button>
                <Button
                  variant={'destructive'}
                  onClick={() => handleDelete(task.id)}
                >
                  Delete
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Form />
    </div>
  );
}

export default App;
