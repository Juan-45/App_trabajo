import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";
import { isNotEmptyString } from "helpers/data";

const getFile = async () => {
  let fileHandle;
  [fileHandle] = await window.showOpenFilePicker();
  return fileHandle;
};

const getArrayBuffer = async (file) => {
  const fileData = await file.getFile();
  const arrayBuffer = await fileData.arrayBuffer();
  return arrayBuffer;
};

/*const getFile = (callback, data) => {
  const file = openFilePicker();

  if (file.kind === "file") {
    const arrayBuffer = getArrayBuffer(file);

    callback(arrayBuffer, data);
  } else if (file.kind === "directory") {
    // run directory code
  }
};*/

const getZipInstance = (arrayBuffer) => new PizZip(arrayBuffer);

const getDocxTemplaterInstance = (arrayBuffer, config) =>
  new Docxtemplater(getZipInstance(arrayBuffer), config);

const getBlob = (docxTemplaterInstance, config) =>
  docxTemplaterInstance.getZip().generate(config);

const downloadFile = (blob, fileName) => saveAs(blob, fileName);

const testFunction = (arrayBuffer, data) => {
  const doc = getDocxTemplaterInstance(arrayBuffer, {
    paragraphLoop: true,
    linebreaks: true,
  });

  doc.render(data);
  const blob = getBlob(doc, {
    type: "blob",
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
  downloadFile(blob, "output.docx");
};

const generateDocument = async (data) => {
  const file = await getFile();
  if (file.kind === "file") {
    const arrayBuffer = await getArrayBuffer(file);
    testFunction(arrayBuffer, data);
  }
};

const getInstanceFromFile = async (instanceSettings) => {
  const file = await getFile();
  if (file.kind === "file") {
    const fileName = file.name.split(".")[0];
    const arrayBuffer = await getArrayBuffer(file);
    const doc = getDocxTemplaterInstance(arrayBuffer, instanceSettings);
    return { instance: doc, fileName };
  }
};

const downloadFileFromInstance = ({ templateInstance, fileName }) => {
  const blob = getBlob(templateInstance, {
    type: "blob",
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
  downloadFile(blob, fileName);
};

const generateItineratedDocument = (templateInstance, data, fileName) => {
  const getDataWithPageBreakEnding = (data) => {
    const arrayWithoutLastItem = data.filter(
      (element, index) => index < data.length - 1
    );

    const lastItem = data[data.length - 1];

    const lastItemWithPageBreakEnding = {
      ...lastItem,
      raw_loop_pagebreak: "",
    };

    return [...arrayWithoutLastItem, lastItemWithPageBreakEnding];
  };

  templateInstance.render({
    raw_loop_pagebreak: `<w:br w:type="page"/>`,
    loop: getDataWithPageBreakEnding(data),
  });

  downloadFileFromInstance({
    templateInstance,
    fileName,
  });
};

const createToursTemplate = async (data, fileName) => {
  const instance = await getInstanceFromFile({
    paragraphLoop: true,
    linebreaks: true,
  });
  generateItineratedDocument(instance.instance, data, fileName);
};

const createTemplates = async (data, fileName) => {
  const instance = await getInstanceFromFile({
    paragraphLoop: true,
    linebreaks: true,
  });
  instance.instance.render(data);

  downloadFileFromInstance({
    templateInstance: instance.instance,
    fileName: `${instance.fileName} - ${fileName}`,
  });
};

const stringifyDataFromArray = (array, propertyStr) => {
  const itinerateArray = (
    arr,
    objectSeparatorCharacter,
    propertyValueSeparatorCharacter
  ) => {
    let stringifyData = "";

    arr.forEach((obj) => {
      stringifyData = stringifyData + objectSeparatorCharacter;

      stringifyData = itinerateProperties(
        obj,
        stringifyData,
        propertyValueSeparatorCharacter
      );

      stringifyData = stringifyData + objectSeparatorCharacter;
    });
    return stringifyData;
  };

  const itinerateProperties = (
    obj,
    stringifyData,
    propertyValueSeparatorCharacter
  ) => {
    let currentStringifyData = stringifyData;

    const addToBaseString = (base, newString) => base + newString;

    for (const property in obj) {
      const currentValue = obj[property];

      if (Array.isArray(currentValue)) {
        if (currentValue.length !== 0) {
          // "&" separator character for first nested array
          // "." separator character for properties and values of objects of nested array
          currentStringifyData = addToBaseString(
            currentStringifyData,
            `${property}:${itinerateArray(
              currentValue,
              "&",
              "."
            )}${propertyValueSeparatorCharacter}`
          );
        } else {
          currentStringifyData = addToBaseString(
            currentStringifyData,
            `${property}:undefined${propertyValueSeparatorCharacter}`
          );
        }
      } else {
        currentStringifyData = addToBaseString(
          currentStringifyData,
          `${property}:${
            currentValue !== "" ? currentValue : "emptyStr"
          }${propertyValueSeparatorCharacter}`
        );
      }
    }
    return currentStringifyData;
  };

  const stringify = (array, propertyStr) => {
    const closeStringWithPropertyName = (strBase, closingStr) =>
      strBase + closingStr + "#";

    if (array.length !== 0) {
      let stringifyData = itinerateArray(array, "/", ",");

      stringifyData = closeStringWithPropertyName(stringifyData, propertyStr);
      return stringifyData;
    } else return `undefined${propertyStr}#`;
  };

  return stringify(array, propertyStr);
};

const saveData = async (data, fileName) => {
  const instance = await getInstanceFromFile();

  instance.render(data);
  downloadFileFromInstance({
    templateInstance: instance.instance,
    fileName,
  });
};

const createArrayFromStringifyData = (string, propertyStr) => {
  const mainDataArr = string.split("#").filter(isNotEmptyString);
  const currentEntity = mainDataArr.find(
    (str) => str.search(propertyStr) !== -1
  );

  const isLoeadedDataDefault = currentEntity === `undefined${propertyStr}#`;

  const getPropertiesAndValuesArrFrom = (
    str,
    propertyValueSeparatorCharacter
  ) => str.split(propertyValueSeparatorCharacter).filter(isNotEmptyString);

  const getArrayOfObjectsFrom = (
    objectsStringsArr,
    propertyValueSeparatorCharacter
  ) => {
    const array = [];

    objectsStringsArr.forEach((str) => {
      array.push(
        getObject(
          getPropertiesAndValuesArrFrom(str, propertyValueSeparatorCharacter)
        )
      );
    });
    return array;
  };

  const getObject = (propertiesAndValuesArray) => {
    const object = {};

    propertiesAndValuesArray.forEach((str) => {
      const [property, ...rest] = str.split(":").filter(isNotEmptyString);
      const value = rest.length > 1 ? rest.join(":") : rest[0];
      console.log("value", value);
      const isValueANestedArray = value[0] === "&";

      if (isValueANestedArray) {
        const objectsStringsArr = value.split("&").filter(isNotEmptyString);
        object[property] = getArrayOfObjectsFrom(objectsStringsArr, ".");
      } else if (value === "undefined") {
        object[property] = [];
      } else {
        object[property] = value !== "emptyStr" ? value : "";
      }
    });

    return object;
  };

  if (!isLoeadedDataDefault) {
    console.log("currentEntity", currentEntity);
    const objectsStringsArr = currentEntity.split("/").filter(isNotEmptyString);

    objectsStringsArr.pop();

    return getArrayOfObjectsFrom(objectsStringsArr, ",");
  } else return [];
};

const loadData = async (callback) => {
  const instance = await getInstanceFromFile();
  const stringifyData = instance.instance.getFullText();
  callback(stringifyData);
};

/*const testObj = {
  testArr: [
    {
      testA: "testA",
      testB: "testB",
      testArr: [
        {
          nestedArrObjA: "nestedA",
          nestedArrObjB: "nestedB",
        },
        {
          nestedArrObjA2: "nestedA2",
          nestedArrObjB2: "nestedB2",
        },
      ],
      testArr2: [],
    },
    {
      test1: "test1",
      test2: "test2",
      testArr: [
        {
          nestedArrObj1: "nested1",
          nestedArrObj2: "nested2",
        },
      ],
    },
  ],
};

console.log(
  "string resultante",
  stringifyDataFromArray(testObj.testArr, "testArr")
);

console.log(
  "objeto devuelto",
  createArrayFromStringifyData(
    stringifyDataFromArray(testObj.testArr, "testArr"),
    "testArr"
  )
);*/

export {
  stringifyDataFromArray,
  createArrayFromStringifyData,
  generateDocument,
  getInstanceFromFile,
  createToursTemplate,
  createTemplates,
  saveData,
  loadData,
};
