"use strict";

// import the needed node_modules.
const express = require("express");
const morgan = require("morgan");
const { Server } = require("socket.io");

const {
  getUsers,
  getGroups,
  addGroup,
  addExpense,
  getExpenses,
  getUserGroups,
  deleteExpense,
  createUser,
} = require("./handlers");

express()
  // Below are methods that are included in express(). We chain them for convenience.
  // --------------------------------------------------------------------------------

  // This will give us will log more info to the console. see https://www.npmjs.com/package/morgan
  .use(morgan("tiny"))
  .use(express.json())

  // Any requests for static files will go into the public folder
  .use(express.static("public"))

  // Nothing to modify above this line
  // ---------------------------------

  // BreakDownApp Server endpoints
  // creates new user for the app/registration api
  // .post("/api/create-user", createUser)
  // gets information of all users to add in specific group
  .get("/api/get-users", getUsers)
  .get("/api/get-groups", getGroups)
  .get("/api/get-user-groups/:id", getUserGroups)
  .get("/api/get-expenses", getExpenses)

  //  posts new group information
  .post("/api/add-group", addGroup)
  .post("/api/add-expense", addExpense)
  .post("/api/create-user", createUser)
  .delete("/api/delete-expense", deleteExpense)
  // ---------------------------------
  // Nothing to modify below this line

  // this is our catch all endpoint.
  .get("*", (req, res) => {
    res.status(404).json({
      status: 404,
      message: "This is obviously not what you are looking for.",
    });
  })

  // Node spins up our server and sets it to listen on port 8000.
  .listen(8000, () => console.log(`Listening on port 8000`));
