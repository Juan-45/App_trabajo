import React from "react";
import Context from "./Context";
import useDebounceHandler from "hooks/useDebounceHandler";
import PageWrapper from "components/PageWrapper";
import PageTitle from "components/PageTitle";
import Input from "components/Input";

const Tours = () => {
  const { getDebouncedHandler } = useDebounceHandler();

  const { day, month, year } = React.useContext(Context);

  const [formValues, setFormValues] = React.useState({
    frequency: "",
    day: day,
    month: month,
    year: year,
    policeStation: "Seccional Comando Patrulla Pergamino",
    prosecution: "",
    felony: "",
    victim: "",
    address: "",
    phone: "",
  });

  const getOnChangeHandler = (name) => (value) =>
    setFormValues((prevState) => ({
      ...prevState,
      [name]: value,
    }));

  const getOnChangeHandlerDebounced = getDebouncedHandler(getOnChangeHandler);

  const frequencyOnChange = getOnChangeHandlerDebounced("frequency");

  console.table("Tabla de valores de form recorridas", formValues);

  return (
    <PageWrapper>
      <PageTitle>Recorridas dinámicas</PageTitle>

      <Input label='Frecuencia (Hs.)' onChange={frequencyOnChange} />
      <Input label='Día (Nro)' />
      <Input label='Mes (no Nro)' />
      <Input label='Año (Nro)' />
      <Input label='Dependencia' />
      <Input label='Fiscalía' />
      <Input label='Carátula' />
      <Input label='Víctima' />
      <Input label='Domicilio' />
      <Input label='Teléfono' />
    </PageWrapper>
  );
};

export default Tours;
