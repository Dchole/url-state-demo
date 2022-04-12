import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { data } from "../data";

interface IProps {
  id: string;
  open: boolean;
  handleClose: () => void;
}

export const ConfirmDelete = ({ id, open, handleClose }: IProps) => {
  const title = data.find(({ id: _id }) => _id === id)?.activity;

  const handleDelete = () => {
    const activityIndex = data.findIndex(({ id: _id }) => _id === id);

    if (activityIndex) {
      data.splice(activityIndex, 1);
      handleClose();
    }
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>
        Are you sure you want to delete {title} activity
      </DialogTitle>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button color="error" variant="contained" onClick={handleDelete}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};
