import { Snackbar, Alert, Slide, SlideProps } from "@mui/material";
import * as React from "react";

interface NotificationProps {
  message: string;
  severity: "success" | "error" | "info" | "warning";
  open: boolean;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({
  message,
  severity,
  open,
  onClose,
}) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={4000}
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      TransitionComponent={Slide}
      TransitionProps={{ direction: "up" } as SlideProps}
    >
      <Alert variant="filled"  onClose={onClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
};

export default Notification;
