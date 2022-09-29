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

  const addNewId = () => uuid();

  const getFeloniesOptions = (felonies) =>
    felonies.map((obj) => ({ label: obj.felony, id: obj.id }));

  const feloniesOptions = getFeloniesOptions(felonies);

  const involvedTypes = [
    {
      label: "Víctima",
      id: addNewId(),
    },
    {
      label: "Testigo",
      id: addNewId(),
    },
    {
      label: "Imputado",
      id: addNewId(),
    },
  ];

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

  const [felonyFormReset, setFelonyFormReset] = React.useState(false);

  const [involvedFormReset, setInvolvedFormReset] = React.useState(false);

  const addNewItem = (prevState, property, newItem) => ({
    ...prevState,
    //property as string
    [property]: [...prevState[property], { ...newItem, id: addNewId() }],
  });

  const modifyItem = (prevState, property, modifiedItem) => {
    const matched = prevState[property].find(
      (currentItem) => currentItem.id === modifiedItem.id
    );

    const updatedMatch = {
      ...matched,
      ...modifiedItem,
    };

    const updatedState = prevState[property].map((currentItem) => {
      if (currentItem.id === modifiedItem.id) {
        return updatedMatch;
      } else return currentItem;
    });

    return {
      ...prevState,
      [property]: updatedState,
    };
  };

  const submitFelony = (felony, modified) => {
    const newFelonyIsValid = (felony) =>
      isNotEmptyString(felony.felony) &&
      isNotEmptyString(felony.ipp) &&
      isNotEmptyString(felony.prosecution) &&
      isNotEmptyString(felony.prosecutor) &&
      isNotEmptyString(felony.court) &&
      isNotEmptyString(felony.felonyLocation); /*&&
      newFelony.involved.length > 0;*/

    const addNewFelony = (prevState) =>
      addNewItem(prevState, "felonies", felony);

    const modifyFelony = (prevState) =>
      modifyItem(prevState, "felonies", felony);

    if (newFelonyIsValid(felony)) {
      if (modified) {
        setContextState(modifyFelony);
        setCurrentFelony(felony);
      } else {
        console.log("felony", felony);
        setContextState(addNewFelony);
        setCurrentFelony(felonyDefault);
        setFelonyFormReset(true);
        setInvolvedFormReset(true);
      }
    }
  };

  const currentFelonyTitle =
    currentFelony.felony !== "" ? currentFelony.felony : "No disponible";

  const currentFelonyOnChange = (value, felonies) => {
    const selectedFelony = felonies.find((felony) => felony.id === value.id);
    if (selectedFelony) {
      setCurrentFelony(selectedFelony);
      setFelonyFormReset(false);
      setFelonyWasSelected(true);
    } else {
      setCurrentFelony(felonyDefault);
      setFelonyWasSelected(false);
      setFelonyFormReset(true);
    }
  };

  const getFelonyOnChangeHandler = React.useCallback(
    (name) => (value) => {
      setFelonyFormReset(false);

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

  const getInvolvedOnChangeHandler = React.useCallback(
    (name) => (value) => {
      setInvolvedFormReset(false);

      setCurrentInvolved((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    },
    []
  );

  //Felony form onChange handlers
  const felonyOnChange = useDebounceHandler(getFelonyOnChangeHandler("felony"));

  const ippOnChange = useDebounceHandler(getFelonyOnChangeHandler("ipp"));

  const prosecutionOnChange = getFelonyOnChangeHandler("prosecution");

  const courtOnChange = getFelonyOnChangeHandler("court");

  const felonyLocationOnChange = useDebounceHandler(
    getFelonyOnChangeHandler("felonyLocation")
  );

  //Involved form onChange handlers
  const typeOnChange = useDebounceHandler(getInvolvedOnChangeHandler("type"));

  const fullnameOnChange = useDebounceHandler(
    getInvolvedOnChangeHandler("fullname")
  );

  const nationalityOnChange = useDebounceHandler(
    getInvolvedOnChangeHandler("nationality")
  );

  const educationOnChange = useDebounceHandler(
    getInvolvedOnChangeHandler("education")
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
        label="Hechos"
        options={feloniesOptions}
        onChange={(value) => currentFelonyOnChange(value, felonies)}
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
          label="Carátula"
          onChange={felonyOnChange}
          shouldReset={felonyFormReset}
          placeholder="Suarez Pedro S/ Amenazas"
          updatedValue={currentFelony.felony}
        />
        <Input
          label="IPP Nro"
          onChange={ippOnChange}
          shouldReset={felonyFormReset}
          placeholder="4578-22"
          updatedValue={currentFelony.ipp}
        />
        <ComboBox
          label="Fiscalía"
          options={prosecutions}
          onChange={prosecutionOnChange}
          shouldReset={felonyFormReset}
          defaultValueForParentState={{
            label: "",
            adjunct: "",
            id: "",
          }}
          updatedValue={currentFelony.prosecutionOption}
        />
        <ComboBox
          label="Juzgado de garantías"
          options={courts}
          onChange={courtOnChange}
          shouldReset={felonyFormReset}
          defaultValueForParentState={{
            label: "",
            adjunct: "",
            id: "",
          }}
          updatedValue={currentFelony.courtOption}
        />
        <Input
          label="Lugar del hecho"
          onChange={felonyLocationOnChange}
          shouldReset={felonyFormReset}
          placeholder="Garay nro 1200, Pergamino"
          updatedValue={currentFelony.felonyLocation}
        />

        <CustomPaper>
          <PageTitle>Agregar involucrado</PageTitle>
          <ComboBox
            label="Tipo"
            options={involvedTypes}
            onChange={typeOnChange}
            shouldReset={involvedFormReset}
            defaultValueForParentState={{
              label: "",
              adjunct: "",
              id: "",
            }}
            updatedValue={currentInvolved.type}
          />
          <Input
            label="Carátula"
            onChange={felonyOnChange}
            shouldReset={involvedFormReset}
            placeholder="Suarez Pedro S/ Amenazas"
            updatedValue={currentFelony.felony}
          />

          <Button
            onClick={() => submitFelony(currentFelony, felonyWasSelected)}
          >
            Agregar involucrado
          </Button>
        </CustomPaper>

        <Button onClick={() => submitFelony(currentFelony, felonyWasSelected)}>
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
