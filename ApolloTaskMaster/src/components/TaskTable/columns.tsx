import { ColumnDef } from '@tanstack/react-table';
import { Button } from '../ui/button';

export type Task = {
  id: string;
  title: string;
  description: string;
  status: string;
  priority: string;
  dueDate: string;
};

interface ColumnActions {
  setIsEditingId: (id: string) => void;
  handleDelete: (id: string) => void;
}

export const columns = ({
  setIsEditingId,
  handleDelete,
}: ColumnActions): ColumnDef<Task>[] => [
  {
    header: 'Title',
    accessorKey: 'title',
    size: 200,
  },
  {
    header: 'Description',
    accessorKey: 'description',
    size: 300,
  },
  {
    header: 'Status',
    accessorKey: 'status',
    size: 150,
  },
  {
    header: 'Priority',
    accessorKey: 'priority',
    size: 150,
  },
  {
    header: 'Due Date',
    accessorKey: 'dueDate',
    size: 150,
  },
  {
    header: 'Actions',
    id: 'actions',
    size: 200,
    cell: ({ row }) => (
      <div className="flex gap-1">
        <Button
          size="sm"
          variant="outline"
          onClick={() => setIsEditingId(row.original.id)}
        >
          Edit
        </Button>
        <Button
          size="sm"
          variant="destructive"
          onClick={() => handleDelete(row.original.id)}
        >
          Delete
        </Button>
      </div>
    ),
  },
];
