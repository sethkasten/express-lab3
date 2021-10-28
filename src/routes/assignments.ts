// require the express module
import express from "express";
import { calcAverage } from "../functions";
import Assignment from "../models/Assignment";

// create a new Router object
const assignmentRouter = express.Router();

const assignments: Assignment[] = [
  {
    id: 1,
    name: "Walrus Worksheet",
    score: 9,
    total: 10,
    completed: true,
  },
  {
    id: 2,
    name: "Jellyfish Project",
    score: 15,
    total: 15,
    completed: true,
  },
  {
    id: 3,
    name: "Dolphin Quiz",
    score: 8,
    total: 10,
    completed: true,
  },
  {
    id: 4,
    name: "Oceans Unit Test",
    score: 0,
    total: 25,
    completed: false,
  },
];

let nextId: number = 5;

assignmentRouter.get("/", (req, res) => {
  let assignmentsTableArray: Assignment[] = assignments;
  let average: string = calcAverage(assignments);
  res.render("homepage", { assignmentsTableArray, average });
});

assignmentRouter.get("/add-assignment", (req, res) => {
  res.render("add-assignment");
});

assignmentRouter.post("/assignment-added", (req, res) => {
  let newAssignment: Assignment = req.body;
  let score: number = parseFloat(req.body.score as string);
  let total: number = parseFloat(req.body.total as string);
  let completed: boolean = req.body.completed === "true";
  newAssignment.id = nextId++;
  newAssignment.score = score;
  newAssignment.total = total;
  newAssignment.completed = completed;
  assignments.push(newAssignment);
  res.render("assignment-added", newAssignment);
});

assignmentRouter.get("/assignments/:id/delete-confirmation", (req, res) => {
  const id: number = parseInt(req.params.id);
  const index = assignments.findIndex((item) => item.id === id);
  const foundAssignment: Assignment = assignments[index];
  if (foundAssignment) {
    res.render("delete-confirmation", foundAssignment);
  } else {
    res.render("four-oh-four");
  }
});

assignmentRouter.get("/assignments/:id/delete", (req, res) => {
  const id: number = parseInt(req.params.id);
  const index = assignments.findIndex((item) => item.id === id);
  const foundAssignment: Assignment = assignments[index];
  assignments.splice(index, 1);
  if (foundAssignment) {
    res.render("assignment-deleted", foundAssignment);
  } else {
    res.render("four-oh-four");
  }
});

assignmentRouter.get("/assignments/:id/edit", (req, res) => {
  const id: number = parseInt(req.params.id);
  const foundAssignment: Assignment | undefined = assignments.find(
    (item) => item.id === id
  );
  if (foundAssignment) {
    foundAssignment.id = id;
    res.render("edit-assignment", foundAssignment);
  } else {
    res.render("four-oh-four");
  }
});

assignmentRouter.post("/assignments/:id/edit-confirmation", (req, res) => {
  const updatedAssignment: Assignment = req.body;
  updatedAssignment.completed = req.body.completed === "true";
  const id: number = parseInt(req.params.id);
  updatedAssignment.id = id;
  const index = assignments.findIndex((item) => item.id === id);
  assignments[index] = updatedAssignment;
  res.render("edit-confirmation", updatedAssignment);
});

assignmentRouter.get("/api/assignments", (req, res) => {
  res.status(200);
  res.json(assignments);
});

assignmentRouter.get("/api/summary", (req, res) => {
  const average = calcAverage(assignments);
  res.status(200);
  res.json({ average, assignments });
});

export default assignmentRouter;
