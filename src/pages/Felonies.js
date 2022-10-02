import React from "react";
import Context from "../Context";
import useDebounceHandler from "hooks/useDebounceHandler";
//import useSave from "hooks/useSave";
import {
  // getMonthString,
  getDateAsString,
  // dateIsValid,
  // getDateObjFrom,
  // isDateOutdated,
} from "helpers/date";
import { isNotEmptyString } from "helpers/data";
//import { createToursTemplate, stringifyDataFromArray } from "helpers/tools";
import { Button, Grid } from "@mui/material";
import PageWrapper from "components/PageWrapper";
import PageTitle from "components/PageTitle";
import Input from "components/Input";
import ComboBox from "components/ComboBox";
//import DateInput from "components/DateInput";
import CustomPaper from "components/CustomPaper";
import { v4 as uuid } from "uuid";

const Felonies = () => {
  const {
    currentDate,
    currentInstructor,
    felonies,
    prosecutions,
    courts,
    involvedTypesOptions,
    involvedGenderOptions,
    involvedEducationOptions,
    involvedCivilStatusOptions,
    involvedOccupationOptions,
    setContextState,
  } = React.useContext(Context);

  //const { saveAppData, appDataAsString } = useSave();

  const addNewId = React.useCallback(() => uuid(), []);

  const getOptions = (arr, property) =>
    arr.map((obj) => ({ label: obj[property], id: obj.id }));

  const felonyDefault = {
    felony: "",
    ipp: "",
    victims: "",
    suspects: "",
    prosecution: "",
    prosecutor: "",
    court: "",
    judge: "",
    involved: [],
    day: currentDate.day,
    month: currentDate.month,
    year: currentDate.year,
    summaryAbbreviatedDateStr: getDateAsString(currentDate.object),
    felonyLocation: "",
    id: "",
  };

  const involvedDefault = {
    type: "",
    gender: "",
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
  };

  const [felonyWasSelected, setFelonyWasSelected] = React.useState(false);

  const [involvedWasSelected, setInvolvedWasSelected] = React.useState(false);

  const [isMale, setIsMale] = React.useState(false);

  const [isWrongfulInjury, setIsWrongfulInjury] = React.useState(false);

  const [currentFelony, setCurrentFelony] = React.useState(felonyDefault);

  const [currentInvolved, setCurrentInvolved] = React.useState(involvedDefault);

  const [felonyFormReset, setFelonyFormReset] = React.useState(false);

  const [involvedFormReset, setInvolvedFormReset] = React.useState(false);

  console.log("currentFelony", currentFelony);
  // <--- Codigo que corre durante la fase de ejecución

  const feloniesOptions = getOptions(felonies, "felony");

  const involvedOptions = getOptions(currentFelony.involved, "fullName");

  const updateStringOnGender = React.useCallback(
    (gender, string) => (gender === "male" ? string + "o" : string + "a"),
    []
  );

  const updateString = React.useCallback(
    (string) => updateStringOnGender(isMale, string),
    [updateStringOnGender, isMale]
  );

  const updateIsMaleCondition = (adjuncted) => {
    if (adjuncted === "masculino") {
      setIsMale(true);
    } else setIsMale(false);
  };

  if (!currentInstructor) {
    console.log(
      "ATENCIÓN: NO HAY UN INSTRUCTOR EN TURNO SELECCIONADO - currentInstructor:",
      currentInstructor
    );
  }

  // --->

  const addNewItem = (prevState, property, newItem) => ({
    ...prevState,
    //property as string
    [property]: [...prevState[property], newItem],
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

  const setWrongfulInjuryCondition = (felony) =>
    felony === "Lesiones Culposas"
      ? setIsWrongfulInjury(true)
      : setIsWrongfulInjury(false);

  const submitFelony = (felony, modifying) => {
    const newFelonyIsValid = (felony) =>
      isNotEmptyString(felony.felony) &&
      isNotEmptyString(felony.prosecution) &&
      isNotEmptyString(felony.prosecutor) &&
      isNotEmptyString(felony.court) &&
      isNotEmptyString(felony.felonyLocation);

    const newFelony = {
      ...felony,
      id: addNewId(),
    };

    const addNewFelony = (prevState) =>
      addNewItem(prevState, "felonies", newFelony);

    const modifyFelony = (prevState) =>
      modifyItem(prevState, "felonies", felony);

    if (newFelonyIsValid(felony)) {
      setWrongfulInjuryCondition(felony.felony);
      if (modifying) {
        setContextState(modifyFelony);
      } else {
        setContextState(addNewFelony);
        setFelonyWasSelected(true);
        setCurrentFelony(newFelony);
      }
    }
  };

  const resetForNewFelonyAddition = () => {
    setCurrentFelony(felonyDefault);
    setCurrentInvolved(involvedDefault);
    setFelonyFormReset(true);
    setInvolvedFormReset(true);
    setFelonyWasSelected(false);
    setInvolvedWasSelected(false);
  };

  const submitInvolved = (involved, modifying) => {
    const newInvolvedIsValid = (involved) =>
      isNotEmptyString(involved.type) &&
      isNotEmptyString(involved.gender) &&
      isNotEmptyString(involved.fullName) &&
      isNotEmptyString(involved.education) &&
      isNotEmptyString(involved.dni) &&
      isNotEmptyString(involved.address) &&
      isNotEmptyString(involved.phone);

    const findCurrentFelony = (prevState, currentFelonyId) =>
      prevState.felonies.find((felony) => felony.id === currentFelonyId);

    const newInvolved = {
      ...involved,
      id: addNewId(),
    };

    const addNewInvolved = (prevState) =>
      addNewItem(prevState, "involved", newInvolved);

    const addNewInvolvedInContext = (prevState) =>
      modifyItem(
        prevState,
        "felonies",
        addNewInvolved(findCurrentFelony(prevState, currentFelony.id))
      );

    const modifyInvolved = (prevState) =>
      modifyItem(prevState, "involved", involved);

    const modifiedInvolvedInContext = (prevState) =>
      modifyItem(
        prevState,
        "felonies",
        modifyItem(
          findCurrentFelony(prevState, currentFelony.id),
          "involved",
          involved
        )
      );
    if (newInvolvedIsValid(involved)) {
      if (modifying) {
        setContextState(modifiedInvolvedInContext);
        setCurrentFelony(modifyInvolved);
      } else {
        setContextState(addNewInvolvedInContext);
        setCurrentFelony(addNewInvolved);
        setCurrentInvolved(newInvolved);
        setInvolvedWasSelected(true);
      }
    }
  };

  const resetForNewInvolvedAddition = () => {
    setCurrentInvolved(involvedDefault);
    setInvolvedFormReset(true);
    setInvolvedWasSelected(false);
  };

  const currentFelonyTitle =
    currentFelony.felony !== "" ? currentFelony.felony : "No disponible";

  const currentInvolvedTitle =
    currentInvolved.type !== "" && currentInvolved.fullName !== ""
      ? `${currentInvolved.fullName} - ${currentInvolved.type}`
      : "No disponible";

  const currentFelonyOnChange = (value, felonies) => {
    const selectedFelony = felonies.find((felony) => felony.id === value.id);
    if (selectedFelony) {
      setWrongfulInjuryCondition(selectedFelony.felony);
      setCurrentFelony(selectedFelony);
      setFelonyFormReset(false);
      setFelonyWasSelected(true);
    } else {
      setCurrentFelony(felonyDefault);
      setCurrentInvolved(involvedDefault);
      setFelonyFormReset(true);
      setInvolvedFormReset(true);
      setFelonyWasSelected(false);
      setInvolvedWasSelected(false);
    }
  };

  const currentInvolvedOnChange = (value, involved) => {
    const selectedInvolved = involved.find(
      (involved) => involved.id === value.id
    );
    if (selectedInvolved) {
      setCurrentInvolved(selectedInvolved);
      setInvolvedFormReset(false);
      setInvolvedWasSelected(true);
    } else {
      setCurrentInvolved(involvedDefault);
      setInvolvedFormReset(true);
      setInvolvedWasSelected(false);
    }
  };

  const getFelonyOnChangeHandler = React.useCallback(
    (name) => (value) => {
      setFelonyFormReset(false);

      if (name === "prosecution") {
        setCurrentFelony((prevState) => ({
          ...prevState,
          prosecution: value.label,
          prosecutor: value.adjunct,
        }));
      } else if (name === "court") {
        setCurrentFelony((prevState) => ({
          ...prevState,
          court: value.label,
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

      const updateState = (name, value) => (prevState) => ({
        ...prevState,
        [name]: value,
      });

      if (
        name === "type" ||
        name === "education" ||
        name === "civilStatus" ||
        name === "occupation"
      ) {
        setCurrentInvolved(updateState(name, value.adjunct));
      } else if (name === "gender") {
        setCurrentInvolved(updateState(name, value.adjunct));
        updateIsMaleCondition(value.adjunct);
      } else setCurrentInvolved(updateState(name, value));
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

  const genderOnChange = getInvolvedOnChangeHandler("gender");

  const fullnameOnChange = useDebounceHandler(
    getInvolvedOnChangeHandler("fullName")
  );

  const nationalityOnChange = useDebounceHandler(
    getInvolvedOnChangeHandler("nationality")
  );

  const educationOnChange = getInvolvedOnChangeHandler("education");

  const civilStatusOnChange = getInvolvedOnChangeHandler("civilStatus");

  const occupationOnChange = getInvolvedOnChangeHandler("occupation");

  const ageOnChange = useDebounceHandler(getInvolvedOnChangeHandler("age"));

  const birthDateOnChange = useDebounceHandler(
    getInvolvedOnChangeHandler("birthDate")
  );

  const dniOnChange = useDebounceHandler(getInvolvedOnChangeHandler("dni"));

  const addressOnChange = useDebounceHandler(
    getInvolvedOnChangeHandler("address")
  );

  const phoneOnChange = useDebounceHandler(getInvolvedOnChangeHandler("phone"));

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

  const findLabelInOptions = (label, options) =>
    options.find((item) => item.label === label);

  const findAdjunctInOptions = (adjunct, options) =>
    options.find((item) => item.adjunct === adjunct);

  return (
    <PageWrapper>
      <PageTitle>Hechos delictivos.</PageTitle>
      <ComboBox
        label='Hechos'
        options={feloniesOptions}
        shouldReset={felonyFormReset}
        onChange={(value) => currentFelonyOnChange(value, felonies)}
        defaultValueForParentState={{
          label: "",
          adjunct: "",
          id: "",
        }}
      />
      <CustomPaper>
        <PageTitle>{currentFelonyTitle}</PageTitle>
        <Input
          label='Carátula'
          onChange={felonyOnChange}
          shouldReset={felonyFormReset}
          placeholder='Suarez Pedro S/ Amenazas'
          updatedValue={currentFelony.felony}
        />
        <Input
          label='IPP Nro'
          onChange={ippOnChange}
          shouldReset={felonyFormReset}
          placeholder='4578-22'
          updatedValue={currentFelony.ipp}
        />
        <ComboBox
          label='Fiscalía'
          options={prosecutions}
          onChange={prosecutionOnChange}
          shouldReset={felonyFormReset}
          defaultValueForParentState={{
            label: "",
            adjunct: "",
            id: "",
          }}
          updatedValue={findLabelInOptions(
            currentFelony.prosecution,
            prosecutions
          )}
        />
        <ComboBox
          label='Juzgado de garantías'
          options={courts}
          onChange={courtOnChange}
          shouldReset={felonyFormReset}
          defaultValueForParentState={{
            label: "",
            adjunct: "",
            id: "",
          }}
          updatedValue={findLabelInOptions(currentFelony.court, courts)}
        />
        <Input
          label='Lugar del hecho'
          onChange={felonyLocationOnChange}
          shouldReset={felonyFormReset}
          placeholder='Garay nro 1200, Pergamino'
          updatedValue={currentFelony.felonyLocation}
        />
      </CustomPaper>
      <PageTitle display={felonyWasSelected}>Involucrados.</PageTitle>
      <ComboBox
        label='Involucrados'
        options={involvedOptions}
        onChange={(value) =>
          currentInvolvedOnChange(value, currentFelony.involved)
        }
        shouldReset={involvedFormReset}
        defaultValueForParentState={{
          label: "",
          adjunct: "",
          id: "",
        }}
        sx={{
          display: felonyWasSelected ? "initial" : "none",
        }}
      />
      <CustomPaper display={felonyWasSelected}>
        <PageTitle>{currentInvolvedTitle}</PageTitle>
        <ComboBox
          label='Tipo'
          options={involvedTypesOptions}
          onChange={typeOnChange}
          shouldReset={involvedFormReset}
          defaultValueForParentState={{
            label: "",
            adjunct: "",
            id: "",
          }}
          updatedValue={findAdjunctInOptions(
            currentInvolved.type,
            involvedTypesOptions
          )}
        />
        <ComboBox
          label='Género'
          options={involvedGenderOptions}
          onChange={genderOnChange}
          shouldReset={involvedFormReset}
          defaultValueForParentState={{
            label: "",
            adjunct: "",
            id: "",
          }}
          updatedValue={findAdjunctInOptions(
            currentInvolved.gender,
            involvedGenderOptions
          )}
        />
        <Input
          label='Apellido y Nombre'
          onChange={fullnameOnChange}
          shouldReset={involvedFormReset}
          placeholder='Suarez Pedro'
          updatedValue={currentInvolved.fullName}
        />
        <Input
          label='Nacionalidad'
          onChange={nationalityOnChange}
          shouldReset={involvedFormReset}
          placeholder='argentina'
          updatedValue={currentInvolved.nationality}
        />
        <ComboBox
          label='Instrucción'
          options={involvedEducationOptions}
          onChange={educationOnChange}
          shouldReset={involvedFormReset}
          defaultValueForParentState={{
            label: "",
            adjunct: "",
            id: "",
          }}
          updatedValue={findAdjunctInOptions(
            currentInvolved.education,
            involvedEducationOptions
          )}
        />
        <ComboBox
          label='Estado civil'
          options={involvedCivilStatusOptions}
          onChange={civilStatusOnChange}
          shouldReset={involvedFormReset}
          defaultValueForParentState={{
            label: "",
            adjunct: "",
            id: "",
          }}
          updatedValue={findAdjunctInOptions(
            currentInvolved.civilStatus,
            involvedCivilStatusOptions
          )}
        />
        <ComboBox
          label='Ocupación'
          options={involvedOccupationOptions}
          onChange={occupationOnChange}
          shouldReset={involvedFormReset}
          defaultValueForParentState={{
            label: "",
            adjunct: "",
            id: "",
          }}
          updatedValue={findAdjunctInOptions(
            currentInvolved.occupation,
            involvedOccupationOptions
          )}
        />
        <Input
          label='Edad'
          onChange={ageOnChange}
          shouldReset={involvedFormReset}
          placeholder='18'
          updatedValue={currentInvolved.age}
        />
        <Input
          label='Fecha de nacimiento'
          onChange={birthDateOnChange}
          shouldReset={involvedFormReset}
          placeholder='18/02/1991'
          updatedValue={currentInvolved.birthDate}
        />
        <Input
          label='DNI'
          onChange={dniOnChange}
          shouldReset={involvedFormReset}
          placeholder='36857452'
          updatedValue={currentInvolved.dni}
        />
        <Input
          label='Domicilio'
          onChange={addressOnChange}
          shouldReset={involvedFormReset}
          placeholder='Estrada nro. 850 de Pergamino'
          updatedValue={currentInvolved.address}
        />
        <Input
          label='Teléfono'
          onChange={phoneOnChange}
          shouldReset={involvedFormReset}
          placeholder='2477-578968'
          updatedValue={currentInvolved.phone}
        />

        {/*isWrongfulInjury */}
      </CustomPaper>
      <CustomPaper>
        <Grid container justifyContent='space-between'>
          <Button
            onClick={() => submitFelony(currentFelony, felonyWasSelected)}
            sx={{ mr: "25px" }}
          >
            {felonyWasSelected ? "Modificar hecho" : "Agregar hecho"}
          </Button>
          <Button
            onClick={() => submitInvolved(currentInvolved, involvedWasSelected)}
            sx={{
              display: felonyWasSelected ? "initial" : "none",
            }}
          >
            {involvedWasSelected
              ? "Modificar involucrado"
              : "Agregar involucrado"}
          </Button>
        </Grid>
      </CustomPaper>
      <CustomPaper display={felonyWasSelected}>
        <Grid container justifyContent='space-between'>
          <Button onClick={resetForNewFelonyAddition} sx={{ mr: "25px" }}>
            Agregar otro hecho
          </Button>
          <Button
            onClick={resetForNewInvolvedAddition}
            sx={{
              display: involvedWasSelected ? "initial" : "none",
            }}
          >
            Agregar otro involucrado
          </Button>
        </Grid>
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
