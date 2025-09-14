import express from "express";
import employeeRoutes from "./api/employees.js";

const app = express();

// body parsing
app.use(express.json());

// Root route must match EXACT string in spec:
app.get("/", (req, res) => {
  res.send("Welcome to the Fullstack Employees API.");
});

// Mount employees routes on /employees (plural)
app.use("/employees", employeeRoutes);

export default app;
