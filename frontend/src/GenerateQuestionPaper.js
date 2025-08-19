import React, { useState, useEffect } from "react";
import Preview from "./Preview";


import robotoRegular from "@fontsource/roboto/files/roboto-latin-400-normal.woff";
import robotoMedium from "@fontsource/roboto/files/roboto-latin-500-normal.woff";



import {
  Box,
  Button,
  MenuItem,
  Select,
  TextField,
  Typography,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper
} from "@mui/material";
import pdfMake from "pdfmake/build/pdfmake";
import pdfFonts from "pdfmake/build/vfs_fonts";

pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfFonts.vfs;

pdfMake.fonts = {
  Roboto: {
    normal: "Roboto-Regular.ttf",
    bold: "Roboto-Medium.ttf",
    italics: "Roboto-Regular.ttf",
    bolditalics: "Roboto-Medium.ttf",
  },
};

//pdfMake.vfs = pdfFonts.pdfMake ? pdfFonts.pdfMake.vfs : pdfFonts.vfs;

const QuestionPaperGenerator = () => {
  const [subjects, setSubjects] = useState([]);
  const [selectedSubject, setSelectedSubject] = useState("");
  const [maxMarks, setMaxMarks] = useState(50);
  const [numPartAQuestions, setNumPartAQuestions] = useState(5);
  const [numModules, setNumModules] = useState(2);
  const [questionPaper, setQuestionPaper] = useState({ partA: [], partB: [] });

  useEffect(() => {
    fetchSubjects();
  }, []);

  // ✅ Fetch subjects from the database
  const fetchSubjects = async () => {
    try {
      const res = await fetch("http://localhost:5000/subjects");
      const data = await res.json();
      setSubjects(data);
    } catch (error) {
      console.error("❌ Error fetching subjects:", error);
    }
  };

  // ✅ Generate Question Paper
  const generateQuestionPaper = async () => {
    if (!selectedSubject) {
      alert("❌ Please select a subject!");
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/questions/${selectedSubject}`);
      const { questions } = await res.json();

      // ✅ Filter Part A Questions
      const partAQuestions = questions
        .filter((q) => q.part === "A")
        .sort(() => Math.random() - 0.5)
        .slice(0, numPartAQuestions);

      // ✅ Filter Part B Questions (by module)
      const partBQuestions = [];
      for (let module = 1; module <= numModules; module++) {
        const moduleQuestions = questions
          .filter((q) => q.part === "B" && q.module === module)
          .sort(() => Math.random() - 0.5)
          .slice(0, 1); // One question per module

        if (moduleQuestions.length > 0) {
          partBQuestions.push(...moduleQuestions);
        }
      }

      // ✅ Total Marks Validation
      const totalMarks =
        partAQuestions.reduce((sum, q) => sum + q.marks, 0) +
        partBQuestions.reduce((sum, q) => sum + q.marks, 0);

      if (totalMarks !== maxMarks) {
        alert(`❌ Total marks (${totalMarks}) don't match the selected max marks (${maxMarks}).`);
        return;
      }

      setQuestionPaper({ partA: partAQuestions, partB: partBQuestions });
    } catch (error) {
      console.error("❌ Error generating question paper:", error);
    }
  };

  // ✅ Download PDF
  const downloadPDF = () => {
    if (!questionPaper.partA.length && !questionPaper.partB.length) {
      alert("❌ Generate the question paper first!");
      return;
    }
  
    const month = prompt("Enter Exam Month (e.g., November):");
    const year = prompt("Enter Exam Year (e.g., 2025):");
    const semester = prompt("Enter Semester (e.g., Third):");
    const subjectCode = prompt("Enter Subject Code (e.g., 21MCA302):");
  
    if (!month || !year || !semester || !subjectCode || !selectedSubject) return;
  
    const subjectName = subjects.find((s) => s._id === selectedSubject)?.subjectName || "";
    const duration = maxMarks === 50 ? "90 Minutes" : "3 Hours";
  
    // ✅ Define Document Structure
    const documentDefinition = {
      content: [
        {
          table: {
            widths: ["100%"],
            body: [
              [
                {
                  stack: [
                    { text: "ST JOSEPH ENGINEERING COLLEGE, MANGALURU", style: "header" },
                    { text: "An Autonomous Institution", style: "subheader" },
                    { text: `${semester} Semester MCA (Autonomous) Examinations ${month}-${year}`, style: "subheader" },
                    { text: "", margin: [0, 5] }, // Spacer
  
                    // ✅ USN + Subject Code Row
                    {
                      columns: [
                        {
                          width: "auto",
                          text: "USN: ",
                          style: "details",
                          margin: [0, 5, 0, 0],
                        },
                        {
                          width: "auto",
                          table: {
                            headerRows: 0,
                            widths: Array(10).fill(20), // Increased width
                            body: [
                              [
                                ...Array(10).fill({
                                  text: "",
                                  border: [true, true, true, true],
                                  alignment: "center",
                                  fontSize: 14,
                                  margin: [0, 5], // Increased height
                                }),
                              ],
                            ],
                          },
                        },
                        {
                          width: "*",
                          text: subjectCode,
                          alignment: "right",
                          style: "details",
                          margin: [0, 5, 0, 0],
                        },
                      ],
                    },
  
                    // ✅ Duration + Max Marks Row
                    {
                      columns: [
                        { text: `Duration: ${duration}`, alignment: "left", style: "details" },
                        { text: `Maximum Marks: ${maxMarks}`, alignment: "right", style: "details" },
                      ],
                    },
  
                    // ✅ Subject Name Row
                    {
                      text: subjectName,
                      style: "subjectHeader",
                      alignment: "center",
                      margin: [0, 10, 0, 5],
                    },
                  ],
                },
              ],
            ],
          },
          layout: {
            hLineWidth: () => 1,
            vLineWidth: () => 1,
          },
        },
  
        // ✅ Part A Table
        { text: "\nPart A - 2 Marks Questions", style: "sectionHeader" },
        {
          table: {
            headerRows: 1,
            widths: ["10%", "50%", "10%", "10%", "10%", "10%"],
            body: [
              ["Q. No.", "Question", "CO", "PO", "BL", "Marks"],
              ...questionPaper.partA.map((q, index) => [
                index + 1,
                q.text,
                q.CO,
                q.PO,
                q.BL,
                q.marks,
              ]),
            ],
          },
        },
  
        // ✅ Part B Table
        { text: "\nPart B - Long Answer Questions", style: "sectionHeader" },
        {
          table: {
            headerRows: 1,
            widths: ["10%", "10%", "40%", "10%", "10%", "10%", "10%"],
            body: [
              ["Module", "Q. No.", "Question", "CO", "PO", "BL", "Marks"],
              ...questionPaper.partB.map((q, index) => [
                q.module,
                index + 1,
                q.text,
                q.CO,
                q.PO,
                q.BL,
                q.marks,
              ]),
            ],
          },
        },
      ],
      styles: {
        header: { fontSize: 16, bold: true, alignment: "center", font: "Roboto" },
        subheader: { fontSize: 14, alignment: "center", font: "Roboto" },
        details: { fontSize: 12, alignment: "left", margin: [0, 2], font: "Roboto" },
        subjectHeader: { fontSize: 14, bold: true, alignment: "center", margin: [0, 5], font: "Roboto" },
        sectionHeader: { fontSize: 12, bold: true, margin: [0, 5, 0, 5], font: "Roboto" },
        tableHeader: { bold: true, fontSize: 10, color: "black", fillColor: "#eeeeee" },
      },
      pageMargins: [40, 40, 40, 40], // ✅ Page border and margins
    };
  
    // ✅ Generate and Download PDF with Subject Name
    pdfMake.createPdf(documentDefinition).download(`${subjectName.replace(/\s+/g, "_")}.pdf`);
  };
  
  
  

  return (
   <Box p={3}>
  {/* ✅ Centered Heading */}
  <Typography variant="h4" align="center" gutterBottom>
    Generate Question Paper
  </Typography>

  {/* ✅ Inputs - One Below the Other */}
  <Grid container spacing={2} direction="column">
    <Grid item>
      <Select
        value={selectedSubject}
        onChange={(e) => setSelectedSubject(e.target.value)}
        displayEmpty
        fullWidth
      >
        <MenuItem value="" disabled>Select Subject</MenuItem>
        {subjects.map((subject) => (
          <MenuItem key={subject._id} value={subject._id}>
            {subject.subjectName}
          </MenuItem>
        ))}
      </Select>
    </Grid>
    <Grid item>
      <TextField
        label="Max Marks"
        type="number"
        value={maxMarks}
        onChange={(e) => setMaxMarks(Number(e.target.value))}
        fullWidth
      />
    </Grid>
    <Grid item>
      <TextField
        label="2 Mark Questions"
        type="number"
        value={numPartAQuestions}
        onChange={(e) => setNumPartAQuestions(Number(e.target.value))}
        fullWidth
      />
    </Grid>
    <Grid item>
      <TextField
        label="Number of Modules"
        type="number"
        value={numModules}
        onChange={(e) => setNumModules(Number(e.target.value))}
        fullWidth
      />
    </Grid>
  </Grid>

  {/* ✅ Buttons */}
  <Box mt={3} display="flex" justifyContent="center" gap={2}>
    <Button variant="contained" color="primary" onClick={generateQuestionPaper}>
      Generate
    </Button>
    <Button variant="outlined" color="secondary" onClick={downloadPDF}>
      Download PDF
    </Button>
  </Box>

  {/* ✅ Live Preview */}
  <Preview questionPaper={questionPaper} />
</Box>

  );
};

export default QuestionPaperGenerator;
