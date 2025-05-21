import { ColumnDef } from '@tanstack/react-table';
import { Button } from '../ui/button';
import { ArrowUpDown } from 'lucide-react';

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

const priorityOrder = {
  high: 0,
  medium: 1,
  low: 2,
};

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
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="!p-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Priority
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      )
    },
    accessorKey: 'priority',
    size: 150,
    sortingFn: (rowA, rowB) => {
      const a = rowA.original.priority.toLowerCase();
      const b = rowB.original.priority.toLowerCase();
      return priorityOrder[a as keyof typeof priorityOrder] - priorityOrder[b as keyof typeof priorityOrder];
    },
  },
  {
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="!p-0 hover:bg-transparent"
          onClick={() => column.toggleSorting(column.getIsSorted() === 'asc')}>
          Due Date
          <ArrowUpDown className="h-4 w-4" />
        </Button>
      )
    },
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
