import './App.css';
import TaskTable from './components/taskTable';
import { Card } from './components/ui/card';

function App() {
  return (
    <Card className='p-2'>
      <TaskTable />
    </Card>
  );
}

export default App;
