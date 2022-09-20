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
    tours: stringifyDataFromArray(tours, "tours"),
    prosecutions: stringifyDataFromArray(prosecutions, "prosecutions"),
    instructors: stringifyDataFromArray(instructors, "instructors"),
  };

  return {
    saveAppData,
    appDataAsString,
    stringifyDataFromArray,
  };
};

export default useSave;
