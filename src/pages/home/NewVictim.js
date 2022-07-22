import PersonalDetailsForm from "components/PersonalDetailsForm";
//import VictimTable from "./newVictim/VictimTable";
import { memo } from "react";

const NewVictim = ({ setVictim }) => {
  return (
    <>
      <PersonalDetailsForm setGlobalState={setVictim} title="Agregar Víctima" />
      {/*  <VictimTable />*/}
    </>
  );
};

export default memo(NewVictim);
