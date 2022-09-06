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
import EnhancedTable from "components/EnhancedTable";
import { MenuItem } from "@mui/material";
import RowMenu from "components/RowMenu";
import useMenu from "hooks/useMenu";
import { v4 as uuid } from "uuid";

const Tours = () => {
  const {
    currentDate,
    currentInstructor,
    toursCommonData,
    tours,
    prosecutions,
    setContextState,
  } = React.useContext(Context);

  const { saveAppData, appDataAsString } = useSave();

  const [formValues, setFormValues] = React.useState({
    frequency: "",
    day: currentDate.day,
    month: currentDate.month,
    year: currentDate.year,
    policeStation: "Seccional Comando Patrulla Pergamino",
    prosecution: "",
    prosecutor: "",
    felony: "",
    victim: "",
    address: "",
    phone: "",
    endingDate: "",
  });

  const toursTemplateFileName = `Recorridas --- ${getDateAsString(
    currentDate.object
  )}`;

  const getToursInForce = (oldData) =>
    oldData.filter((obj) => {
      const isDefaultValue = obj.endingDate === "";

      if (!isDefaultValue) {
        return !isDateOutdated(
          getDateObjFrom(obj.endingDate),
          currentDate.object
        );
      } else return true;
    });

  const [toursLocalState, setToursLocalState] = React.useState(
    getToursInForce(tours)
  );

  const [shouldReset, setShouldReset] = React.useState(false);

  const headCells = [
    {
      id: "felony",
      label: "Carátula",
    },
    {
      id: "victim",
      label: "Víctima",
    },
    {
      id: "address",
      label: "Dirección",
    },
    {
      id: "endingDate",
      label: "Finalización",
    },
  ];

  const createRowData = (felony, victim, address, endingDate, id) => ({
    felony,
    victim,
    address,
    endingDate,
    id,
  });

  const rows = toursLocalState.map((tour) =>
    createRowData(
      tour.felony,
      tour.victim,
      tour.address,
      tour.endingDate,
      tour.id
    )
  );

  const addTour = (newTour) => {
    const newTourIsValid = (newTour) =>
      !isNaN(newTour.frequency) &&
      isNotEmptyString(newTour.prosecution) &&
      isNotEmptyString(newTour.felony) &&
      isNotEmptyString(newTour.victim) &&
      isNotEmptyString(newTour.address) &&
      isNotEmptyString(newTour.endingDate);

    const addNewId = () => uuid();

    if (newTourIsValid(newTour)) {
      setToursLocalState((prevState) => [
        ...prevState,
        { ...newTour, id: addNewId() },
      ]);
      setShouldReset(true);
    }
  };

  const getOnChangeHandler = React.useCallback(
    (name) => (value) => {
      setShouldReset(false);
      if (name === "date" && dateIsValid(value)) {
        const selectedDate = {
          day: value.getDate(),
          month: getMonthString(value),
          year: value.getFullYear(),
        };
        setFormValues((prevState) => ({
          ...prevState,
          ...selectedDate,
        }));
      } else if (name === "endingDate" && dateIsValid(value)) {
        setFormValues((prevState) => ({
          ...prevState,
          [name]: getDateAsString(value),
        }));
      } else if (name === "prosecution") {
        setFormValues((prevState) => ({
          ...prevState,
          prosecution: value.label,
          prosecutor: value.adjunct,
        }));
      } else {
        setFormValues((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    },
    []
  );

  const frequencyOnChange = useDebounceHandler(getOnChangeHandler("frequency"));

  const dateOnChange = useDebounceHandler(getOnChangeHandler("date"));

  const policeStationOnChange = useDebounceHandler(
    getOnChangeHandler("policeStation")
  );

  const prosecutionOnChange = getOnChangeHandler("prosecution");

  const felonyOnChange = useDebounceHandler(getOnChangeHandler("felony"));

  const victimOnChange = useDebounceHandler(getOnChangeHandler("victim"));

  const addressOnChange = useDebounceHandler(getOnChangeHandler("address"));

  const phoneOnChange = useDebounceHandler(getOnChangeHandler("phone"));

  const endingDateOnChange = useDebounceHandler(
    getOnChangeHandler("endingDate")
  );

  const {
    setElementPosition,
    elementPosition,
    handleOpenMenu,
    handleCloseMenu,
  } = useMenu();

  const [currentTourId, setCurrentTourId] = React.useState();

  const rowOnClickHandler = (event, id) => {
    handleOpenMenu(event);
    setCurrentTourId(id);
  };

  const deleteTour = (id) => () => {
    const updateState = (stateArr) => stateArr.filter((obj) => obj.id !== id);
    setToursLocalState(updateState);
    setElementPosition(null);
  };

  const generateToursDocument = (tours) => {
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

    createToursTemplate(
      createDataForToursTemplate(tours),
      toursTemplateFileName
    );
  };

  const generateToursSendingNotesDocument = (tours) => {
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
        instructor: currentInstructor.instructor,
        rank: currentInstructor.rank,
      });

      tours.forEach((tour) => {
        multiplicateObj(getToursSendingNotesObj(tour), templateData);
      });

      return templateData;
    };

    createToursTemplate(
      createDataForToursSendingNotesTemplate(tours),
      toursTemplateFileName
    );
  };

  const saveButtonHandler = () => {
    saveAppData({
      ...appDataAsString,
      tours: stringifyDataFromArray(toursLocalState),
    });
    setContextState((prevState) => ({ ...prevState, tours: toursLocalState }));
  };

  return (
    <PageWrapper>
      <CustomPaper>
        <PageTitle>Agregar recorrida dinámica</PageTitle>
        <Input
          label='Frecuencia (Hs.)'
          onChange={frequencyOnChange}
          shouldReset={shouldReset}
          placeholder='2'
        />
        <DateInput
          label='Fecha actual'
          onChange={dateOnChange}
          initialValue={currentDate.object}
          shouldReset={shouldReset}
        />
        <Input
          label='Dependencia'
          onChange={policeStationOnChange}
          shouldReset={shouldReset}
          initialValue={toursCommonData.policeStation}
        />
        <Input
          label='Carátula'
          onChange={felonyOnChange}
          shouldReset={shouldReset}
          placeholder='Pedro Sonia S/ Amenazas'
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
        />
        <Input
          label='Víctima'
          onChange={victimOnChange}
          shouldReset={shouldReset}
        />
        <Input
          label='Domicilio'
          onChange={addressOnChange}
          shouldReset={shouldReset}
          placeholder='Don Bosco Nro. 432'
        />
        <Input
          label='Teléfono'
          onChange={phoneOnChange}
          shouldReset={shouldReset}
          placeholder='2477-15896325'
        />
        <DateInput
          label='Fecha de finalización'
          onChange={endingDateOnChange}
          shouldReset={shouldReset}
          minDate={currentDate.object}
        />
        <Button onClick={() => addTour(formValues)}>Agregar</Button>
      </CustomPaper>
      <PageTitle>Listado</PageTitle>
      <EnhancedTable
        headCells={headCells}
        cellsAmount={4}
        rows={rows}
        shouldListResults={rows[0].id !== "default"}
        rowTooltipTitle='Clickear para ver opciones'
        rowOnClickHandler={rowOnClickHandler}
        rowMenuComponent={
          <RowMenu
            elementPosition={elementPosition}
            handleCloseMenu={handleCloseMenu}
          >
            <MenuItem onClick={deleteTour(currentTourId)}>
              Borrar factura
            </MenuItem>
          </RowMenu>
        }
      />
      <CustomPaper>
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
      </CustomPaper>
    </PageWrapper>
  );
};

export default Tours;
