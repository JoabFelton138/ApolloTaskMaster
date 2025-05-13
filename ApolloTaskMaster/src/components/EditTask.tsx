import { Button } from './ui/button';
import { Input } from './ui/input';
import { TableCell } from './ui/table';
import { Textarea } from './ui/textarea';

interface Task {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
}

interface EditTaskProps {
  task: Task;
  onCancel: () => void;
}

export default function EditTask({ task, onCancel }: EditTaskProps) {


  return (
    <>
      <TableCell>
        <Input
          type="text"
          name="title"
          value={task.title}
          //onChange={handleChange}
          placeholder="Title"
        />
      </TableCell>
      <TableCell>
        <Textarea
          name="description"
          value={task.description}
          //onChange={handleChange}
          placeholder="Description"
          className="h-10 resize-none"
        />
      </TableCell>
      <TableCell>
        <select
          name="status"
          value={task.status}
          //onChange={handleChange}
          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
        >
          <option value="TODO">To Do</option>
          <option value="IN_PROGRESS">In Progress</option>
          <option value="COMPLETED">Completed</option>
        </select>
      </TableCell>
      <TableCell>
        <select
          name="priority"
          value={task.priority}
          //onChange={handleChange}
          className="w-full h-10 rounded-md border border-input bg-background px-3 py-2"
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
          value={task.dueDate}
          //onChange={handleChange}
        />
      </TableCell>
      <TableCell className="flex gap-1 pt-5.5">
        <Button size="sm" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button size="sm">
          Submit
        </Button>
      </TableCell>
    </>
  );
}
