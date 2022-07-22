import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { saveAs } from "file-saver";

const generateDocument = (data) => {
  console.log(data);
  const getFile = async (callback) => {
    let fileHandle;
    // open file picker
    [fileHandle] = await window.showOpenFilePicker();

    if (fileHandle.kind === "file") {
      const fileData = await fileHandle.getFile();
      const arrayBuffer = await fileData.arrayBuffer();
      // run file code
      callback(arrayBuffer);
    } else if (fileHandle.kind === "directory") {
      // run directory code
    }
  };

  getFile(function (content) {
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
    });

    // render the document (replace all occurences of {first_name} by John, {last_name} by Doe, ...)
    doc.render(data);
    const out = doc.getZip().generate({
      type: "blob",
      mimeType:
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
    }); //Output the document using Data-URI
    saveAs(out, "output.docx");
  });
};

export { generateDocument };
