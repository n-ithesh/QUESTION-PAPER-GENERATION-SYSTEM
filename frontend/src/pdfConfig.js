import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

// ✅ Import Roboto font file
import { Buffer } from "buffer";
import robotoRegular from "@fontsource/roboto/files/roboto-latin-400-normal.woff";

pdfMake.vfs = {
  ...pdfFonts.pdfMake.vfs,
  "Roboto-Regular.ttf": Buffer.from(robotoRegular).toString("base64"),
};

pdfMake.fonts = {
  Roboto: {
    normal: "Roboto-Regular.ttf",
    bold: "Roboto-Regular.ttf",
    italics: "Roboto-Regular.ttf",
    bolditalics: "Roboto-Regular.ttf",
  },
};

export default pdfMake;
