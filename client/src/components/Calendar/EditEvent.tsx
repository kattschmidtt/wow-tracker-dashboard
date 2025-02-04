import React from "react";
import { EventProps } from "react-big-calendar";
import { IconButton, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import "./CustomEvent.css"; // For hover styles

interface CustomEventProps extends EventProps {
  onEditClick: (event: any) => void; // Add this prop
}

const CustomEvent = ({ event, onEditClick }: CustomEventProps) => {
  return (
    <div className="custom-event-container">
      <span>{event.title}</span>
      <Tooltip title="Edit Event">
        <IconButton
          size="small"
          className="event-edit-icon"
          onClick={(e) => {
            e.stopPropagation();
            onEditClick(event);
          }}
        >
          <EditIcon fontSize="small" />
        </IconButton>
      </Tooltip>
    </div>
  );
};

export default CustomEvent;
