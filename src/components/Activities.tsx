import { Delete, Edit } from "@mui/icons-material";
import {
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from "@mui/material";
import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import { data } from "../data";
import { ConfirmDelete } from "./ConfirmDelete";
import { CreateModal } from "./Create";
import { EditModal } from "./Edit";

export const Activities = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const selected = searchParams.get("search");
  const [activityToDelete, setActivityToDelete] = useState("");

  const openEditModal = (event: React.MouseEvent<HTMLAnchorElement>) => {
    const { id } = event.currentTarget.dataset;

    const params = new URLSearchParams(searchParams);
    if (id) params.set("activity", id);

    setSearchParams(params);
  };

  const openConfirmation = (event: React.MouseEvent<HTMLButtonElement>) => {
    const { id } = event.currentTarget.dataset;
    if (id) setActivityToDelete(id);
  };

  const clearActivitiesToDelete = () => setActivityToDelete("");

  return (
    <>
      <Table
        sx={{ border: "1px solid", borderColor: "divider", bgcolor: "#fff" }}
      >
        <TableHead>
          <TableRow
            sx={{
              "& .MuiTableCell-root": {
                fontWeight: 700
              }
            }}
          >
            <TableCell variant="head">Activity</TableCell>
            <TableCell variant="head">Date/Time</TableCell>
            <TableCell variant="head">Status</TableCell>
            <TableCell variant="head">Actions</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {data.map(({ id, activity, time, status }) => (
            <TableRow
              key={id}
              sx={{
                transition: ({ transitions }) =>
                  transitions.create("background-color", {
                    easing: transitions.easing.easeOut,
                    duration: transitions.duration.shortest
                  }),
                bgcolor:
                  selected &&
                  activity.toLowerCase().includes(selected.toLowerCase())
                    ? "lightblue"
                    : undefined
              }}
            >
              <TableCell variant="body" sx={{ textTransform: "capitalize" }}>
                {activity}
              </TableCell>
              <TableCell variant="body">{time.toLocaleTimeString()}</TableCell>
              <TableCell variant="body">{status}</TableCell>
              <TableCell variant="body">
                <IconButton
                  href="#edit"
                  data-id={id}
                  onClick={openEditModal}
                  aria-label={`delete ${activity}`}
                >
                  <Edit />
                </IconButton>
                <IconButton
                  color="error"
                  data-id={id}
                  onClick={openConfirmation}
                  aria-label={`delete ${activity}`}
                >
                  <Delete />
                </IconButton>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <EditModal />
      <CreateModal />
      <ConfirmDelete
        id={activityToDelete}
        open={Boolean(activityToDelete)}
        handleClose={clearActivitiesToDelete}
      />
    </>
  );
};
