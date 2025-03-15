import { useQuery } from '@apollo/client';
import './App.css';
import { GET_TASKS } from './graphql/queries';
import Form from './components/form';

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

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  console.log('Query data:', data);

  return (
    <div>
      <h1>Apollo Task Master</h1>

      <table className='task-table'>
        <thead>
          <tr>
            <th>Title</th>
            <th>Description</th>
            <th>Status</th>
            <th>Priority</th>
            <th>Due Date</th>
          </tr>
        </thead>
        <tbody>
          {data?.tasks.map((task: Task) => (
            <tr key={task.id}>
              <td>{task.title}</td>
              <td>{task.description}</td>
              <td>{task.status}</td>
              <td>{task.priority}</td>
              <td>{task.dueDate}</td>
              <button>Edit</button>
              <button>Delete</button>
            </tr>
          ))}
        </tbody>
      </table>
      <Form />
    </div>
  );
}

export default App;
