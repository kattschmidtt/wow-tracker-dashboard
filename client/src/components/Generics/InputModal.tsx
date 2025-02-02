import React, { forwardRef, ReactElement } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Zoom } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

const Transition = forwardRef(function Transition(
  props: TransitionProps & {
    children: ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Zoom ref={ref} {...props} />;
});

interface InputModalProps {
  open: boolean;
  close: () => void;
  title: string;
  eventType: string;
}

const InputModal = ({ open, close, title, eventType }: InputModalProps) => {
  const handleAddEvent = () => {
    alert("you have added the event yippie!");
  };

  return (
    <Dialog open={open} onClose={close} TransitionComponent={Transition}>
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText>
          this would be the super informative form
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleAddEvent}>{eventType}</Button>
        <Button onClick={close}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default InputModal;

