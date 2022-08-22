import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";

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

  console.log("instancia", doc);

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

const manageInstanceFromFile = async ({ callback, instanceSettings }) => {
  const file = await getFile();
  if (file.kind === "file") {
    const arrayBuffer = await getArrayBuffer(file);
    const doc = getDocxTemplaterInstance(arrayBuffer, instanceSettings);
    callback(doc);
    //Luego de usar el metodo render ya estaria lista para obtener un blob y descargarla
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

/*const generateDataStoreDocument = (templateInstance) => {



}*/

const generateItineratedDocument = (templateInstance) => {
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
    fileName: "output.docx",
  });
  /*
  const blob = getBlob(templateInstance, {
    type: "blob",
    mimeType:
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  });
  downloadFile(blob, "output.docx");*/
};

const createRecorridas = () =>
  manageInstanceFromFile({
    callback: generateItineratedDocument,
    instanceSettings: {
      paragraphLoop: true,
      linebreaks: true,
    },
  });

export { generateDocument, manageInstanceFromFile, createRecorridas };
