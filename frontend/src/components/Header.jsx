import {
  Box,
  Typography,
  ToggleButton,
  ToggleButtonGroup,
  TextField,
  IconButton,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import MicIcon from "@mui/icons-material/Mic";
import { useTasks } from "../context/TasksContext.jsx";

const Header = ({ view, onViewChange, onAddTask, onVoiceClick }) => {
  const { search, setSearch } = useTasks();

  return (
    <Box
      sx={{
        display: "flex",
        flexWrap: "wrap",
        gap: 2,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <Typography variant="h4" fontWeight="bold">
          Voice Task Tracker
        </Typography>
        <Typography variant="body2" color="text.secondary">
          Speak your tasks. Let the app do the boring parsing.
        </Typography>
      </Box>

      <Box sx={{ display: "flex", gap: 2, alignItems: "center" }}>
        <TextField
          size="small"
          placeholder="Search by title or description"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <ToggleButtonGroup
          size="small"
          value={view}
          exclusive
          onChange={(e, val) => val && onViewChange(val)}
        >
          <ToggleButton value="board">Board</ToggleButton>
          <ToggleButton value="list">List</ToggleButton>
        </ToggleButtonGroup>

        <IconButton onClick={onVoiceClick}>
          <MicIcon />
        </IconButton>

        <IconButton color="primary" onClick={onAddTask}>
          <AddIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Header;
