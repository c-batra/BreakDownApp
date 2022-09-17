"use strict";
const { MongoClient } = require("mongodb");
// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4, v4 } = require("uuid");
require("dotenv").config();
const { MONGO_URI } = process.env;

// use this data. Changes will persist until the server (backend) restarts.

// returns all users
const getUsers = async (req, res) => {
  MongoClient.connect(MONGO_URI, async (err, client) => {
    try {
      const db = await client.db("BreakDownApp");
      const users = await db
        .collection("users")
        .find({})
        // .project({ _id: 0 })
        .toArray();
      res.status(200).json({
        status: 200,
        data: users,
      });
    } catch {
      res.status(400).json({
        status: 400,
        data: "Something went wrong.!",
      });
    }
  });
};

//create a new user
// const addReservation = async (req, res) => {
//   try {
//     const { flight, seat, givenName, surname, email } = req.body;

//     const reservation = {
//       id: uuidv4(),
//       flight,
//       seat,
//       givenName,
//       surname,
//       email,
//     };

//     MongoClient.connect(MONGO_URI, async (err, client) => {
//       const db = client.db("SlingAirDB");
//       await db.collection("reservations").insertOne(reservation);

//       const queryObj = { _id: flight };
//       const updateObj = { $set: { "seats.$[element].isAvailable": false } };
//       const filterObj = { arrayFilters: [{ "element.id": seat }] };

//       await db
//         .collection("flights")
//         .findOneAndUpdate(queryObj, updateObj, filterObj);

//       return res.status(200).json({
//         status: 200,
//         data: reservation,
//       });
//     });
//   } catch {
//     res.status(400).json({
//       status: 400,
//       message: "Wrong reservation id, not found",
//     });
//   }
// };
const createUser = async (req, res) => {
  MongoClient.connect(MONGO_URI, async (err, client) => {
    try {
      const { first_name, last_name, email } = req.body;
      const db = await client.db("BreakDownApp");
      const users = await db
        .collection("users")
        .find({})
        // .project({ _id: 0 })
        .toArray();
      res.status(200).json({
        status: 200,
        data: users,
      });
    } catch {
      res.status(400).json({
        status: 400,
        data: "Something went wrong.!",
      });
    }
  });
};

// returns all groups
const getGroups = async (req, res) => {
  MongoClient.connect(MONGO_URI, async (err, client) => {
    try {
      const db = await client.db("BreakDownApp");
      const groups = await db.collection("groups").find({}).toArray();
      res.status(200).json({
        status: 200,
        data: groups,
      });
    } catch {
      res.status(400).json({
        status: 400,
        data: "Something went wrong.!",
      });
    }
  });
};

//return loggedInUser's groups
const getUserGroups = async (req, res) => {
  MongoClient.connect(MONGO_URI, async (err, client) => {
    try {
      const db = await client.db("BreakDownApp");
      const id = req.params.id;
      const groups = await db
        .collection("groups")
        .find({
          users: { $in: [String(id)] },
        })
        .toArray();
      res.status(200).json({
        status: 200,
        data: groups,
      });
    } catch {
      res.status(400).json({
        status: 400,
        data: "Something went wrong.!",
      });
    }
  });
};

// creates a new group
const addGroup = async (req, res) => {
  const group = {
    code: uuidv4(),
    name: req["body"]["name"],
    users: req["body"]["users"],
    created_at: req["body"]["created_at"],
  };
  MongoClient.connect(MONGO_URI, async (error, client) => {
    if (error) return;
    const db = await client.db("BreakDownApp");
    const addGroup = await db.collection("groups").insertOne(group);

    res.status(200).json({
      status: 200,
      data: "Recieved",
    });
  });
};
// create a new expense

const addExpense = async (req, res) => {
  const group = {
    code: uuidv4(),
    name: req["body"]["name"],
    amount: req["body"]["amount"],
    note: req["body"]["note"],
    paid_by: req["body"]["paid_by"],
    participants: req["body"]["participants"],
    group_code: req["body"]["group_code"],
    created_at: req["body"]["created_at"],
  };
  MongoClient.connect(MONGO_URI, async (error, client) => {
    if (error) return;
    const db = await client.db("BreakDownApp");
    await db.collection("expenses").insertOne(group);

    res.status(200).json({
      status: 200,
      data: "Recieved",
    });
  });
};

//render all created expenses on the page
const getExpenses = async (req, res) => {
  MongoClient.connect(MONGO_URI, async (err, client) => {
    try {
      const db = client.db("BreakDownApp");
      const expenses = await db.collection("expenses").find({}).toArray();
      res.status(200).json({
        status: 200,
        data: expenses,
      });
    } catch {
      res.status(400).json({
        status: 400,
        data: "Something went wrong.!",
      });
    }
  });
};

// delete spcific expense
const deleteExpense = async (req, res) => {
  try {
    MongoClient.connect(MONGO_URI, async (err, client) => {
      const db = client.db("BreakDownApp");
      const dbtest = await db
        .collection("expenses")
        .deleteOne({ code: req["body"]["code"] });
      console.log("Dbtest ", dbtest);
      res.status(200).json({
        status: 200,
        data: "Recieved",
      });
    });
  } catch {
    res.status(400).json({
      status: 400,
      data: "Something went wrong.!",
    });
  }
};
module.exports = {
  getUsers,
  getGroups,
  addGroup,
  addExpense,
  getExpenses,
  getUserGroups,
  deleteExpense,
  createUser,
};
