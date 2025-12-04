import { createContext, useContext, useEffect, useState } from "react";
import {
  fetchTasks,
  createTask,
  updateTask,
  deleteTask,
} from "../services/tasksApi.js";

const TasksContext = createContext(null);

export const TasksProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterStatus, setFilterStatus] = useState("");
  const [filterPriority, setFilterPriority] = useState("");

  const loadTasks = async () => {
    setLoading(true);
    try {
      const data = await fetchTasks({
        status: filterStatus,
        priority: filterPriority,
        q: search,
      });
      setTasks(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadTasks();
  }, [search, filterStatus, filterPriority]);

  const addTask = async (payload) => {
    const newTask = await createTask(payload);
    setTasks((prev) => [newTask, ...prev]);
  };

  const editTask = async (id, payload) => {
    const updated = await updateTask(id, payload);
    setTasks((prev) => prev.map((t) => (t._id === id ? updated : t)));
  };

  const removeTask = async (id) => {
    await deleteTask(id);
    setTasks((prev) => prev.filter((t) => t._id !== id));
  };

  return (
    <TasksContext.Provider
      value={{
        tasks,
        loading,
        search,
        filterStatus,
        filterPriority,
        setSearch,
        setFilterStatus,
        setFilterPriority,
        reload: loadTasks,
        addTask,
        editTask,
        removeTask,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const ctx = useContext(TasksContext);
  if (!ctx) throw new Error("useTasks must be used within TasksProvider");
  return ctx;
};
