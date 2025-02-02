import { useState } from "react";
import InputModal from "../Generics/InputModal";
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

function CalendarToolbar(props: ToolbarProps) {
  const { label, onNavigate, onView } = props; //from react-big-calendar
  const [addEventModalOpen, setAddEventModalOpen] = useState(false);
  const [repeatEvent, setRepeatEvent] = useState("never"); //auto set to never repeat

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
              onSubmit={() => alert("i submit")}
            >
              <Grid container spacing={2}>
                {/* Event Name */}
                <Grid item xs={12}>
                  <TextField
                    label="Event Name"
                    variant="standard"
                    fullWidth
                    margin="normal"
                  />
                </Grid>

                {/* start and end date/time */}
                <Grid item xs={12}>
                  <Box display="flex" gap={2}>
                    <Button
                      onClick={() =>
                        alert("this will pop up Date and Time picker")
                      }
                    >
                      Start Date/Time
                    </Button>
                    <Button
                      onClick={() =>
                        alert("this will pop up Date and Time picker")
                      }
                    >
                      End Date/Time
                    </Button>
                  </Box>
                </Grid>

                {/* repeat event, email reminder, in app reminder */}
                <Grid item xs={12}>
                  <Box display="flex" gap={2} alignItems="center">
                    <FormControl>
                      <InputLabel>Repeat event?</InputLabel>
                      <Select value={repeatEvent} label="Repeat event?">
                        <MenuItem value={"never"}>Never</MenuItem>
                        <MenuItem value={"daily"}>Daily</MenuItem>
                        <MenuItem value={"weekly"}>Weekly</MenuItem>
                      </Select>
                    </FormControl>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Email reminder?"
                    />
                    <FormControlLabel
                      control={<Checkbox />}
                      label="In App reminder?"
                    />
                  </Box>
                </Grid>

                {/* tags */}
                <Grid item xs={12}>
                  <Autocomplete
                    multiple
                    options={["peepee", "poopoo"]}
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

