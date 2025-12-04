import { Box, Button, Divider, IconButton, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import ClearIcon from "@mui/icons-material/Clear";
import TodoContainer from "../components/todoContainer.jsx";

const ToDoApp = () => {
  const [toDo, setToDo] = useState("");
  const [toDos, setToDos] = useState(() => {
    const saved = localStorage.getItem("todo_list_data");
    const initialValue = JSON.parse(saved);
    return initialValue || [];
  });
  const [bottomNavItemID, setBottomNavItemID] = useState("nav_onGo");
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const getTime = () => {
    const currDate = new Date();
    const hour = currDate.getHours();
    const minute = currDate.getMinutes();
    const AMorPM = hour >= 12 ? "PM" : "AM";
    let hour_12 = hour % 12;
    if (hour_12 === 0) hour_12 = 12;
    let minute_00 = minute.toString();
    if (minute < 10) minute_00 = `0${minute}`;
    return `${hour_12}:${minute_00} ${AMorPM}`;
  };

  const getDay = () => {
    const currDate = new Date();
    const dayNames_full = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ];
    const day_full = dayNames_full[currDate.getDay()];
    const dayNames_short = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
    const day_short = dayNames_short[currDate.getDay()];
    return { full: day_full, short: day_short };
  };

  const getDate = () => {
    const currDate = new Date();
    const dateSplit = currDate
      .toString()
      .slice(4, 15)
      .split(" ");
    return `${dateSplit[0]} ${dateSplit[1]}, ${dateSplit[2]}`;
  };

  useEffect(() => {
    const touchValue = touchEnd - touchStart;
    const swipeSensitivity = 150;
    if (touchEnd !== null) {
      if (touchValue > swipeSensitivity) {
        if (bottomNavItemID === "nav_done") {
          setBottomNavItemID("nav_onGo");
          setTouchStart(touchEnd);
        } else if (bottomNavItemID === "nav_onGo") {
          setBottomNavItemID("nav_drop");
          setTouchStart(touchEnd);
        }
      }
      if (touchValue < -swipeSensitivity) {
        if (bottomNavItemID === "nav_drop") {
          setBottomNavItemID("nav_onGo");
          setTouchStart(touchEnd);
        } else if (bottomNavItemID === "nav_onGo") {
          setBottomNavItemID("nav_done");
          setTouchStart(touchEnd);
        }
      }
    }
    return () => setTouchEnd(null);
  }, [touchEnd, touchStart, bottomNavItemID]);

  const handleUserInput = (e) => {
    setToDo(e.target.value);
  };

  const handleInputSubmit = (e) => {
    e.preventDefault();
    if (toDo.trim().length > 0) {
      setToDos([
        ...toDos,
        {
          id: Date.now(),
          text: toDo,
          status: "onGo",
          moment: {
            time: getTime(),
            day: getDay()?.short,
            date: getDate(),
          },
        },
      ]);
      setToDo("");
      setBottomNavItemID("nav_onGo");
    }
  };

  const resetInputField = () => {
    setToDo("");
  };

  const handleBottomNavControl = (navItemID) => {
    setBottomNavItemID(navItemID);
  };

  useEffect(() => {
    if (toDos) {
      const index = toDos.findIndex((obj) => obj.status === "remove");
      if (index > -1) toDos.splice(index, 1);
    }
    localStorage.setItem("todo_list_data", JSON.stringify(toDos));
  }, [toDos]);

  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  return (
    <Box>
      <Box
        component="form"
        onSubmit={handleInputSubmit}
        sx={{ display: "flex", alignItems: "center", marginBottom: 4 }}
      >
        <TextField
          fullWidth
          multiline
          rows={3}
          variant="outlined"
          value={toDo}
          onChange={handleUserInput}
          placeholder="Plan something . . ."
        />
        <Stack direction={"column"}>
          <IconButton type="submit">
            <AddIcon />
          </IconButton>
          <IconButton onClick={resetInputField}>
            <ClearIcon />
          </IconButton>
        </Stack>
      </Box>
      <Box>
        {["done", "onGo", "drop"].map((status) => (
          <Box
            key={status}
            className={`list ${status}`}
            sx={{
              display: bottomNavItemID === `nav_${status}` ? "block" : "none",
              marginBottom: 4,
            }}
          >
            <Typography variant="h6">
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </Typography>
            <Divider sx={{ marginBottom: 2 }} />
            <Box>
              {toDos
                .filter((item) => item.status === status)
                .map((todo) => (
                  <TodoContainer
                    key={todo.id}
                    listID={status}
                    todo={todo}
                    setToDos={setToDos}
                  />
                ))}
            </Box>
          </Box>
        ))}
      </Box>
      <Box
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backgroundColor: "white",
          display: "flex",
          justifyContent: "space-around",
          boxShadow: "0 -2px 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        {["done", "onGo", "drop"].map((navItem) => (
          <Button
            key={navItem}
            sx={{
              flex: 1,
              padding: 2,
              textTransform: "none",
              backgroundColor:
                bottomNavItemID === `nav_${navItem}`
                  ? "rgba(0, 0, 0, 0.1)"
                  : "transparent",
            }}
            onClick={() => handleBottomNavControl(`nav_${navItem}`)}
          >
            {navItem.charAt(0).toUpperCase() + navItem.slice(1)}
          </Button>
        ))}
      </Box>
    </Box>
  );
};

export default ToDoApp