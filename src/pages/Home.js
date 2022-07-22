import { generateDocument } from "helpers/tools";
import HeaderForm from "./home/HeaderForm";
import NewVictim from "./home/NewVictim";
import { Button, Grid, Typography } from "@mui/material";
import { useState } from "react";

const Home = () => {
  const [IPPHeader, setIPPHeader] = useState();
  const [victim, setVictim] = useState();
  console.table(IPPHeader);
  console.table(victim);

  return (
    <Grid container justifyContent="center">
      <Grid
        container
        maxWidth="1000px"
        direction="column"
        alignItems="center"
        sx={{ padding: "0px 40px" }}
      >
        <Typography variant="h4" textAlign="center" gutterBottom>
          Investigación Penal Preparatoria
        </Typography>
        <HeaderForm setIPPHeader={setIPPHeader} />
        <NewVictim setVictim={setVictim} />
        <Button onClick={() => generateDocument({ ...IPPHeader, ...victim })}>
          Generate document
        </Button>
      </Grid>
    </Grid>
  );
};

export default Home;
