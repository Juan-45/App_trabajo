import React from "react";
import Context from "../Context";
import { v4 as uuid } from "uuid";
import useDebounceHandler from "hooks/useDebounceHandler";
import useSave from "hooks/useSave";
import useLoad from "hooks/useLoad";

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

  const { instructors, prosecutions, setContextState } =
    React.useContext(Context);

  const [shouldReset, setShouldReset] = React.useState(false);

  const [prosecution, setProsecution] = React.useState({
    prosecution: "",
    prosecutor: "",
  });

  const [instructor, setInstructor] = React.useState({
    instructor: "",
    rank: "",
  });

  const [comboBoxSelectionsId, setComboBoxSelectionsId] = React.useState();

  const getOnChangeHandler = React.useCallback(
    (name) => (value) => {
      setShouldReset(false);
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
    setContextState((prevState) => ({
      ...prevState,
      currentInstructor: { instructor: value.label, rank: value.adjunct },
    }));
    setComboBoxSelectionsId((prevState) => ({
      ...prevState,
      instructors: { selectionId: value.id },
    }));
  };

  const currentProsecutionOnChange = (value) =>
    setComboBoxSelectionsId((prevState) => ({
      ...prevState,
      prosecutions: { selectionId: value.id },
    }));

  const addNewId = () => uuid();

  const addInstructor = (instructor) =>
    setContextState((prevState) => ({
      ...prevState,
      instructors: prevState.instructors.push({
        label: instructor.instructor,
        adjunct: instructor.rank,
        id: addNewId(),
      }),
    }));

  const addProsecution = (prosecution) =>
    setContextState((prevState) => ({
      ...prevState,
      prosecutions: prevState.prosecutions.push({
        label: prosecution.prosecution,
        adjunct: prosecution.prosecutor,
        id: addNewId(),
      }),
    }));

  const getRemoveHandlerFor = (name) => (id) => {
    setContextState((prevState) => ({
      ...prevState,
      [name]: prevState[name].filter((obj) => obj.id !== id),
    }));
    setComboBoxSelectionsId((prevState) => ({
      ...prevState,
      [name]: { selectionId: null },
    }));
  };

  const removeInstructor = getRemoveHandlerFor("instructors");

  const removeProsecution = getRemoveHandlerFor("prosecutions");

  /*(currentProsecutionId) => {
    setContextState((prevState) => ({
      ...prevState,
      prosecutions: prevState.prosecutions.filter(
        (prosecutionObj) => prosecutionObj.id !== currentProsecutionId
      ),
    }));
    setCurrentProsecutionId(null);
  };*/

  return (
    <PageWrapper>
      <CustomPaper>
        <PageTitle>Agregar instructor.</PageTitle>
        <Input
          label='Instructor'
          onChange={instructorNameOnChange}
          shouldReset={shouldReset}
          placeholder='Masciotta Marcela'
        />
        <Input
          label='Jerarquía'
          onChange={instructorRankOnChange}
          shouldReset={shouldReset}
          placeholder='Subcomisario'
        />
        <Button onClick={() => addInstructor(instructor)}>Agregar</Button>
      </CustomPaper>
      <CustomPaper>
        <PageTitle>Agregar fiscalía.</PageTitle>
        <Input
          label='Fiscalía'
          onChange={prosecutionOnChange}
          shouldReset={shouldReset}
          placeholder='UFI Y J Nro. 1'
        />
        <Input
          label='Fiscal a/C'
          onChange={prosecutorOnChange}
          shouldReset={shouldReset}
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
        <PageTitle>Seleccionar instructor actual.</PageTitle>
        <ComboBox
          label='Fiscalías'
          options={prosecutions}
          onChange={currentProsecutionOnChange}
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
