const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const multer = require("multer");
const path = require("path");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads")); // Serve uploaded files

// MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error(err));

// Define Schema & Model
const SubjectSchema = new mongoose.Schema({
  subjectName: String,
  subjectCode: String,
  credit: Number,
  syllabusPath: String, // Store file path
});

const Subject = mongoose.model("Subject", SubjectSchema);

// Multer Storage Configuration
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage });

// ✅ API to Add Subject
app.post("/add-subject", upload.single("syllabus"), async (req, res) => {
  try {
    const { subjectName, subjectCode, credit } = req.body;

    if (!subjectName || !subjectCode || !credit) {
      return res.status(400).json({ message: "❌ All fields are required!" });
    }

    const existingSubject = await Subject.findOne({ subjectCode });
    if (existingSubject) {
      return res.status(400).json({ message: "❌ Subject already exists!" });
    }

    const syllabusPath = req.file ? req.file.path : "";

    const newSubject = new Subject({ subjectName, subjectCode, credit, syllabusPath });
    await newSubject.save();

    res.status(201).json({ message: "✅ Subject added successfully!", newSubject });
  } catch (error) {
    console.error("❌ Error adding subject:", error);
    res.status(500).json({ message: "❌ Internal Server Error", error: error.message });
  }
});

// ✅ API to Delete Subject
app.delete("/delete-subject/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedSubject = await Subject.findByIdAndDelete(id);

    if (!deletedSubject) {
      return res.status(404).json({ message: "❌ Subject not found!" });
    }

    res.json({ message: "✅ Subject deleted successfully!" });
  } catch (error) {
    console.error("❌ Error deleting subject:", error);
    res.status(500).json({ message: "❌ Internal Server Error" });
  }
});

// ✅ API to Fetch All Subjects
app.get("/subjects", async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.json(subjects);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ API to Update Subject
app.put("/update-subject/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { subjectName, subjectCode, credit } = req.body;

    if (!subjectName || !subjectCode || !credit) {
      return res.status(400).json({ message: "❌ All fields are required!" });
    }

    const updatedSubject = await Subject.findByIdAndUpdate(
      id,
      { subjectName, subjectCode, credit },
      { new: true }
    );

    if (!updatedSubject) {
      return res.status(404).json({ message: "❌ Subject not found!" });
    }

    res.json({ message: "✅ Subject updated successfully!", updatedSubject });
  } catch (error) {
    console.error("❌ Error updating subject:", error);
    res.status(500).json({ message: "❌ Internal Server Error" });
  }
});

const QuestionSchema = new mongoose.Schema({
  subject: { type: mongoose.Schema.Types.ObjectId, ref: "Subject", required: true },
  module: { type: Number, required: true },
  text: { type: String, required: true },
  marks: { type: Number, required: true },
  CO: { type: String, required: true },
  PO: { type: String, required: true },
  BL: { type: String, required: true },
  part: { type: String, enum: ["A", "B"], required: true },
});

const Question = mongoose.model("Question", QuestionSchema);

// ✅ API to Add Question
app.post("/api/questions/add", async (req, res) => {
  try {
    const { subject, module, text, marks, CO, PO, BL, part } = req.body;

    if (!subject || !module || !text || !marks || !CO || !PO || !BL || !part) {
      return res.status(400).json({ message: "❌ All fields are required!" });
    }

    const newQuestion = new Question({ subject, module, text, marks, CO, PO, BL, part });
    await newQuestion.save();

    res.status(201).json({ message: "✅ Question added successfully!", newQuestion });
  } catch (error) {
    console.error("❌ Error adding question:", error);
    res.status(500).json({ message: "❌ Internal Server Error", error: error.message });
  }
});

// ✅ API to Fetch Questions
app.get("/api/questions", async (req, res) => {
  try {
    const questions = await Question.find().populate("subject", "subjectName");
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// ✅ API to Delete a Question
app.delete("/api/questions/delete/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deletedQuestion = await Question.findByIdAndDelete(id);

    if (!deletedQuestion) {
      return res.status(404).json({ message: "❌ Question not found!" });
    }

    res.json({ message: "✅ Question deleted successfully!" });
  } catch (error) {
    console.error("❌ Error deleting question:", error);
    res.status(500).json({ message: "❌ Internal Server Error" });
  }
});

// ✅ API to Update a Question
app.put("/api/questions/update/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const updatedQuestion = await Question.findByIdAndUpdate(id, req.body, { new: true });

    if (!updatedQuestion) {
      return res.status(404).json({ message: "❌ Question not found!" });
    }

    res.json({ message: "✅ Question updated successfully!", updatedQuestion });
  } catch (error) {
    console.error("❌ Error updating question:", error);
    res.status(500).json({ message: "❌ Internal Server Error" });
  }
});

app.get("/questions/:subjectId", async (req, res) => {
  try {
    const questions = await Question.find({ subject: req.params.subjectId });
    res.json({ questions });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// ✅ Fix Server Start Code
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`✅ Server running on port ${PORT}`));
