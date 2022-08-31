import React from "react";
import Context from "../Context";
import { loadData, createArrayFromStringifyData } from "helpers/tools";

const useLoad = () => {
  const { setContextState } = React.useContext(Context);

  const getObjectFrom = (str) => ({
    instructors: createArrayFromStringifyData(str, "instructors"),
    prosecutions: createArrayFromStringifyData(str, "prosecutions"),
    tours: createArrayFromStringifyData(str, "tours"),
  });

  const loadAppData = () =>
    loadData((str) => {
      const oldData = getObjectFrom(str);
      setContextState((prevState) => ({
        ...prevState,
        ...oldData,
      }));
    });

  return {
    loadAppData,
  };
};

export default useLoad;
