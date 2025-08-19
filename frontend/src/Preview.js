import React from "react";
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Typography } from "@mui/material";

const Preview = ({ questionPaper }) => {
  if (!questionPaper.partA.length && !questionPaper.partB.length) return null;

  return (
    <Box mt={3}>
      {/* Part A Preview */}
      <Typography variant="h6">Part A - 2 Marks Questions</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Q. No.</TableCell>
              <TableCell>Question</TableCell>
              <TableCell>CO</TableCell>
              <TableCell>PO</TableCell>
              <TableCell>BL</TableCell>
              <TableCell>Marks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questionPaper.partA.map((q, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{q.text}</TableCell>
                <TableCell>{q.CO}</TableCell>
                <TableCell>{q.PO}</TableCell>
                <TableCell>{q.BL}</TableCell>
                <TableCell>{q.marks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Part B Preview */}
      <Typography variant="h6" mt={3}>Part B - Long Answer Questions</Typography>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Module</TableCell>
              <TableCell>Q. No.</TableCell>
              <TableCell>Question</TableCell>
              <TableCell>CO</TableCell>
              <TableCell>PO</TableCell>
              <TableCell>BL</TableCell>
              <TableCell>Marks</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {questionPaper.partB.map((q, index) => (
              <TableRow key={index}>
                <TableCell>{q.module}</TableCell>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{q.text}</TableCell>
                <TableCell>{q.CO}</TableCell>
                <TableCell>{q.PO}</TableCell>
                <TableCell>{q.BL}</TableCell>
                <TableCell>{q.marks}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default Preview;
