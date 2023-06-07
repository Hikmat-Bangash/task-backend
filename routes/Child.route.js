import express from "express";
import {  getchildData } from "../controller/Child.controller.js";

const childRoute = express.Router();

childRoute.get("/:id", getchildData);

export default childRoute;
