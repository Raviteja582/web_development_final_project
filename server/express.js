import express from "express";
import path from "path";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compress from "compression";
import cors from "cors";
import helmet from "helmet";
import Template from "./../template";
import userRoutes from "./routes/user.routes";
import authRoutes from "./routes/auth.routes";
import expenseRoutes from "./routes/expense.routes";
import goalsRoutes from "./routes/goals.routes";
import contactRoutes from "./routes/contact.routes";

// modules for server side rendering
import React from "react";
import ReactDOMServer from "react-dom/server";
import MainRouter from "./../client/MainRouter";
import { StaticRouter } from "react-router-dom";

import { ServerStyleSheets, ThemeProvider } from "@material-ui/styles";
import theme from "./../client/theme";

import jwt from "jsonwebtoken";
//end

//comment out before building for production
import devBundle from "./devBundle";
import config from "./../config/config";

const CURRENT_WORKING_DIR = process.cwd();
const app = express();

devBundle.compile(app);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

app.use(compress());
app.use(helmet());
app.use(cors());

app.use("/dist", express.static(path.join(CURRENT_WORKING_DIR, "dist")));

app.use("/", userRoutes);
app.use("/", authRoutes);
app.use("/", expenseRoutes);
app.use("/", goalsRoutes);
app.use("/", contactRoutes);

app.get("*", (req, res) => {
  const sheets = new ServerStyleSheets();
  const context = {};
  const markup = ReactDOMServer.renderToString(
    sheets.collect(
      <StaticRouter location={req.url} context={context}>
        <ThemeProvider theme={theme}>
          <MainRouter />
        </ThemeProvider>
      </StaticRouter>
    )
  );
  const css = sheets.toString();

  const jwtToken = req.cookies.t;
  const decoded = jwtToken ? jwt.verify(jwtToken, config.jwtSecret) : {};
  if (!decoded._id) {
    if (!context.url)
      return res.status(200).send(
        Template({
          markup: markup,
          css: css,
        })
      );
    return res.redirect(303, context.url);
  }
  res.status(200).send(
    Template({
      markup: markup,
      css: css,
    })
  );
});

// Catch unauthorised errors
app.use((err, req, res, next) => {
  if (err.name === "UnauthorizedError") {
    res.status(401).json({ error: err.name + ": " + err.message });
  } else if (err) {
    res.status(400).json({ error: err.name + ": " + err.message });
    console.log(err);
  }
});

export default app;
