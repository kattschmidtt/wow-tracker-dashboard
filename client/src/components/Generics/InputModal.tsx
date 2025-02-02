import React, { forwardRef, ReactElement, ReactNode } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Zoom } from "@mui/material";
import { TransitionProps } from "@mui/material/transitions";

//to make go woosh and zoom
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
  onSubmit: () => void;
  children: ReactNode; //any type of
}

const InputModal = ({
  open,
  close,
  title,
  eventType,
  onSubmit,
  children,
}: InputModalProps) => {
  return (
    <Dialog open={open} onClose={close} TransitionComponent={Transition}>
      {title && <DialogTitle>{title}</DialogTitle>}
      <DialogContent>
        <DialogContentText>{children}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={onSubmit} type="submit">
          {eventType}
        </Button>
        <Button onClick={close}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
};

export default InputModal;

