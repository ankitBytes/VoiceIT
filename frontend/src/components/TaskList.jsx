import {
  Box,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Chip,
  IconButton,
  CircularProgress,
  MenuItem,
  TextField,
  Stack,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useTasks } from "../context/TasksContext.jsx";
import { format } from "date-fns";

const TaskList = ({ onEditTask }) => {
  const {
    tasks,
    loading,
    removeTask,
    filterStatus,
    filterPriority,
    setFilterStatus,
    setFilterPriority,
  } = useTasks();

  const formatDate = (d) => {
    if (!d) return "-";
    const date = new Date(d);
    if (isNaN(date)) return "-";
    return format(date, "dd MMM yyyy");
  };

  if (loading) {
    return (
      <Box sx={{ textAlign: "center", mt: 4 }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {/* Filters — responsive stacking */}
      <Stack
        direction={{ xs: "column", sm: "row" }}
        spacing={2}
        sx={{ mb: 2 }}
      >
        <TextField
          label="Status"
          size="small"
          select
          value={filterStatus}
          onChange={(e) => setFilterStatus(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="todo">To Do</MenuItem>
          <MenuItem value="in-progress">In Progress</MenuItem>
          <MenuItem value="done">Done</MenuItem>
        </TextField>

        <TextField
          label="Priority"
          size="small"
          select
          value={filterPriority}
          onChange={(e) => setFilterPriority(e.target.value)}
          sx={{ minWidth: 150 }}
        >
          <MenuItem value="">All</MenuItem>
          <MenuItem value="low">Low</MenuItem>
          <MenuItem value="medium">Medium</MenuItem>
          <MenuItem value="high">High</MenuItem>
        </TextField>
      </Stack>

      {/* Scrollable Table on Mobile */}
      <Box sx={{ width: "100%", overflowX: "auto" }}>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Priority</TableCell>
              <TableCell>Due Date</TableCell>
              <TableCell align="right">Actions</TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {tasks.map((t) => (
              <TableRow key={t._id}>
                <TableCell>{t.title}</TableCell>

                <TableCell>{t.status}</TableCell>

                <TableCell>
                  <Chip
                    size="small"
                    label={t.priority}
                    color={
                      t.priority === "high"
                        ? "error"
                        : t.priority === "low"
                        ? "default"
                        : "warning"
                    }
                  />
                </TableCell>

                <TableCell>{formatDate(t.dueDate)}</TableCell>

                <TableCell align="right">
                  <IconButton onClick={() => onEditTask(t)}>
                    <EditIcon />
                  </IconButton>

                  <IconButton
                    onClick={() => {
                      if (window.confirm("Delete this task?")) {
                        removeTask(t._id);
                      }
                    }}
                  >
                    <DeleteIcon />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}

            {tasks.length === 0 && !loading && (
              <TableRow>
                <TableCell colSpan={5} align="center">
                  No tasks.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </Box>
    </Box>
  );
};

export default TaskList;
