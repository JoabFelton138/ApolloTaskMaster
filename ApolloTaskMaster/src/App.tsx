import './App.css';
import { Card } from './components/ui/card';
import TaskTable from './components/TaskTable';

function App() {
  return (
    <Card className='p-2'>
      <TaskTable />
    </Card>
  );
}

export default App;
