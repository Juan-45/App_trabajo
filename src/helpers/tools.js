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
    const arrayBuffer = await getArrayBuffer(file);
    const doc = getDocxTemplaterInstance(arrayBuffer, instanceSettings);
    return doc;
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

/*const generateItineratedDocument = (templateInstance, data, fileName) => {
  templateInstance.render({
    raw_loop_pagebreak: `<w:br w:type="page"/>`,
    subTemplateLoop: [
      {
        frequency: "2",
        day: "13",
        month: "agosto",
        year: "2022",
        policeStation: "Seccional Comando Patrulla Pergamino",
        prosecution: "UFI Y J Nro 4",
        felony: "Pepe s/ lesiones leves",
        victim: "María Antonieta",
        address: "Magallanes 1254",
        phone: "2477-15457896",
      },
      {
        frequency: "2",
        day: "13",
        month: "agosto",
        year: "2022",
        policeStation: "Seccional Comando Patrulla Pergamino",
        prosecution: "UFI Y J Nro 4",
        felony: "Pepe s/ lesiones leves",
        victim: "María Antonieta",
        address: "Magallanes 1254",
        phone: "2477-15457896",
        raw_loop_pagebreak: "",
      },
    ],
  });

  downloadFileFromInstance({
    templateInstance,
    fileName//: "output.docx",
  });
  
}; */

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

//Esta función la podría llamar usando .then() para luego de crear doc inmediatamente solicitar template para nota de elevacion y crear tb ese doc
/*const createToursElevationNotes = async () => {

  const instance = await getInstanceFromFile({
    paragraphLoop: true,
    linebreaks: true,
  });



}*/

const createToursTemplate = async (data, fileName) => {
  const instance = await getInstanceFromFile({
    paragraphLoop: true,
    linebreaks: true,
  });
  generateItineratedDocument(instance, data, fileName);
};

const stringifyDataFromArray = (array, propertyStr) => {
  const itinerateProperties = (obj, stringifyData) => {
    let currentStringifyData = stringifyData;
    for (const property in obj) {
      const currentValue = obj[property];

      const isEmptyString = currentValue === "";

      const defaultValueForSaving = "default";

      const valueToPass = isEmptyString ? defaultValueForSaving : currentValue;

      currentStringifyData =
        currentStringifyData + `${property}:${valueToPass},`;
    }
    return currentStringifyData;
  };

  const itinerateObjectsIn = (array, propertyStr) => {
    const closeStringWithPropertyName = (strBase, closingStr) =>
      strBase + closingStr + "#";

    if (array.length !== 0) {
      let stringifyData = "";

      array.forEach((obj) => {
        stringifyData = stringifyData + "/";
        stringifyData = itinerateProperties(obj, stringifyData);
        stringifyData = stringifyData + "/";
      });
      stringifyData = closeStringWithPropertyName(stringifyData, propertyStr);
      return stringifyData;
    }
  };

  return itinerateObjectsIn(array, propertyStr);
};

const saveData = async (data, fileName) => {
  const instance = await getInstanceFromFile();

  instance.render(data);
  downloadFileFromInstance({
    templateInstance: instance,
    fileName,
  });
};

const createArrayFromStringifyData = (string, propertyStr) => {
  const mainDataArr = string.split("#").filter(isNotEmptyString);

  const currentEntity = mainDataArr.find(
    (str) => str.search(propertyStr) !== -1
  );

  const objectsStringsArr = currentEntity.split("/").filter(isNotEmptyString);

  objectsStringsArr.pop();

  const getPropertiesAndValuesArrFrom = (str) =>
    str.split(",").filter(isNotEmptyString);

  const getObject = (propertiesAndValuesArray) => {
    const object = {};

    propertiesAndValuesArray.forEach((str) => {
      const propertyAndValuePairArr = str.split(":").filter(isNotEmptyString);
      const property = propertyAndValuePairArr[0];
      const value = propertyAndValuePairArr[1];

      const isDefaultValue = value === "default";
      const valueToPass = isDefaultValue ? "" : value;

      object[property] = valueToPass;
    });

    return object;
  };

  const getArrayOfObjectsFrom = (objectsStringsArr) => {
    const array = [];

    objectsStringsArr.forEach((str) => {
      array.push(getObject(getPropertiesAndValuesArrFrom(str)));
    });
    return array;
  };

  return getArrayOfObjectsFrom(objectsStringsArr);
};

const loadData = async (callback) => {
  const instance = await getInstanceFromFile();
  const stringifyData = instance.getFullText();
  callback(stringifyData);
};

export {
  stringifyDataFromArray,
  createArrayFromStringifyData,
  generateDocument,
  getInstanceFromFile,
  createToursTemplate,
  saveData,
  loadData,
};
