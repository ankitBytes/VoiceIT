import { useState } from "react";
import { CssBaseline, Container, Box } from "@mui/material";
import Header from "./components/Header.jsx";
import TaskBoard from "./components/TaskBoard.jsx";
import TaskList from "./components/TaskList.jsx";
import TaskFormModal from "./components/TaskFormModal.jsx";
import VoiceInputModal from "./components/VoiceInputModal.jsx";
import { TasksProvider } from "./context/TasksContext.jsx";

function App() {
  const [view, setView] = useState("board"); // 'board' | 'list'
  const [isTaskModalOpen, setTaskModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [isVoiceModalOpen, setVoiceModalOpen] = useState(false);
  const [parsedFromVoice, setParsedFromVoice] = useState(null);

  return (
    <TasksProvider>
      <CssBaseline />
      <Container maxWidth="lg" sx={{ py: 4, overflow: 'hidden' }}>
        <Header
          view={view}
          onViewChange={setView}
          onAddTask={() => {
            setEditingTask(null);
            setTaskModalOpen(true);
          }}
          onVoiceClick={() => setVoiceModalOpen(true)}
        />

        <Box sx={{ mt: 3 }}>
          {view === "board" ? (
            <TaskBoard
              onEditTask={(task) => {
                setEditingTask(task);
                setTaskModalOpen(true);
              }}
            />
          ) : (
            <TaskList
              onEditTask={(task) => {
                setEditingTask(task);
                setTaskModalOpen(true);
              }}
            />
          )}
        </Box>

        <TaskFormModal
          open={isTaskModalOpen}
          onClose={() => setTaskModalOpen(false)}
          initialData={editingTask || parsedFromVoice}
          clearInitialData={() => setParsedFromVoice(null)}
        />

        <VoiceInputModal
          open={isVoiceModalOpen}
          onClose={() => setVoiceModalOpen(false)}
          onParsedTask={(taskData) => {
            setParsedFromVoice(taskData);
            setVoiceModalOpen(false);
            setTaskModalOpen(true);
          }}
        />
      </Container>
    </TasksProvider>
  );
}

export default App;
