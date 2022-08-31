import { DialogContent, DialogContentText, DialogTitle } from "@mui/material/";
import DialogWrapper from "components/DialogWrapper"

const DialogText = ({
    openDialog,
    closeDialog,
    text,
    title,
}) => {
    return (openDialog, closeDialog,
        <DialogWrapper open={openDialog} closeHandler={closeDialog} scroll='body'>
            <DialogTitle>{title}</DialogTitle>
            <DialogContent>
                <DialogContentText tabIndex={-1}>{text}</DialogContentText>
            </DialogContent>
        </DialogWrapper>
    );
};

export default DialogText;
