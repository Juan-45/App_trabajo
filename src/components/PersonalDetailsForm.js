import { Grid, Typography } from "@mui/material";
import Input from "components/Input";
import RadioInput from "components/RadioInput";
import DateInput from "components/DateInput";
import usePersonalDetailsForm from "./personalDetailsForm/usePersonalDetailsForm";

const PersonalDetailsForm = ({ title, setGlobalState }) => {
  const {
    onChangeHandler,
    debouncedSurname,
    debouncedName,
    debouncedNationality,
    debouncedAge,
    debouncedBirthDate,
    debouncedId,
    debouncedAddress,
    debouncedPhone,
  } = usePersonalDetailsForm({ setGlobalState });
  return (
    <Grid container alignItems="flex-start" justifyContent="center">
      <Typography variant="h5" textAlign="center" gutterBottom>
        {title}
      </Typography>
      <Grid container>
        <Input label="Apellido" name="surname" onChange={debouncedSurname} />
        <Input label="Nombre" name="name" onChange={debouncedName} />
      </Grid>
      <Grid container>
        <Input
          label="Nacionalidad"
          name="nationality"
          onChange={debouncedNationality}
        />
        <RadioInput
          title="Estado Civil"
          name="civilStatus"
          row
          options={[
            { label: "Soltero/a", value: "soltero/a" },
            { label: "Casado/a", value: "casado/a" },
            { label: "Divorciado/a", value: "divorciado/a" },
          ]}
          onChange={onChangeHandler("civilStatus")}
        />
      </Grid>
      <Grid container>
        <RadioInput
          title="Ocupación"
          name="occupation"
          row
          options={[
            { label: "Empleado", value: "empleado/a" },
            { label: "Desempleado", value: "desempleado/a" },
            { label: "Informal", value: "informal" },
          ]}
          onChange={onChangeHandler("occupation")}
        />
        <RadioInput
          title="Está instruido/a"
          name="education"
          row
          options={[
            { label: "Sí", value: "instruido/a" },
            { label: "No", value: "no instruido/a" },
          ]}
          onChange={onChangeHandler("education")}
        />
      </Grid>
      <Grid container>
        <Input
          label="Edad"
          name="age"
          type="number"
          inputProps={{ min: 0, max: 120 }}
          placeholder="40"
          onChange={debouncedAge}
        />
        <DateInput
          label="Fecha de nacimiento"
          name="birthDate"
          onChange={debouncedBirthDate}
        />
      </Grid>
      <Grid container>
        <Input label="DNI" name="id" onChange={debouncedId} />
        <Input
          label="Dirección"
          name="address"
          placeholder="Francia Nro. 2166 de Pergamino"
          onChange={debouncedAddress}
        />
      </Grid>
      <Grid container>
        <Input
          label="Teléfono"
          name="phone"
          placeholder="2477-15478952"
          onChange={debouncedPhone}
        />
      </Grid>
    </Grid>
  );
};

export default PersonalDetailsForm;
