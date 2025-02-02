import { useState } from "react";
import InputModal from "../Generics/InputModal";
import { Button, ButtonGroup, Fab, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ToolbarProps } from "react-big-calendar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";

function CalendarToolbar(props: ToolbarProps) {
  const { label, onNavigate, onView } = props; //from react-big-calendar
  const [addEventModalOpen, setAddEventModalOpen] = useState(false);

  //to bring up the add custom event modal
  const handleClickOpen = () => {
    setAddEventModalOpen(true);
  };
  const handleClickClose = () => {
    setAddEventModalOpen(false);
  };

  return (
    <>
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: "1rem",
        }}
      >
        <Button onClick={() => onNavigate("PREV")}>
          <ArrowBackIosIcon />
        </Button>
        <h1 style={{ margin: "0 1rem" }}>{label}</h1>
        <Button onClick={() => onNavigate("NEXT")}>
          <ArrowForwardIosIcon />
        </Button>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "0.5rem",
        }}
      >
        <div>
          <ButtonGroup variant="text">
            <Button variant="outlined" onClick={() => onView("month")}>
              Month
            </Button>
            <Button variant="outlined" onClick={() => onView("week")}>
              Week
            </Button>
            <Button variant="outlined" onClick={() => onView("day")}>
              Day
            </Button>
          </ButtonGroup>
        </div>

        <div>
          <Tooltip title="Add custom event" placement="left">
            <Fab
              onClick={handleClickOpen}
              size="small"
              color="primary"
              aria-label="add-event"
            >
              <AddIcon />
            </Fab>
            <InputModal
              open={addEventModalOpen}
              close={handleClickClose}
              title={"Add an event"}
              eventType={"Add"}
            />
          </Tooltip>
        </div>
      </div>
    </>
  );
}

export default CalendarToolbar;

