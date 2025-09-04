import bootstrap from "./src/bootstrap.js";
import express from "express";
import'dotenv/config';
const app=express();
bootstrap(app,express)