import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  Stack,
  TextField,
  Chip,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useVoiceInput } from "../hooks/useVoiceInput.js";
import { parseVoiceTask } from "../utils/parseVoiceTask.js";

const VoiceInputModal = ({ open, onClose, onParsedTask }) => {
  const { listening, transcript, error, start, stop, setTranscript } = useVoiceInput();
  const [parsed, setParsed] = useState(null);

  useEffect(() => {
    if (!open) {
      setTranscript("");
      setParsed(null);
    }
  }, [open, setTranscript]);

  const handleParse = () => {
    const p = parseVoiceTask(transcript);
    setParsed(p);
  };

  const handleUseParsed = () => {
    if (!parsed) return;
    onParsedTask({
      title: parsed.title,
      description: parsed.description,
      priority: parsed.priority,
      status: parsed.status,
      dueDate: parsed.dueDate,
      _fromVoice: true,
    });
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Voice Task Input</DialogTitle>
      <DialogContent>
        <Stack spacing={2} sx={{ mt: 1 }}>
          <Typography variant="body2" color="text.secondary">
            Press "Start Listening", speak naturally, then stop and review the parsed task.
          </Typography>
          <Stack direction="row" spacing={1}>
            <Button
              variant="contained"
              onClick={listening ? stop : start}
            >
              {listening ? "Stop Listening" : "Start Listening"}
            </Button>
            {listening && <Chip label="Listening..." />}
          </Stack>

          {error && (
            <Typography color="error" variant="body2">
              {error}
            </Typography>
          )}

          <TextField
            label="Transcript"
            multiline
            minRows={3}
            value={transcript}
            onChange={(e) => setTranscript(e.target.value)}
          />

          <Button onClick={handleParse} disabled={!transcript.trim()}>
            Parse Transcript
          </Button>

          {parsed && (
            <Box sx={{ p: 2, borderRadius: 2, bgcolor: "#fafafa" }}>
              <Typography variant="subtitle2" gutterBottom>
                Parsed Fields (editable later in the task form):
              </Typography>
              <Typography variant="body2">
                <strong>Title:</strong> {parsed.title || "<not detected>"}
              </Typography>
              <Typography variant="body2">
                <strong>Priority:</strong> {parsed.priority}
              </Typography>
              <Typography variant="body2">
                <strong>Status:</strong> {parsed.status}
              </Typography>
              <Typography variant="body2">
                <strong>Due Date:</strong>{" "}
                {parsed.dueDate ? parsed.dueDate : "<not detected>"}
              </Typography>
            </Box>
          )}
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose}>Cancel</Button>
        <Button
          onClick={handleUseParsed}
          disabled={!parsed || !parsed.title.trim()}
          variant="contained"
        >
          Use Parsed Task
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default VoiceInputModal;
