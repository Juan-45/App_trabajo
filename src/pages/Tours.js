import React from "react";
import Context from "./Context";
import useDebounceHandler from "hooks/useDebounceHandler";
import { getMonthString } from "helpers/date";
import PageWrapper from "components/PageWrapper";
import PageTitle from "components/PageTitle";
import Input from "components/Input";
import { Box, Button } from "@mui/material";

const Tours = () => {
  const { getDebouncedHandler } = useDebounceHandler();

  const { currentDate } = React.useContext(Context);

  const [formValues, setFormValues] = React.useState({
    frequency: "",
    day: currentDate.day,
    month: currentDate.month,
    year: currentDate.year,
    policeStation: "Seccional Comando Patrulla Pergamino",
    prosecution: "",
    felony: "",
    victim: "",
    address: "",
    phone: "",
  });

  const getOnChangeHandler = (name) => (value) => {
    if (name === "date") {
      const selectedDate = {
        day: value.getDate(),
        month: getMonthString(value),
        year: value.getFullYear(),
      };
      setFormValues((prevState) => ({
        ...prevState,
        ...selectedDate,
      }));
    } else {
      setFormValues((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const getOnChangeHandlerDebounced = getDebouncedHandler(getOnChangeHandler);

  const frequencyOnChange = getOnChangeHandlerDebounced("frequency");

  const dateOnChange = getOnChangeHandlerDebounced("date");

  const policeStationOnChange = getOnChangeHandlerDebounced("policeStation");

  const prosecutionOnChange = getOnChangeHandlerDebounced("prosecution");

  const felonyOnChange = getOnChangeHandlerDebounced("felony");

  const victimOnChange = getOnChangeHandlerDebounced("victim");

  const addressOnChange = getOnChangeHandlerDebounced("address");

  const phoneOnChange = getOnChangeHandlerDebounced("phone");

  console.table("Tabla de valores de form recorridas", formValues);

  return (
    <PageWrapper>
      <PageTitle>Recorridas dinámicas</PageTitle>
      <Box sx={{ padding: "30px" }}>
        <Input label="Frecuencia (Hs.)" onChange={frequencyOnChange} />
        <Input label="Fecha" onChange={dateOnChange} />
        <Input label="Dependencia" onChange={policeStationOnChange} />
        <Input label="Fiscalía" onChange={prosecutionOnChange} />
        <Input label="Carátula" onChange={felonyOnChange} />
        <Input label="Víctima" onChange={victimOnChange} />
        <Input label="Domicilio" onChange={addressOnChange} />
        <Input label="Teléfono" onChange={phoneOnChange} />
        <Button>Enviar</Button>
      </Box>
    </PageWrapper>
  );
};

export default Tours;
