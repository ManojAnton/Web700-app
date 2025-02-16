/*********************************************************************************
*  WEB700 – Assignment 03
*  I declare that this assignment is my own work in accordance with Seneca  Academic Policy.  No part 
*  of this assignment has been copied manually or electronically from any other source 
*  (including 3rd party web sites) or distributed to other students.
* 
*  Name: Manoj Anton Manorathan Student ID: 146165238 Date: 2/16/2025
*
********************************************************************************/ 


const express = require("express");
const path = require("path");
const collegeData = require("./modules/collegeData.js");

const app = express();
const HTTP_PORT = process.env.PORT || 8080;

collegeData.initialize()
    .then(() => {
        app.listen(HTTP_PORT, () => console.log(`Server listening on http://localhost:${HTTP_PORT}`));
    })
    .catch(err => {
        console.log(`Failed to initialize: ${err}`);
    });

// Serve home page
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "home.html"));
});

// Serve about page
app.get("/about", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "about.html"));
});

// Serve HTML demo page
app.get("/htmlDemo", (req, res) => {
    res.sendFile(path.join(__dirname, "views", "htmlDemo.html"));
});

// Get all students or students by course (PRETTY PRINTED JSON)
app.get("/students", (req, res) => {
    if (req.query.course) {
        collegeData.getStudentsByCourse(req.query.course)
            .then(data => {
                res.setHeader("Content-Type", "application/json");
                res.send(JSON.stringify(data, null, 4)); // Pretty print
            })
            .catch(() => res.json({ message: "no results" }));
    } else {
        collegeData.getAllStudents()
            .then(data => {
                res.setHeader("Content-Type", "application/json");
                res.send(JSON.stringify(data, null, 4)); // Pretty print
            })
            .catch(() => res.json({ message: "no results" }));
    }
});

// Get all TAs (PRETTY PRINTED JSON)
app.get("/tas", (req, res) => {
    collegeData.getTAs()
        .then(data => {
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify(data, null, 4)); // Pretty print
        })
        .catch(() => res.json({ message: "no results" }));
});

// Get all courses (PRETTY PRINTED JSON)
app.get("/courses", (req, res) => {
    collegeData.getCourses()
        .then(data => {
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify(data, null, 4)); // Pretty print
        })
        .catch(() => res.json({ message: "no results" }));
});

// Get a student by student number (PRETTY PRINTED JSON)
app.get("/student/:num", (req, res) => {
    collegeData.getStudentByNum(req.params.num)
        .then(data => {
            res.setHeader("Content-Type", "application/json");
            res.send(JSON.stringify(data, null, 4)); // Pretty print
        })
        .catch(() => res.json({ message: "no results" }));
});

// Handle 404 (Page Not Found)
app.use((req, res) => {
    res.status(404).send("Page Not Found");
});
