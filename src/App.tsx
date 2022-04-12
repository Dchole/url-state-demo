import "@fontsource/roboto/400.css";

import { Header } from "./components/Header";
import { Activities } from "./components/Activities";
import { Container, CssBaseline, Fab } from "@mui/material";
import { Add } from "@mui/icons-material";

export default function App() {
  return (
    <>
      <CssBaseline />
      <Header />
      <Container
        maxWidth="lg"
        component="main"
        id="main-content"
        sx={{
          display: "grid",
          minHeight: "100vh",
          placeItems: "center"
        }}
      >
        <Activities />
        <Fab
          color="primary"
          href="#create-new-activity"
          aria-label="Create new Activity"
        >
          <Add />
        </Fab>
      </Container>
    </>
  );
}
