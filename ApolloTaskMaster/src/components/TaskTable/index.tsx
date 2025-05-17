import { DELETE_TASK } from '@/graphql/mutations';
import { GET_TASKS } from '@/graphql/queries';
import { useMutation, useQuery } from '@apollo/client';
import { useState } from 'react';
import { toast } from 'sonner';
import AddTask from './AddTask';
import { columns, Task } from './columns';
import { DataTable } from './DataTable';
import EditTask from './EditTask';

const TaskTable = () => {
  const [editingId, setIsEditingId] = useState<string | null>(null);
  const [deleteTask] = useMutation(DELETE_TASK, {
    refetchQueries: [{ query: GET_TASKS }],
  });

  const handleDelete = async (id: string) => {
    await deleteTask({ variables: { id } });
    toast.success('Task deleted successfully');
  };

  const renderEditRow = (row: Task) => {
    if (row.id === editingId) {
      return <EditTask task={row} onCancel={() => setIsEditingId(null)} />;
    }
    return null;
  };

  const { loading, error, data } = useQuery(GET_TASKS);
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  const tableColumns = columns({ setIsEditingId, handleDelete });
  return (
    <div className="w-full overflow-x-auto">
      <DataTable
        columns={tableColumns}
        data={data?.tasks || []}
        renderEditRow={renderEditRow}
      />
      <AddTask />
    </div>
  );
};

export default TaskTable;
