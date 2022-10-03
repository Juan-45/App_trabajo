import React from "react";
import Context from "../Context";
import { saveData, stringifyDataFromArray } from "helpers/tools";
import { getDateAsString } from "helpers/date";

const useSave = () => {
  const { instructors, prosecutions, tours, felonies, currentDate } =
    React.useContext(Context);

  const appDataFileName = `AppData---${getDateAsString(currentDate.object)}`;

  const saveAppData = (data) => saveData(data, appDataFileName);

  const appDataAsString = {
    prosecutions: stringifyDataFromArray(prosecutions, "prosecutions"),
    instructors: stringifyDataFromArray(instructors, "instructors"),
    felonies: stringifyDataFromArray(felonies, "felonies"),
    tours: stringifyDataFromArray(tours, "tours"),
  };

  return {
    saveAppData,
    appDataAsString,
    stringifyDataFromArray,
  };
};

export default useSave;
