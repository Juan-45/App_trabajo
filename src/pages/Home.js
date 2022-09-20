import React from "react";
import Context from "../Context";
import { v4 as uuid } from "uuid";
import useDebounceHandler from "hooks/useDebounceHandler";
import useSave from "hooks/useSave";
import useLoad from "hooks/useLoad";
import {
  //removeDefaultItemFrom,
  allPropertiesValuesAreValid,
} from "helpers/helperFunctions";

import PageWrapper from "components/PageWrapper";
import PageTitle from "components/PageTitle";
import CustomPaper from "components/CustomPaper";
import Input from "components/Input";
import ComboBox from "components/ComboBox";

/*import { generateDocument, createToursTemplate } from "helpers/tools";
import HeaderForm from "./home/HeaderForm";
import NewVictim from "./home/NewVictim";*/
import { Button, Grid /*Typography*/ } from "@mui/material";
//import { useState } from "react";

const Home = () => {
  /*  const [IPPHeader, setIPPHeader] = useState();
  const [victim, setVictim] = useState();

  const [instances, setInstances] = useState({
    subTemplate: {},
    mainTemplate: {},
  });

  console.table(IPPHeader);
  console.table(victim);*/

  const { saveAppData, appDataAsString } = useSave();

  const { loadAppData } = useLoad();

  const { instructors, prosecutions, currentInstructor, setContextState } =
    React.useContext(Context);

  const [shouldReset, setShouldReset] = React.useState({
    prosecution: false,
    instructor: false,
    selectedProsecution: false,
    selectedInstructor: false,
  });

  const prosecutionDefault = {
    prosecution: "",
    prosecutor: "",
  };

  const instructorDefault = {
    instructor: "",
    rank: "",
  };

  const [prosecution, setProsecution] = React.useState(prosecutionDefault);

  const [instructor, setInstructor] = React.useState(instructorDefault);

  const [comboBoxSelectionsId, setComboBoxSelectionsId] = React.useState();

  const getOnChangeHandler = React.useCallback(
    (name) => (value) => {
      setShouldReset((prevState) => ({
        ...prevState,
        prosecution: false,
        instructor: false,
      }));
      if (name === "instructor" || name === "rank") {
        setInstructor((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      } else if (name === "prosecution" || name === "prosecutor") {
        setProsecution((prevState) => ({
          ...prevState,
          [name]: value,
        }));
      }
    },
    []
  );

  const instructorNameOnChange = useDebounceHandler(
    getOnChangeHandler("instructor")
  );

  const instructorRankOnChange = useDebounceHandler(getOnChangeHandler("rank"));

  const prosecutionOnChange = useDebounceHandler(
    getOnChangeHandler("prosecution")
  );

  const prosecutorOnChange = useDebounceHandler(
    getOnChangeHandler("prosecutor")
  );

  const currentInstructorOnChange = (value) => {
    setShouldReset((prevState) => ({
      ...prevState,
      selectedInstructor: false,
    }));
    setContextState((prevState) => ({
      ...prevState,
      currentInstructor: value,
    }));
    setComboBoxSelectionsId((prevState) => ({
      ...prevState,
      instructors: { selectionId: value.id },
    }));
  };

  const currentProsecutionOnChange = (value) => {
    setShouldReset((prevState) => ({
      ...prevState,
      selectedProsecution: false,
    }));
    setComboBoxSelectionsId((prevState) => ({
      ...prevState,
      prosecutions: { selectionId: value.id },
    }));
  };

  const addNewId = () => uuid();

  const addInstructor = (instructor) => {
    if (allPropertiesValuesAreValid(instructor)) {
      setShouldReset((prevState) => ({
        ...prevState,
        instructor: true,
      }));
      setContextState((prevState) => {
        const currentArr = []; //removeDefaultItemFrom([...prevState.instructors]);

        currentArr.push({
          label: instructor.instructor,
          adjunct: instructor.rank,
          id: addNewId(),
        });

        return {
          ...prevState,
          instructors: currentArr,
        };
      });
      setInstructor(instructorDefault);
    }
  };

  const addProsecution = (prosecution) => {
    if (allPropertiesValuesAreValid(prosecution)) {
      setShouldReset((prevState) => ({
        ...prevState,
        prosecution: true,
      }));
      setContextState((prevState) => {
        const currentArr = [...prevState.prosecutions];

        currentArr.push({
          label: prosecution.prosecution,
          adjunct: prosecution.prosecutor,
          id: addNewId(),
        });

        return {
          ...prevState,
          prosecutions: currentArr,
        };
      });
      setProsecution(prosecutionDefault);
    }
  };

  const getRemoveHandlerFor = (name) => (id) => {
    const shouldResetSelectedInstructor = {
      selectedInstructor: true,
    };

    const shouldResetSelectedProsecution = {
      selectedProsecution: true,
    };

    const comboBoxToReset =
      name === "instructors"
        ? shouldResetSelectedInstructor
        : shouldResetSelectedProsecution;

    setShouldReset((prevState) => ({
      ...prevState,
      ...comboBoxToReset,
    }));

    setContextState((prevState) => ({
      ...prevState,
      [name]: prevState[name].filter((obj) => obj.id !== id),
    }));
    setComboBoxSelectionsId((prevState) => ({
      ...prevState,
      [name]: { selectionId: "" },
    }));
  };

  const removeInstructor = getRemoveHandlerFor("instructors");

  const removeProsecution = getRemoveHandlerFor("prosecutions");

  return (
    <PageWrapper>
      <CustomPaper>
        <PageTitle>Agregar instructor.</PageTitle>
        <Input
          label='Instructor'
          onChange={instructorNameOnChange}
          shouldReset={shouldReset.instructor}
          placeholder='Masciotta Marcela'
        />
        <Input
          label='Jerarquía'
          onChange={instructorRankOnChange}
          shouldReset={shouldReset.instructor}
          placeholder='Subcomisario'
        />
        <Button onClick={() => addInstructor(instructor)}>Agregar</Button>
      </CustomPaper>
      <CustomPaper>
        <PageTitle>Agregar fiscalía.</PageTitle>
        <Input
          label='Fiscalía'
          onChange={prosecutionOnChange}
          shouldReset={shouldReset.prosecution}
          placeholder='UFI Y J Nro. 1'
        />
        <Input
          label='Fiscal a/C'
          onChange={prosecutorOnChange}
          shouldReset={shouldReset.prosecution}
          placeholder='Dr. Oldani'
        />
        <Button onClick={() => addProsecution(prosecution)}>Agregar</Button>
      </CustomPaper>
      <CustomPaper>
        <PageTitle>Seleccionar instructor actual.</PageTitle>
        <ComboBox
          label='Instructor'
          options={instructors}
          onChange={currentInstructorOnChange}
          shouldReset={shouldReset.selectedInstructor}
          defaultValueForParentState={{
            label: "",
            adjunct: "",
            id: "",
          }}
          initialValue={currentInstructor}
        />
        <Button
          onClick={() =>
            removeInstructor(comboBoxSelectionsId.instructors.selectionId)
          }
        >
          Eliminar selección
        </Button>
      </CustomPaper>
      <CustomPaper>
        <PageTitle>Seleccionar fiscalía a eliminar.</PageTitle>
        <ComboBox
          label='Fiscalías'
          options={prosecutions}
          onChange={currentProsecutionOnChange}
          shouldReset={shouldReset.selectedProsecution}
          defaultValueForParentState={{
            label: "",
            adjunct: "",
            id: "",
          }}
        />
        <Button
          onClick={() =>
            removeProsecution(comboBoxSelectionsId.prosecutions.selectionId)
          }
        >
          Eliminar selección
        </Button>
      </CustomPaper>
      <CustomPaper>
        <PageTitle>Operaciones.</PageTitle>
        <Grid container justifyContent={"space-between"}>
          <Button onClick={loadAppData}>Cargar datos</Button>
          <Button onClick={() => saveAppData(appDataAsString)}>
            Guardar datos
          </Button>
        </Grid>
      </CustomPaper>

      {/*<ComboBox
                        label="Barrios"
                        options={neighborhoods}
                        onChange={comboBoxNeighborhoodsHandler}
  />*/}

      {/*<Typography variant='h4' textAlign='center' gutterBottom>
        Investigación Penal Preparatoria
      </Typography>
      <HeaderForm setIPPHeader={setIPPHeader} />
      <NewVictim setVictim={setVictim} />
      <Button onClick={() => generateDocument({ ...IPPHeader, ...victim })}>
        Generate document
      </Button>
      <Grid container direction='column'>
        <Typography variant='h4' textAlign='center' gutterBottom>
          Espacio de pruebas
        </Typography>
        <Button onClick={createToursTemplate}>Generar recorridas</Button>
  </Grid>*/}
    </PageWrapper>
  );
};

export default Home;
