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
  },
  {
    header: 'Description',
    accessorKey: 'description',
  },
  {
    header: 'Status',
    accessorKey: 'status',
  },
  {
    header: 'Priority',
    accessorKey: 'priority',
  },
  {
    header: 'Due Date',
    accessorKey: 'dueDate',
  },
  {
    header: 'Actions',
    id: 'actions',
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
