import React from "react";
import Context from "../Context";
import useDebounceHandler from "hooks/useDebounceHandler";
import useSave from "hooks/useSave";
import {
  // getMonthString,
  getDateAsString,
  // dateIsValid,
  // getDateObjFrom,
  // isDateOutdated,
} from "helpers/date";
import { isNotEmptyString } from "helpers/data";
import { createTemplates, stringifyDataFromArray } from "helpers/tools";
import { Button, Grid, Box } from "@mui/material";
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
    secretary,
    felonies,
    prosecutions,
    courts,
    involvedTypesOptions,
    involvedGenderOptions,
    involvedBinaryOptions,
    involvedCivilStatusOptions,
    involvedOccupationOptions,
    involvedVehicleTypeOptions,
    setContextState,
  } = React.useContext(Context);

  const { saveAppData, appDataAsString } = useSave();

  const addNewId = React.useCallback(() => uuid(), []);

  const getOptions = (arr, property) =>
    arr.map((obj) => ({ label: obj[property], id: obj.id }));

  const getCurrentInstructor = (property) =>
    currentInstructor ? currentInstructor[property] : "";

  const felonyDefault = {
    felony: "",
    ipp: "",
    prosecution: "",
    prosecutor: "",
    instructor: getCurrentInstructor("label"),
    instructorRank: getCurrentInstructor("adjunct"),
    court: "",
    judge: "",
    day: currentDate.day,
    month: currentDate.month,
    year: currentDate.year,
    summaryAbbreviatedDateStr: getDateAsString(currentDate.object),
    id: "",
    involved: [],
  };

  const involvedDefault = {
    type: "",
    isSuspectUnknown: "",
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
    driver: "",
    vehicleType: "",
    brand: "",
    model: "",
    colour: "",
    licensePlate: "",
    engineNo: "",
    chassisNo: "",
    arrestedFile: "",
    fatherName: "",
    motherName: "",
    felonyAddress: "",
    felonyDate: "",
    nickname: "",
    id: "",
  };

  const [felonyWasSelected, setFelonyWasSelected] = React.useState(false);

  const [involvedWasSelected, setInvolvedWasSelected] = React.useState(false);

  //const [isMale, setIsMale] = React.useState(false);

  //const [isWrongfulInjury, setIsWrongfulInjury] = React.useState(false);

  const [isInvolvedDriver, setIsInvolvedDriver] = React.useState(false);

  const [isSuspect, setIsSuspect] = React.useState(false);

  const [isSuspectUnknown, setIsSuspectUnknown] = React.useState(false);

  const [arrestedFile, setArrestedFile] = React.useState(false);

  const [currentFelony, setCurrentFelony] = React.useState(felonyDefault);

  const [currentInvolved, setCurrentInvolved] = React.useState(involvedDefault);

  const [felonyFormReset, setFelonyFormReset] = React.useState(false);

  const [involvedFormReset, setInvolvedFormReset] = React.useState(false);

  console.log("currentFelony", currentFelony);
  // <--- Codigo que corre durante la fase de ejecución

  const feloniesOptions = getOptions(felonies, "felony");

  console.log("FELONIES", felonies);

  const involvedOptions = getOptions(currentFelony.involved, "fullName");

  /*const updateStringOnGender = React.useCallback(
    (gender, string) => (gender === "male" ? string + "o" : string + "a"),
    []
  );*/

  /*const updateString = React.useCallback(
    (string) => updateStringOnGender(isMale, string),
    [updateStringOnGender, isMale]
  );*/

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

  /*  const updateIsMaleCondition = (gender) => {
    if (gender === "masculino") {
      setIsMale(true);
    } else setIsMale(false);
  };*/

  /* const updateWrongfulInjuryCondition = (felony) =>
    felony === "Lesiones Culposas"
      ? setIsWrongfulInjury(true)
      : setIsWrongfulInjury(false);*/

  const updateIsDriverCondition = (driver) =>
    driver === "sí" ? setIsInvolvedDriver(true) : setIsInvolvedDriver(false);

  const updateIsSuspect = (involvedType) =>
    involvedType === "imputado|a" ? setIsSuspect(true) : setIsSuspect(false);

  const updateIsSuspectUnknown = (suspectUnknown) =>
    suspectUnknown === "sí"
      ? setIsSuspectUnknown(true)
      : setIsSuspectUnknown(false);

  const updateArrestedFile = (arrestedFile) =>
    arrestedFile === "sí" ? setArrestedFile(true) : setArrestedFile(false);

  const submitFelony = (felony, modifying) => {
    const newFelonyIsValid = (felony) =>
      isNotEmptyString(felony.felony) &&
      isNotEmptyString(felony.prosecution) &&
      isNotEmptyString(felony.prosecutor) &&
      isNotEmptyString(felony.court);

    const newFelony = {
      ...felony,
      id: addNewId(),
    };

    const addNewFelony = (prevState) =>
      addNewItem(prevState, "felonies", newFelony);

    const modifyFelony = (prevState) =>
      modifyItem(prevState, "felonies", felony);

    if (newFelonyIsValid(felony)) {
      //  updateWrongfulInjuryCondition(felony.felony);
      if (modifying) {
        setContextState(modifyFelony);
      } else {
        setContextState(addNewFelony);
        setFelonyWasSelected(true);
        setCurrentFelony(newFelony);
      }
    }
  };

  const resetForNewInvolvedAddition = () => {
    setCurrentInvolved(involvedDefault);
    setInvolvedFormReset(true);
    setInvolvedWasSelected(false);
    setIsInvolvedDriver(false);
    setIsSuspectUnknown(false);
    setIsSuspect(false);
    // setIsMale(false);
  };

  const resetForNewFelonyAddition = () => {
    setCurrentFelony(felonyDefault);
    // setIsWrongfulInjury(false);
    setFelonyFormReset(true);
    setFelonyWasSelected(false);
    resetForNewInvolvedAddition();
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

    const addNewInvolved = (prevState, involved) =>
      addNewItem(prevState, "involved", involved);

    const addNewInvolvedInContext = (prevState, involved) =>
      modifyItem(
        prevState,
        "felonies",
        addNewInvolved(findCurrentFelony(prevState, currentFelony.id), involved)
      );

    const modifyInvolved = (prevState, involved) =>
      modifyItem(prevState, "involved", involved);

    const modifiedInvolvedInContext = (prevState, involved) =>
      modifyItem(
        prevState,
        "felonies",
        modifyItem(
          findCurrentFelony(prevState, currentFelony.id),
          "involved",
          involved
        )
      );
    if (newInvolvedIsValid(involved) || isSuspectUnknown) {
      const suspectUnknown = { ...involved, fullName: "Imputado NN o varios" };

      const involvedObj = !isSuspectUnknown ? involved : suspectUnknown;
      const newInvolvedObj = !isSuspectUnknown
        ? newInvolved
        : { ...newInvolved, fullName: "Imputado NN o varios" };

      if (modifying) {
        setContextState((prevState) =>
          modifiedInvolvedInContext(prevState, involvedObj)
        );
        setCurrentFelony((prevState) => modifyInvolved(prevState, involvedObj));
      } else {
        setContextState((prevState) =>
          addNewInvolvedInContext(prevState, newInvolvedObj)
        );
        setCurrentFelony((prevState) =>
          addNewInvolved(prevState, newInvolvedObj)
        );
        setCurrentInvolved(newInvolvedObj);
        setInvolvedWasSelected(true);
      }
    }
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
      // updateWrongfulInjuryCondition(selectedFelony.felony);
      setCurrentFelony(selectedFelony);
      setFelonyFormReset(false);
      setFelonyWasSelected(true);
    } else {
      resetForNewFelonyAddition();
    }
  };

  const currentInvolvedOnChange = (value, involved) => {
    const selectedInvolved = involved.find(
      (involved) => involved.id === value.id
    );
    if (selectedInvolved) {
      // updateIsMaleCondition(selectedInvolved.gender);
      updateIsDriverCondition(selectedInvolved.driver);
      updateIsSuspect(selectedInvolved.type);
      updateArrestedFile(selectedInvolved.arrestedFile);
      updateIsSuspectUnknown(selectedInvolved.isSuspectUnknown);
      setCurrentInvolved(selectedInvolved);
      setInvolvedFormReset(false);
      setInvolvedWasSelected(true);
    } else {
      resetForNewInvolvedAddition();
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
        name === "education" ||
        name === "civilStatus" ||
        name === "occupation" ||
        name === "vehicleType"
      ) {
        setCurrentInvolved(updateState(name, value.adjunct));
      } else if (name === "type") {
        setCurrentInvolved(updateState(name, value.adjunct));
        updateIsSuspect(value.adjunct);
      } else if (name === "isSuspectUnknown") {
        setCurrentInvolved(updateState(name, value.adjunct));
        updateIsSuspectUnknown(value.adjunct);
      } else if (name === "gender") {
        setCurrentInvolved(updateState(name, value.adjunct));
        //   updateIsMaleCondition(value.adjunct);
      } else if (name === "driver") {
        setCurrentInvolved(updateState(name, value.adjunct));
        updateIsDriverCondition(value.adjunct);
      } else if (name === "arrestedFile") {
        setCurrentInvolved(updateState(name, value.adjunct));
        updateArrestedFile(value.adjunct);
      } else setCurrentInvolved(updateState(name, value));
    },
    []
  );

  //Felony form onChange handlers
  const felonyOnChange = useDebounceHandler(getFelonyOnChangeHandler("felony"));

  const ippOnChange = useDebounceHandler(getFelonyOnChangeHandler("ipp"));

  const prosecutionOnChange = getFelonyOnChangeHandler("prosecution");

  const courtOnChange = getFelonyOnChangeHandler("court");

  //Involved form onChange handlers
  const typeOnChange = getInvolvedOnChangeHandler("type");

  const isSuspectUnknownOnChange =
    getInvolvedOnChangeHandler("isSuspectUnknown");

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

  const driverOnChange = getInvolvedOnChangeHandler("driver");

  const vehicleTypeOnChange = getInvolvedOnChangeHandler("vehicleType");

  const brandOnChange = useDebounceHandler(getInvolvedOnChangeHandler("brand"));

  const modelOnChange = useDebounceHandler(getInvolvedOnChangeHandler("model"));

  const colourOnChange = useDebounceHandler(
    getInvolvedOnChangeHandler("colour")
  );

  const licensePlateOnChange = useDebounceHandler(
    getInvolvedOnChangeHandler("licensePlate")
  );

  const engineNoOnChange = useDebounceHandler(
    getInvolvedOnChangeHandler("engineNo")
  );

  const chassisNoOnChange = useDebounceHandler(
    getInvolvedOnChangeHandler("chassisNo")
  );

  const arrestedFileOnChange = getInvolvedOnChangeHandler("arrestedFile");

  const fatherNameOnChange = useDebounceHandler(
    getInvolvedOnChangeHandler("fatherName")
  );

  const motherNameOnChange = useDebounceHandler(
    getInvolvedOnChangeHandler("motherName")
  );

  const felonyAddressOnChange = useDebounceHandler(
    getInvolvedOnChangeHandler("felonyAddress")
  );

  const felonyDateOnChange = useDebounceHandler(
    getInvolvedOnChangeHandler("felonyDate")
  );

  const nicknameOnChange = useDebounceHandler(
    getInvolvedOnChangeHandler("nickname")
  );

  const getCurrentInvolvedDataStr = (involved) => {
    const getEducation = (education) =>
      education === "sí" ? "instruido" : "no instruido";

    let currentInvolvedDataStr = `${involved.fullName.toUpperCase()}, ${
      involved.age
    }, ${involved.birthDate}, DNI Nro. ${involved.dni}, ${
      involved.nationality
    }, ${getEducation(involved.education)}, ${involved.civilStatus}, ${
      involved.occupation
    }, ddo. ${involved.address}, Te nro. ${involved.phone}; `;

    return currentInvolvedDataStr;
  };

  const getVictimsStr = (involved) => {
    let victimsFullNameStr = "";
    let victimsDataStr = "";
    if (involved.length !== 0) {
      involved.forEach((obj) => {
        if (obj.type === "víctima") {
          const currentVictimFullName = obj.fullName + " - ";

          victimsFullNameStr = victimsFullNameStr + currentVictimFullName;
          victimsDataStr = victimsDataStr + getCurrentInvolvedDataStr(obj);
        }
      });
    }
    return {
      victimsFullNameStr,
      victimsDataStr,
    };
  };

  const getSuspectsStr = (involved) => {
    let suspectsFullNamesStr = "";
    let suspectsDataStr = "";
    if (involved.length !== 0) {
      involved.forEach((obj) => {
        if (obj.type === "imputado|a") {
          if (obj.isSuspectUnknown === "no") {
            const currentSuspectFullName = obj.fullName + " - ";

            suspectsFullNamesStr =
              suspectsFullNamesStr + currentSuspectFullName;

            suspectsDataStr = suspectsDataStr + getCurrentInvolvedDataStr(obj);
          } else {
            suspectsFullNamesStr = "NN o varios";
            suspectsDataStr = "NN o Varios";
          }
        }
      });
    }
    return {
      suspectsFullNamesStr,
      suspectsDataStr,
    };
  };

  const getTypeDataStr = (involved, type) => {
    let involvedFullNameStr = "";
    let involvedDataStr = "";
    if (involved.length !== 0) {
      const match = involved.find((obj) => obj.type === type);
      involvedFullNameStr = match ? match.fullName : "";
      involvedDataStr = match ? getCurrentInvolvedDataStr(match) : "";
    }
    return {
      involvedFullNameStr,
      involvedDataStr,
    };
  };

  const getChassisLabel = (vehicleType) =>
    vehicleType === "moto" ? "cuadro" : "chasis";

  const generateBaseDocs = (felony) => {
    const fileName = `${felony.felony} - ${felony.summaryAbbreviatedDateStr}.docx`;
    console.log("fileName pasado a createTemplate", fileName);
    const getVehiclesDataStr = (involved /*, isWrongfulInjury*/) => {
      let vehiclesDataStr = "";

      const getCurrentVehicleDataStr = (involved) => {
        const chassisLabel = getChassisLabel(involved.vehicleType);

        let currentVehicleDataStr = `${involved.vehicleType.toUpperCase()}, marca ${
          involved.brand
        }, modelo ${involved.model}, color ${involved.colour}, dominio ${
          involved.licensePlate
        }, ${chassisLabel} nro. ${involved.chassisNo}, motor nro. ${
          involved.engineNo
        }; `;

        return currentVehicleDataStr;
      };

      if (involved.length !== 0 /*&& isWrongfulInjury*/) {
        involved.forEach((obj) => {
          if (obj.driver === "sí") {
            vehiclesDataStr = vehiclesDataStr + getCurrentVehicleDataStr(obj);
          }
        });
      }
      return vehiclesDataStr;
    };

    const data = {
      cover: felony.felony,
      ipp: felony.ipp,
      victims: getVictimsStr(felony.involved).victimsFullNameStr,
      victimsDataStr: getVictimsStr(felony.involved).victimsDataStr,
      founder: getTypeDataStr(felony.involved, "causante").involvedFullNameStr,
      founderDataStr: getTypeDataStr(felony.involved, "causante")
        .involvedDataStr,
      informer: getTypeDataStr(felony.involved, "denunciante")
        .involvedFullNameStr,
      informerDataStr: getTypeDataStr(felony.involved, "denunciante")
        .involvedDataStr,
      suspects: getSuspectsStr(felony.involved).suspectsFullNamesStr,
      suspectsDataStr: getSuspectsStr(felony.involved).suspectsDataStr,
      instructor: felony.instructor,
      instructorRank: felony.instructorRank,
      court: felony.court,
      secretary,
      prosecution: felony.prosecution,
      prosecutor: felony.prosecutor,
      day: felony.day,
      month: felony.month,
      year: felony.year,
      vehiclesDataStr: getVehiclesDataStr(
        felony.involved /*, isWrongfulInjury*/
      ),
    };

    createTemplates(data, fileName);
  };

  const generateInvolvedTemplate = (felony, involved) => {
    const fileName = `${felony.felony} - ${felony.summaryAbbreviatedDateStr}.docx`;

    const data = {
      cover: felony.felony,
      ipp: felony.ipp,
      court: felony.court,
      secretary,
      prosecution: felony.prosecution,
      prosecutor: felony.prosecutor,
      instructor: felony.instructor,
      instructorRank: felony.instructorRank,
      day: felony.day,
      month: felony.month,
      year: felony.year,
      dateAsStr: felony.summaryAbbreviatedDateStr,
      victims: getVictimsStr(felony.involved).victimsFullNameStr,
      victimsDataStr: getVictimsStr(felony.involved).victimsDataStr,
      founder: getTypeDataStr(felony.involved, "causante").involvedFullNameStr,
      informer: getTypeDataStr(felony.involved, "denunciante")
        .involvedFullNameStr,
      informerDataStr: getTypeDataStr(felony.involved, "denunciante")
        .involvedDataStr,
      suspects: getSuspectsStr(felony.involved).suspectsFullNamesStr,
      suspectsDataStr: getSuspectsStr(felony.involved).suspectsDataStr,
      fullName: involved.fullName,
      gender: involved.gender,
      nationality: involved.nationality,
      education: involved.education,
      civilStatus: involved.civilStatus,
      occupation: involved.occupation,
      age: involved.age,
      address: involved.address,
      dni: involved.dni,
      birthDate: involved.birthDate,
      phone: involved.phone,
      vehicleType: involved.vehicleType,
      chassisLabel: getChassisLabel(involved.vehicleType),
      brand: involved.brand,
      model: involved.model,
      colour: involved.colour,
      licensePlate: involved.licensePlate,
      engineNo: involved.engineNo,
      chassisNo: involved.chassisNo,
      nickname: involved.nickname,
      fatherName: involved.fatherName,
      motherName: involved.motherName,
      felonyAddress: involved.felonyAddress,
      felonyDate: involved.felonyDate,
    };
    createTemplates(data, fileName);
  };

  const saveButtonHandler = () =>
    saveAppData({
      ...appDataAsString,
      felonies: stringifyDataFromArray(felonies, "felonies"),
    });

  const findLabelInOptions = (label, options) =>
    options.find((item) => item.label === label);

  const findAdjunctInOptions = (adjunct, options) =>
    options.find((item) => item.adjunct === adjunct);

  const developmentDeleteFelonies = () => {
    setContextState((prevState) => ({
      ...prevState,
      felonies: [],
    }));
    setCurrentFelony(felonyDefault);
  };

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
        <PageTitle>
          {!isSuspectUnknown ? currentInvolvedTitle : "NN o varios"}
        </PageTitle>
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
          label='Imputado NN o varios'
          options={involvedBinaryOptions}
          onChange={isSuspectUnknownOnChange}
          shouldReset={involvedFormReset}
          defaultValueForParentState={{
            label: "",
            adjunct: "",
            id: "",
          }}
          updatedValue={findAdjunctInOptions(
            currentInvolved.isSuspectUnknown,
            involvedBinaryOptions
          )}
          sx={{ display: isSuspect ? "initial" : "none" }}
        />
        <Box sx={{ display: isSuspectUnknown ? "none" : "initial" }}>
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
            options={involvedBinaryOptions}
            onChange={educationOnChange}
            shouldReset={involvedFormReset}
            defaultValueForParentState={{
              label: "",
              adjunct: "",
              id: "",
            }}
            updatedValue={findAdjunctInOptions(
              currentInvolved.education,
              involvedBinaryOptions
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
          <ComboBox
            label='¿Desea asociar un vehículo al involucrado?'
            options={involvedBinaryOptions}
            onChange={driverOnChange}
            shouldReset={involvedFormReset}
            defaultValueForParentState={{
              label: "",
              adjunct: "",
              id: "",
            }}
            updatedValue={findAdjunctInOptions(
              currentInvolved.driver,
              involvedBinaryOptions
            )}
            /* sx={{
              display: isWrongfulInjury ? "initial" : "none",
            }}*/
          />
          <Box
            sx={{
              display: isInvolvedDriver ? "initial" : "none",
            }}
          >
            <ComboBox
              label='Tipo de vehículo'
              options={involvedVehicleTypeOptions}
              onChange={vehicleTypeOnChange}
              shouldReset={involvedFormReset}
              defaultValueForParentState={{
                label: "",
                adjunct: "",
                id: "",
              }}
              updatedValue={findAdjunctInOptions(
                currentInvolved.vehicleType,
                involvedVehicleTypeOptions
              )}
            />
            <Input
              label='Marca'
              onChange={brandOnChange}
              shouldReset={involvedFormReset}
              placeholder='Renault'
              updatedValue={currentInvolved.brand}
            />
            <Input
              label='Modelo'
              onChange={modelOnChange}
              shouldReset={involvedFormReset}
              placeholder='Clio'
              updatedValue={currentInvolved.model}
            />
            <Input
              label='Color'
              onChange={colourOnChange}
              shouldReset={involvedFormReset}
              placeholder='Rojo'
              updatedValue={currentInvolved.colour}
            />
            <Input
              label='Dominio'
              onChange={licensePlateOnChange}
              shouldReset={involvedFormReset}
              placeholder='ADF-321'
              updatedValue={currentInvolved.licensePlate}
            />
            <Input
              label='Motor Nro.'
              onChange={engineNoOnChange}
              shouldReset={involvedFormReset}
              placeholder='FSDF45FSDF56S'
              updatedValue={currentInvolved.engineNo}
            />
            <Input
              label='Chasis/cuadro Nro.'
              onChange={chassisNoOnChange}
              shouldReset={involvedFormReset}
              placeholder='FSDF45FSDF56S'
              updatedValue={currentInvolved.chassisNo}
            />
          </Box>
          <ComboBox
            label='¿Legajo necesario?'
            options={involvedBinaryOptions}
            onChange={arrestedFileOnChange}
            shouldReset={involvedFormReset}
            defaultValueForParentState={{
              label: "",
              adjunct: "",
              id: "",
            }}
            updatedValue={findAdjunctInOptions(
              currentInvolved.arrestedFile,
              involvedBinaryOptions
            )}
            sx={{
              display: isSuspect ? "initial" : "none",
            }}
          />
          <Box
            sx={{
              display: arrestedFile ? "initial" : "none",
            }}
          >
            <Input
              label='Apodo del imputado'
              onChange={nicknameOnChange}
              shouldReset={involvedFormReset}
              placeholder='Toco roberto'
              updatedValue={currentInvolved.nickname}
            />
            <Input
              label='Apellido y nombre: Padre'
              onChange={fatherNameOnChange}
              shouldReset={involvedFormReset}
              placeholder='Padre/ progenitor'
              updatedValue={currentInvolved.fatherName}
            />

            <Input
              label='Apellido y nombre: Madre'
              onChange={motherNameOnChange}
              shouldReset={involvedFormReset}
              placeholder='Madre/ progenitora'
              updatedValue={currentInvolved.motherName}
            />
            <Input
              label='Lugar del hecho o de aprehensión'
              onChange={felonyAddressOnChange}
              shouldReset={involvedFormReset}
              placeholder='Av. Juan B. Justo y Bv. Liniers'
              updatedValue={currentInvolved.felonyAddress}
            />
            <Input
              label='Fecha del hecho'
              onChange={felonyDateOnChange}
              shouldReset={involvedFormReset}
              placeholder='10/09/2022'
              updatedValue={currentInvolved.felonyDate}
            />
          </Box>
        </Box>
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
      <CustomPaper display={felonyWasSelected}>
        <Grid container justifyContent='space-between'>
          <Button
            onClick={() => generateBaseDocs(currentFelony)}
            sx={{ mr: "25px" }}
          >
            Generar documentos base
          </Button>
          <Button
            onClick={() =>
              generateInvolvedTemplate(currentFelony, currentInvolved)
            }
            sx={{
              display: involvedWasSelected ? "initial" : "none",
            }}
          >
            Generar WORD - involucrado
          </Button>
        </Grid>
      </CustomPaper>
      <CustomPaper display={felonyWasSelected /*true developmentMode*/}>
        <Grid container justifyContent='space-between'>
          <Button onClick={saveButtonHandler} sx={{ mr: "25px" }}>
            Guardar datos
          </Button>
        </Grid>
      </CustomPaper>

      <CustomPaper display={true /*DEVELOPMENT MODE*/}>
        <Grid container justifyContent='space-between'>
          <Button onClick={developmentDeleteFelonies} sx={{ mr: "25px" }}>
            Borrar datos: felony, felonies
          </Button>
        </Grid>
      </CustomPaper>
    </PageWrapper>
  );
};

export default Felonies;
