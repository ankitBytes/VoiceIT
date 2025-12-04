import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Button,
  Stack,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useTasks } from "../context/TasksContext.jsx";

const defaultValues = {
  title: "",
  description: "",
  status: "todo",
  priority: "medium",
  dueDate: "",
};

const TaskFormModal = ({ open, onClose, initialData, clearInitialData }) => {
  const [values, setValues] = useState(defaultValues);
  const { addTask, editTask } = useTasks();

  useEffect(() => {
    if (initialData) {
      setValues({
        title: initialData.title || "",
        description: initialData.description || "",
        status: initialData.status || "todo",
        priority: initialData.priority || "medium",
        dueDate: initialData.dueDate
          ? new Date(initialData.dueDate).toISOString().slice(0, 10)
          : "",
      });
    } else {
      setValues(defaultValues);
    }
  }, [initialData, open]);

  const handleChange = (field) => (e) => {
    setValues((v) => ({ ...v, [field]: e.target.value }));
  };

  const handleSubmit = async () => {
    if (!values.title.trim()) {
      alert("Title is required");
      return;
    }

    const payload = {
      title: values.title.trim(),
      description: values.description.trim(),
      status: values.status,
      priority: values.priority,
      dueDate: values.dueDate || null,
    };

    if (initialData && initialData._id) {
      await editTask(initialData._id, payload);
    } else {
      await addTask(payload);
    }

    if (clearInitialData) clearInitialData();
    onClose();
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>{initialData ? "Edit Task" : "Create Task"}</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <TextField
            label="Title"
            value={values.title}
            onChange={handleChange("title")}
            fullWidth
          />
          <TextField
            label="Description"
            value={values.description}
            onChange={handleChange("description")}
            fullWidth
            multiline
            minRows={2}
          />
          <Stack direction="row" spacing={2}>
            <TextField
              label="Status"
              select
              fullWidth
              value={values.status}
              onChange={handleChange("status")}
            >
              <MenuItem value="todo">To Do</MenuItem>
              <MenuItem value="in-progress">In Progress</MenuItem>
              <MenuItem value="done">Done</MenuItem>
            </TextField>
            <TextField
              label="Priority"
              select
              fullWidth
              value={values.priority}
              onChange={handleChange("priority")}
            >
              <MenuItem value="low">Low</MenuItem>
              <MenuItem value="medium">Medium</MenuItem>
              <MenuItem value="high">High</MenuItem>
            </TextField>
          </Stack>
          <TextField
            label="Due Date"
            type="date"
            InputLabelProps={{ shrink: true }}
            value={values.dueDate}
            onChange={handleChange("dueDate")}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} variant="contained">
          {initialData ? "Save" : "Create"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default TaskFormModal;
