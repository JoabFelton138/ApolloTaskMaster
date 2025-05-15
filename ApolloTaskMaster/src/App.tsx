import { Toaster } from 'sonner';
import './App.css';
import TaskTable from './components/TaskTable';
import { Card } from './components/ui/card';

function App() {
  return (
    <div className="grid place-items-center">
      <Card className="p-4">
        <TaskTable />
      </Card>
      <Toaster position="top-right" />
    </div>
  );
}

export default App;
