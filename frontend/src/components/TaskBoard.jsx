import { Box, Typography, Stack, CircularProgress } from "@mui/material";
import { useTasks } from "../context/TasksContext.jsx";
import TaskCard from "./TaskCard.jsx";

const columns = [
  { id: "todo", label: "To Do" },
  { id: "in-progress", label: "In Progress" },
  { id: "done", label: "Done" },
];

const TaskBoard = ({ onEditTask }) => {
  const { tasks, loading } = useTasks();

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Stack direction="row" spacing={2} sx={{ alignItems: "flex-start" }}>
      {columns.map((col) => (
        <Box
          key={col.id}
          sx={{
            flex: 1,
            minHeight: "200px",
            borderRadius: 2,
            bgcolor: "#fafafa",
            p: 2,
          }}
        >
          <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
            {col.label}
          </Typography>
          {tasks
            .filter((t) => t.status === col.id)
            .map((task) => (
              <TaskCard key={task._id} task={task} onEdit={() => onEditTask(task)} />
            ))}
        </Box>
      ))}
    </Stack>
  );
};

export default TaskBoard;
