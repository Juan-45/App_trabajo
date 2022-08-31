import React from "react";
import Context from "../Context";
import { saveData, stringifyDataFromArray } from "helpers/tools";
import { getDateAsString } from "helpers/date";

const useSave = () => {
  const { instructors, prosecutions, tours, currentDate } =
    React.useContext(Context);

  const appDataFileName = `AppData---${getDateAsString(currentDate.object)}`;

  const saveAppData = (data) => saveData(data, appDataFileName);

  const appDataAsString = {
    tours: stringifyDataFromArray(tours),
    prosecutions: stringifyDataFromArray(prosecutions),
    instructors: stringifyDataFromArray(instructors),
  };

  return {
    saveAppData,
    appDataAsString,
    stringifyDataFromArray,
  };
};

export default useSave;
