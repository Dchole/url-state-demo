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
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import { DateTimePicker, LocalizationProvider } from "@mui/lab";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { data } from "../data";
import { useState } from "react";

export const EditModal = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const { hash, pathname } = useLocation();
  const open = hash === "#edit";
  const [dueTime, setDueTime] = useState<Date | null>(new Date());
  const activityID = searchParams.get("activity");
  const activity = data.find(({ id }) => activityID === id);

  const handleClose = () => {
    const params = new URLSearchParams(searchParams);
    params.delete("activity");

    setSearchParams(params);
    navigate(pathname, { replace: true });
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);

    if (activity) {
      for (const [key, value] of formData.entries()) {
        const k = key as keyof typeof activity;

        if (k === "time") activity[k] = new Date(value);
        else activity[k] = value;
      }
    }

    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle sx={{ textTransform: "capitalize" }}>
        Edit {activity?.activity}
      </DialogTitle>
      <DialogContent>
        <form
          action="#"
          method="POST"
          autoComplete="off"
          onSubmit={handleSubmit}
        >
          <TextField
            id="activity"
            name="activity"
            label="Activity"
            margin="normal"
            defaultValue={activity?.activity || ""}
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
              defaultValue={activity?.status || ""}
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
