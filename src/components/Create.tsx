import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import {
  Button,
  Dialog,
  DialogContent,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField
} from "@mui/material";
import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { data } from "../data";

export const CreateModal = () => {
  const navigate = useNavigate();
  const { hash, pathname } = useLocation();
  const open = hash === "#create-new-activity";
  const [dueTime, setDueTime] = useState<Date | null>(new Date());

  const handleClose = () => {
    navigate(pathname, { replace: true });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    const newData: typeof data[0] = Object.fromEntries(formData.entries());
    newData.time = new Date(newData.time);

    data.unshift(newData);

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ textTransform: "capitalize" }}>
        Create New Activity
      </DialogTitle>
      <DialogContent>
        <form
          action="#"
          method="POST"
          onSubmit={handleSubmit}
          autoComplete="off"
        >
          <TextField
            id="activity"
            name="activity"
            label="Activity"
            margin="normal"
            fullWidth
          />
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DateTimePicker
              label="Date/Time"
              value={dueTime}
              onChange={(newValue) => {
                setDueTime(newValue);
              }}
              InputProps={{
                name: "time"
              }}
              renderInput={(params) => (
                <TextField {...params} fullWidth margin="normal" />
              )}
            />
          </LocalizationProvider>
          <FormControl fullWidth margin="normal">
            <InputLabel id="activity-status-label">Status</InputLabel>
            <Select
              name="status"
              labelId="activity-status-label"
              id="activity-status-select"
              label="Status"
            >
              <MenuItem value="on it">On it</MenuItem>
              <MenuItem value="upcoming">Upcoming</MenuItem>
              <MenuItem value="completed">Completed</MenuItem>
            </Select>
          </FormControl>
          <Stack direction="row" justifyContent="flex-end" spacing={2} mt={2}>
            <Button onClick={handleClose}>Cancel</Button>
            <Button type="submit" variant="contained">
              Save Changes
            </Button>
          </Stack>
        </form>
      </DialogContent>
    </Dialog>
  );
};
