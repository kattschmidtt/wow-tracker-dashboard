import { useState } from "react";
import InputModal from "../Generics/InputModal";
import CustomDateTimePicker from "../Generics/CustomDateTimePicker";
import {
  Box,
  Button,
  ButtonGroup,
  Checkbox,
  Fab,
  Tooltip,
  TextField,
  FormControl,
  FormControlLabel,
  Autocomplete,
  InputLabel,
  MenuItem,
  Select,
  Grid,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ToolbarProps } from "react-big-calendar";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { UserCalendarEventModel } from "../../Models/calendarModel";
import dayjs, { Dayjs } from "dayjs";

function CalendarToolbar(props: ToolbarProps) {
  const { label, onNavigate, onView } = props; //from react-big-calendar
  const [addEventModalOpen, setAddEventModalOpen] = useState(false);
  const [eventName, setEventName] = useState("");
  const [startDateTime, setStartDateTime] = useState<Dayjs | null>(null);
  const [endDateTime, setEndDateTime] = useState<Dayjs | null>(null);
  const [emailOptIn, setEmailOptIn] = useState(false);
  const [inAppOptIn, setInAppOptIn] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [repeatEvent, setRepeatEvent] = useState(false);
  const [repeatOccurrence, setRepeatOccurrence] = useState("never");

  //to bring up the add custom event modal
  const handleClickOpen = () => {
    setAddEventModalOpen(true);
  };
  const handleClickClose = () => {
    setAddEventModalOpen(false);
  };

  const handleAddEventSubmit = () => {
    const eventData: UserCalendarEventModel = {
      id: Math.floor(Math.random() * 1000000),
      title: eventName,
      start: startDateTime?.toDate() || new Date(),
      end: endDateTime?.toDate() || new Date(),
      tags: tags,
      emailOptIn: emailOptIn,
      inAppOptIn: inAppOptIn,
      description: description,
      repeatEvent: repeatEvent,
      repeatOccurance: repeatOccurrence,
    };

    const jsonData = JSON.stringify(eventData, null, 2);

    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "eventData.json";
    link.click();
    URL.revokeObjectURL(url);

    handleClickClose();
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
              onSubmit={handleAddEventSubmit}
            >
              <Grid container spacing={2}>
                {/* Event Name */}
                <Grid item xs={12}>
                  <TextField
                    label="Event Name"
                    variant="standard"
                    fullWidth
                    value={eventName}
                    onChange={(e) => setEventName(e.target.value)}
                    margin="normal"
                  />
                </Grid>

                {/* start and end date/time */}
                <Grid item xs={12}>
                  <Box display="flex" gap={2}>
                    <CustomDateTimePicker
                      label={"Start Date Time"}
                      value={startDateTime}
                      onChange={setStartDateTime}
                    />
                    <CustomDateTimePicker
                      label={"End Date Time"}
                      value={endDateTime}
                      onChange={setEndDateTime}
                    />
                  </Box>
                </Grid>

                {/* repeat event, email reminder, in app reminder */}
                <Grid item xs={12}>
                  <Box display="flex" gap={2} alignItems="center">
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={repeatEvent}
                          onChange={(e) => setRepeatEvent(e.target.checked)}
                        />
                      }
                      label="Repeat Event?"
                    />
                    {repeatEvent && (
                      <FormControl>
                        <InputLabel>Repeat Occurrence</InputLabel>
                        <Select
                          value={repeatOccurrence}
                          label="Repeat Occurrence"
                          onChange={(e) => setRepeatOccurrence(e.target.value)}
                        >
                          <MenuItem value={"never"}>Never</MenuItem>
                          <MenuItem value={"daily"}>Daily</MenuItem>
                          <MenuItem value={"weekly"}>Weekly</MenuItem>
                          <MenuItem value={"monthly"}>Monthly</MenuItem>
                        </Select>
                      </FormControl>
                    )}
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={emailOptIn}
                          onChange={(e) => setEmailOptIn(e.target.checked)}
                        />
                      }
                      label="Email Reminder?"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          checked={inAppOptIn}
                          onChange={(e) => setInAppOptIn(e.target.checked)}
                        />
                      }
                      label="In-App Reminder?"
                    />
                  </Box>
                </Grid>
                {/* tags */}
                <Grid item xs={12}>
                  <Autocomplete
                    multiple
                    options={["raid", "important", "guild event"]}
                    value={tags}
                    onChange={(_, newVal) => setTags(newVal)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        variant="standard"
                        placeholder="Tags"
                      />
                    )}
                  />
                </Grid>

                {/* description */}
                <Grid item xs={12}>
                  <TextField
                    label="Description"
                    fullWidth
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    multiline
                    variant="standard"
                  />
                </Grid>
              </Grid>
            </InputModal>
          </Tooltip>
        </div>
      </div>
    </>
  );
}

export default CalendarToolbar;
