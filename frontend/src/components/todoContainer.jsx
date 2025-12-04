const TodoContainer = ({ listID, todo, setToDos }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editText, setEditText] = useState(todo.text);

  const handleToDoStatus = (todoID, status) => {
    setToDos((prevTodos) =>
      prevTodos.map((item) => (item.id === todoID ? { ...item, status } : item))
    );
  };

  const handleEditToggle = () => {
    setIsEditing((prev) => !prev);
    setEditText(todo.text); // Reset edit text when toggling
  };

  const handleEditChange = (e) => {
    setEditText(e.target.value);
  };

  const handleSaveEdit = () => {
    setToDos((prevTodos) =>
      prevTodos.map((item) =>
        item.id === todo.id ? { ...item, text: editText } : item
      )
    );
    setIsEditing(false);
  };

  return (
    <Paper
      key={todo.id}
      sx={{ margin: 1, padding: 2, display: "flex", alignItems: "center" }}
    >
      {(listID === "onGo" || listID === "drop") && (
        <IconButton
          onClick={() => {
            if (listID === "onGo") {
              handleToDoStatus(todo.id, "done");
            } else if (listID === "drop") {
              let isRetrieve = window.confirm("Retrieving dropped todo.");
              if (isRetrieve) handleToDoStatus(todo.id, "onGo");
            }
          }}
        >
          {listID === "onGo" ? <CheckIcon /> : <RedoIcon />}
        </IconButton>
      )}
      <Box sx={{ flex: 1, paddingLeft: 2 }}>
        {isEditing ? (
          <TextField
            fullWidth
            variant="outlined"
            value={editText}
            onChange={handleEditChange}
            sx={{ marginBottom: 1 }}
          />
        ) : (
          <>
            <Typography
              variant="body1"
              sx={{
                textDecoration:
                  listID === "done" || listID === "drop"
                    ? "line-through"
                    : "none",
              }}
            >
              {todo.text}
            </Typography>
            <Typography variant="body2">{`${todo.moment.time} ${todo.moment.day} ${todo.moment.date}`}</Typography>
          </>
        )}
      </Box>
      <Stack direction="row" spacing={1}>
        {listID === "onGo" && !isEditing && (
          <IconButton onClick={handleEditToggle}>
            <EditIcon />
          </IconButton>
        )}
        {isEditing && (
          <IconButton onClick={handleSaveEdit}>
            <SaveIcon />
          </IconButton>
        )}
        {(listID === "done" || listID === "onGo" || listID === "drop") && (
          <IconButton
            onClick={() => {
              if (listID === "done" || listID === "drop") {
                let isRemove = window.confirm("Removing todo permanently!");
                if (isRemove) handleToDoStatus(todo.id, "remove");
              } else if (listID === "onGo") {
                handleToDoStatus(todo.id, "drop");
              }
            }}
          >
            {listID === "done" || listID === "drop" ? (
              <DeleteIcon />
            ) : (
              <CloseIcon />
            )}
          </IconButton>
        )}
      </Stack>
    </Paper>
  );
};

export default TodoContainer;