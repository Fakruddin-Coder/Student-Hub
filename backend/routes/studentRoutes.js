const express = require("express");

const router = express.Router();

// Student array
let students = [];

// GET all students
router.get("/", (req, res) => {
    res.json(students);
});

// ADD a student
router.post("/", (req, res) => {

    const student = {
        id: students.length + 1,
        name: req.body.name,
        email: req.body.email,
        course: req.body.course,
        year: req.body.year
    };

    students.push(student);

    res.status(201).json({
        message: "Student added successfully",
        student: student
    });
});

// UPDATE a student
router.put("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const student = students.find(student => student.id === id);

    if (!student) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    student.name = req.body.name;
    student.email = req.body.email;
    student.course = req.body.course;
    student.year = req.body.year;

    res.json({
        message: "Student updated successfully",
        student: student
    });
});

// DELETE a student
router.delete("/:id", (req, res) => {

    const id = parseInt(req.params.id);

    const studentIndex = students.findIndex(student => student.id === id);

    if (studentIndex === -1) {
        return res.status(404).json({
            message: "Student not found"
        });
    }

    const deletedStudent = students.splice(studentIndex, 1);

    res.json({
        message: "Student deleted successfully",
        student: deletedStudent[0]
    });
});

module.exports = router;