import { Snackbar } from "@mui/material";
import * as React from "react";
const Notification = ({
  message,
  severity,
}: {
  message: string;
  severity: "success" | "error" | "info" | "warning";
}) => {
  const [open, setOpen] = React.useState(false);

  //   const handleClick = (
  //     message: string,
  //     severity: "success" | "error" | "info" | "warning"
  //   ) => {};
  return (
    <div>
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
        message={message}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        key={`${severity}-${message}`}
      />
    </div>
  );
};

export default Notification;
