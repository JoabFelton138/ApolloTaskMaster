import { TableCell } from './ui/table';
import { Textarea } from './ui/textarea';
import { Input } from './ui/input';
import { Button } from './ui/button';

export default function EditTask() {
  return (
    <>
      <TableCell>
        <Input
          type='text'
          name='title'
          //   value={editForm.title}
          //   onChange={handleChange}
          placeholder='Title'
        />
      </TableCell>
      <TableCell>
        <Textarea
          name='description'
          //   value={editForm.description}
          //   onChange={handleChange}
          placeholder='Description'
          className='h-10 resize-none'
        />
      </TableCell>
      <TableCell>
        <select
          name='status'
          //   value={editForm.status}
          //   onChange={handleChange}
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
          //   value={editForm.priority}
          //   onChange={handleChange}
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
          //   value={editForm.dueDate}
          //   onChange={handleChange}
        />
      </TableCell>
      <TableCell>
        <Button size={'sm'}>Submit</Button>
      </TableCell>
    </>
  );
}
