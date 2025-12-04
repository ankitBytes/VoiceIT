import { Card, CardContent, Typography, Chip, Stack, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTasks } from "../context/TasksContext.jsx";
import { format } from "date-fns";

const TaskCard = ({ task, onEdit }) => {
  const { removeTask } = useTasks();

  const formatDate = (d) => {
    if (!d) return "";
    const date = new Date(d);
    if (isNaN(date)) return "";
    return format(date, "dd MMM");
  };

  return (
    <Card sx={{ mb: 1.5 }}>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
          <Stack spacing={0.5}>
            <Typography variant="subtitle1" fontWeight="bold">
              {task.title}
            </Typography>
            {task.description && (
              <Typography variant="body2" color="text.secondary">
                {task.description}
              </Typography>
            )}
            <Stack direction="row" spacing={1} sx={{ mt: 1 }}>
              <Chip
                size="small"
                label={task.priority}
                color={
                  task.priority === "high"
                    ? "error"
                    : task.priority === "low"
                    ? "default"
                    : "warning"
                }
              />
              {task.dueDate && (
                <Chip size="small" label={`Due: ${formatDate(task.dueDate)}`} />
              )}
            </Stack>
          </Stack>
          <Stack direction="row" spacing={1}>
            <IconButton size="small" onClick={onEdit}>
              <EditIcon fontSize="small" />
            </IconButton>
            <IconButton
              size="small"
              onClick={() => {
                if (window.confirm("Delete this task?")) removeTask(task._id);
              }}
            >
              <DeleteIcon fontSize="small" />
            </IconButton>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
};

export default TaskCard;
