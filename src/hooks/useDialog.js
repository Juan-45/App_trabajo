import React from "react";

const useDialog = () => {
  const [openDialog, setOpenDialog] = React.useState(false);
  const closeDialog = () => setOpenDialog(false);

  return [openDialog, setOpenDialog, closeDialog];
};

export default useDialog;
