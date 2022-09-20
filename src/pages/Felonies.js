import React from "react";
import Context from "../Context";
import useDebounceHandler from "hooks/useDebounceHandler";
import useSave from "hooks/useSave";
import {
  getMonthString,
  getDateAsString,
  dateIsValid,
  getDateObjFrom,
  isDateOutdated,
} from "helpers/date";
import { isNotEmptyString } from "helpers/data";
import { createToursTemplate, stringifyDataFromArray } from "helpers/tools";
import { Button, Grid } from "@mui/material";
import PageWrapper from "components/PageWrapper";
import PageTitle from "components/PageTitle";
import Input from "components/Input";
import ComboBox from "components/ComboBox";
import DateInput from "components/DateInput";
import CustomPaper from "components/CustomPaper";
import { v4 as uuid } from "uuid";

const Felonies = () => {
  const {
    currentDate,
    currentInstructor,
    felonies,
    prosecutions,
    courts,
    setContextState,
  } = React.useContext(Context);

  if (!currentInstructor) {
    console.log(
      "ATENCIÓN: NO HAY UN INSTRUCTOR EN TURNO SELECCIONADO - currentInstructor:",
      currentInstructor
    );
  }

  const { saveAppData, appDataAsString } = useSave();

  const getFeloniesOptions = (felonies) =>
    felonies.map((obj) => ({ label: obj.felony, id: obj.id }));

  const feloniesOptions = getFeloniesOptions(felonies);

  const felonyDefault = {
    felony: "",
    ipp: "",
    victims: "",
    suspects: "",
    prosecution: "",
    prosecutionOption: null,
    prosecutor: "",
    court: "",
    courtOption: null,
    judge: "",
    involved: [],
    day: currentDate.day,
    month: currentDate.month,
    year: currentDate.year,
    summaryAbbreviatedDateStr: getDateAsString(currentDate.object),
    felonyLocation: "",
    id: "",
  };

  const [currentFelony, setCurrentFelony] = React.useState(felonyDefault);

  const [felonyWasSelected, setFelonyWasSelected] = React.useState(false);

  console.log("currentFelony", currentFelony);

  const [currentInvolved, setCurrentInvolved] = React.useState({
    type: "",
    fullName: "",
    nationality: "",
    education: "",
    civilStatus: "",
    occupation: "",
    age: "",
    birthDate: "",
    dni: "",
    address: "",
    phone: "",
    id: "",
  });

  const [shouldReset, setShouldReset] = React.useState(false);

  const addFelony = (newFelony) => {
    const newFelonyIsValid = (newFelony) =>
      isNotEmptyString(newFelony.felony) &&
      isNotEmptyString(newFelony.ipp) &&
      isNotEmptyString(newFelony.prosecution) &&
      isNotEmptyString(newFelony.prosecutor) &&
      isNotEmptyString(newFelony.court) &&
      isNotEmptyString(newFelony.felonyLocation); /*&&
      newFelony.involved.length > 0;*/

    const addNewId = () => uuid();

    if (newFelonyIsValid(newFelony)) {
      console.log("newFelony", newFelony);

      setContextState((prevState) => ({
        ...prevState,
        felonies: [...prevState.felonies, { ...newFelony, id: addNewId() }],
      }));
      setCurrentFelony(felonyDefault);
      setShouldReset(true);
    }
  };

  const currentFelonyTitle =
    currentFelony.felony !== "" ? currentFelony.felony : "No disponible";

  const currentFelonyOnChange = (value) => {
    const selectedFelony = felonies.find((felony) => felony.id === value.id);
    if (selectedFelony) {
      setCurrentFelony(selectedFelony);
      setShouldReset(false);
      setFelonyWasSelected(true);
    } else {
      setCurrentFelony(felonyDefault);
      setFelonyWasSelected(false);
      setShouldReset(true);
    }
  };

  const getOnChangeHandler = React.useCallback(
    (name) => (value) => {
      setShouldReset(false);

      if (name === "prosecution") {
        setCurrentFelony((prevState) => ({
          ...prevState,
          prosecution: value.label,
          prosecutionOption: value,
          prosecutor: value.adjunct,
        }));
      } else if (name === "court") {
        console.log("court", value);
        setCurrentFelony((prevState) => ({
          ...prevState,
          court: value.label,
          courtOption: value,
          judge: value.adjunct,
        }));
      } else {
        setCurrentFelony((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    },
    []
  );

  const felonyOnChange = useDebounceHandler(getOnChangeHandler("felony"));

  const ippOnChange = useDebounceHandler(getOnChangeHandler("ipp"));

  const prosecutionOnChange = getOnChangeHandler("prosecution");

  const courtOnChange = getOnChangeHandler("court");

  const felonyLocationOnChange = useDebounceHandler(
    getOnChangeHandler("felonyLocation")
  );

  /*  const generateToursDocument = (tours) => {
    const createDataForToursTemplate = (tours) => {
      const templateData = [];

      const multiplicateObj = (tourObj, inArr) => {
        const getSheetsAmountFor24hs = (frequency) =>
          Math.ceil(24 / (3 * frequency));

        const sheetsAmount = getSheetsAmountFor24hs(
          parseInt(tourObj.frequency)
        );

        for (let i = 1; i <= sheetsAmount; i++) {
          inArr.push(tourObj);
        }
      };

      tours.forEach((tour) => {
        multiplicateObj(tour, templateData);
      });

      return templateData;
    };

    createToursTemplate(createDataForToursTemplate(tours), toursFileName);
  };*/

  /* const generateToursSendingNotesDocument = (tours) => {
    const createDataForToursSendingNotesTemplate = (tours) => {
      const templateData = [];

      const multiplicateObj = (tourObj, inArr) => {
        for (let i = 1; i <= 2; i++) {
          inArr.push(tourObj);
        }
      };

      const getToursSendingNotesObj = (tour) => ({
        prosecution: tour.prosecution,
        prosecutor: tour.prosecutor,
        victim: tour.victim,
        address: tour.address,
        felony: tour.felony,
        day: tour.day,
        month: tour.month,
        year: tour.year,
        instructor: currentInstructor.label,
        rank: currentInstructor.adjunct,
      });

      tours.forEach((tour) => {
        multiplicateObj(getToursSendingNotesObj(tour), templateData);
      });

      return templateData;
    };

    createToursTemplate(
      createDataForToursSendingNotesTemplate(tours),
      toursSendingNotesFileName
    );
  };*/

  /* const saveButtonHandler = () => {
    saveAppData({
      ...appDataAsString,
      tours: stringifyDataFromArray(toursLocalState, "tours"),
    });
    setContextState((prevState) => ({ ...prevState, tours: toursLocalState }));
  };*/

  return (
    <PageWrapper>
      <PageTitle>Hechos delictivos.</PageTitle>
      <ComboBox
        label='Hechos'
        options={feloniesOptions}
        onChange={currentFelonyOnChange}
        defaultValueForParentState={{
          label: "",
          adjunct: "",
          id: "",
        }}
      />
      <PageTitle>{currentFelonyTitle}</PageTitle>
      <CustomPaper>
        <PageTitle>
          {felonyWasSelected ? "Modificar hecho" : "Agregar hecho"}
        </PageTitle>
        <Input
          label='Carátula'
          onChange={felonyOnChange}
          shouldReset={shouldReset}
          placeholder='Suarez Pedro S/ Amenazas'
          updatedValue={currentFelony.felony}
        />
        <Input
          label='IPP Nro'
          onChange={ippOnChange}
          shouldReset={shouldReset}
          placeholder='4578-22'
          updatedValue={currentFelony.ipp}
        />
        <ComboBox
          label='Fiscalía'
          options={prosecutions}
          onChange={prosecutionOnChange}
          shouldReset={shouldReset}
          defaultValueForParentState={{
            label: "",
            adjunct: "",
            id: "",
          }}
          updatedValue={currentFelony.prosecutionOption}
        />
        <ComboBox
          label='Juzgado de garantías'
          options={courts}
          onChange={courtOnChange}
          shouldReset={shouldReset}
          defaultValueForParentState={{
            label: "",
            adjunct: "",
            id: "",
          }}
          updatedValue={currentFelony.courtOption}
        />
        <Input
          label='Lugar del hecho'
          onChange={felonyLocationOnChange}
          shouldReset={shouldReset}
          placeholder='Garay nro 1200, Pergamino'
          updatedValue={currentFelony.felonyLocation}
        />
        <Button
          onClick={
            felonyWasSelected
              ? () => console.log("Modificar hecho")
              : () => addFelony(currentFelony)
          }
        >
          {felonyWasSelected ? "Modificar" : "Agregar"}
        </Button>
      </CustomPaper>

      {/* <CustomPaper>
        <Grid container justifyContent={"space-between"}>
          <Button onClick={saveButtonHandler}>Guardar datos</Button>
          <Button onClick={() => generateToursDocument(toursLocalState)}>
            Generar recorridas
          </Button>
          <Button
            onClick={() => generateToursSendingNotesDocument(toursLocalState)}
          >
            Generar notas de elevacion
          </Button>
        </Grid>
        </CustomPaper>*/}
    </PageWrapper>
  );
};

export default Felonies;
