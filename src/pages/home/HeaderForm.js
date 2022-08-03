import { Grid } from "@mui/material";
import Input from "components/Input";
import { memo } from "react";
import useHeaderForm from "./headerForm/useHeaderForm";

const HeaderForm = ({ setIPPHeader }) => {
  const {
    debouncedCover,
    debouncedIppNro,
    debouncedProsecution,
    debouncedCourt,
    debouncedInstructor,
    debouncedSecretary,
  } = useHeaderForm({ setIPPHeader });

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="flex-start"
      sx={{ marginBottom: "30px" }}
    >
      <Grid container>
        <Input
          label="Carátula"
          name="cover"
          placeholder="Ingrese la carátula sin vtma. e impt."
          onChange={debouncedCover}
        />
        <Input
          label="Nro. IPP"
          name="ippNro"
          placeholder="Ingrse número de cuatro cífras"
          onChange={debouncedIppNro}
        />
      </Grid>
      <Grid container>
        <Input
          label="Fiscalía"
          name="prosecution"
          placeholder="Ingrese solo el número"
          onChange={debouncedProsecution}
        />
        <Input
          label="Juzgado de Garantías"
          name="court"
          placeholder="Ingrese solo el número"
          onChange={debouncedCourt}
        />
      </Grid>
      <Grid container>
        <Input
          label="Instructor"
          name="instructor"
          placeholder="Jerarquía, Apellido y Nombre"
          onChange={debouncedInstructor}
        />
        <Input
          label="Secretario"
          name="secretary"
          placeholder="Jerarquía, Apellido y Nombre"
          onChange={debouncedSecretary}
        />
      </Grid>
    </Grid>
  );
};

export default memo(HeaderForm);
