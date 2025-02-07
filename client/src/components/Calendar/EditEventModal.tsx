import { useState, useEffect } from "react";
import dayjs, { Dayjs } from "dayjs";
import {
  Grid,
  Box,
  FormControl,
  FormControlLabel,
  Checkbox,
  MenuItem,
  Select,
  InputLabel,
  TextField,
  Autocomplete,
} from "@mui/material";
import InputModal from "../Generics/InputModal";
import CustomDateTimePicker from "../Generics/CustomDateTimePicker";
import { UserCalendarEventModel } from "../../Models/calendarModel";

interface EditEventModalProps {
  event: UserCalendarEventModel | null;
  open: boolean;
  onClose: () => void;
  onSubmit: (updatedEvent: UserCalendarEventModel) => void;
  onDelete: (deleteEvent: UserCalendarEventModel) => void;
}

const EditEventModal = ({
  event,
  open,
  onClose,
  onSubmit,
  onDelete,
}: EditEventModalProps) => {
  // Form state
  const [eventName, setEventName] = useState("");
  const [startDateTime, setStartDateTime] = useState<Dayjs | null>(null);
  const [endDateTime, setEndDateTime] = useState<Dayjs | null>(null);
  const [dateError, setDateError] = useState(false);
  const [emailOptIn, setEmailOptIn] = useState(false);
  const [inAppOptIn, setInAppOptIn] = useState(false);
  const [tags, setTags] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [repeatEvent, setRepeatEvent] = useState(false);
  const [repeatOccurrence, setRepeatOccurrence] = useState("never");

  // Initialize form when event changes
  useEffect(() => {
    if (event) {
      setEventName(event.title);
      setStartDateTime(dayjs(event.start));
      setEndDateTime(dayjs(event.end));
      setTags(event.tags || []);
      setEmailOptIn(event.emailOptIn || false);
      setInAppOptIn(event.inAppOptIn || false);
      setDescription(event.description || "");
      setRepeatEvent(event.repeatEvent || false);
      setRepeatOccurrence(event.repeatOccurance || "never");
    }
  }, [event]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (
      !event ||
      !startDateTime ||
      !endDateTime ||
      startDateTime.isAfter(endDateTime)
    ) {
      setDateError(true);
      return;
    }

    const updatedEvent: UserCalendarEventModel = {
      ...event,
      title: eventName,
      start: startDateTime.toDate(),
      end: endDateTime.toDate(),
      tags,
      emailOptIn,
      inAppOptIn,
      description,
      repeatEvent,
      repeatOccurance: repeatOccurrence,
    };

    onSubmit(updatedEvent);
    onClose();
  };

  const handleDelete = () => {
    if (event) onDelete(event);
    onClose();
  };

  return (
    <InputModal
      open={open}
      close={onClose}
      title="Edit Event"
      submitLabel="Save Changes"
      onSubmit={handleSubmit}
      eventType={"Update"}
      onDelete={handleDelete}
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

        {/* Date/Time Pickers */}
        <Grid item xs={12}>
          <Box display="flex" gap={2}>
            <CustomDateTimePicker
              label="Start Date Time"
              value={startDateTime}
              onChange={setStartDateTime}
            />
            <CustomDateTimePicker
              label="End Date Time"
              value={endDateTime}
              onChange={setEndDateTime}
            />
          </Box>
        </Grid>

        {/* Recurrence and Reminders */}
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

        {/* Tags */}
        <Grid item xs={12}>
          <Autocomplete
            multiple
            options={["raid", "important", "guild event"]}
            value={tags}
            onChange={(_, newVal) => setTags(newVal)}
            renderInput={(params) => (
              <TextField {...params} variant="standard" placeholder="Tags" />
            )}
          />
        </Grid>

        {/* Description */}
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
  );
};

export default EditEventModal;
