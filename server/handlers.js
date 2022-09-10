"use strict";
const { MongoClient } = require("mongodb");
// use this package to generate unique ids: https://www.npmjs.com/package/uuid
const { v4: uuidv4, v4 } = require("uuid");
require("dotenv").config();
const { MONGO_URI } = process.env;

// use this data. Changes will persist until the server (backend) restarts.

// returns a list of all users
const getUsers = async (req, res) => {
  MongoClient.connect(MONGO_URI, async (err, client) => {
    try {
      const db = client.db("BreakDownApp");
      const users = await db
        .collection("users")
        .find({})
        //.project({ _id: 0 })
        .toArray();
      console.log(users);
      const result = users?.map((user) => Object.keys(user)[0]);
      res.status(200).json({
        status: 200,
        data: users,
      });
    } catch {
      res.status(400).json({
        status: 400,
        data: "Wrong flight id, not found",
      });
    }
  });
};

// // creates a new user for the app
// const createUser = async (req, res) => {
// //use admin
// db.getSiblingDB("admin")
// try {
// db.createUser({
// "user":"admin",
// "pwd":"paddowrd",
// "roles":[{"role":"root", "db":"admin"}]
// });
// }
// catch (err) {
// print ("Admin user already created");
// db.auth("admin","paddowrd");
// }

// // returns all the seats on a specified flight
// const getFlight = async (req, res) => {
//   MongoClient.connect(MONGO_URI, async (error, client) => {
//     if (error) return;
//     const db = client.db("SlingAirDB");
//     const flight = await db
//       .collection("flights")
//       .findOne(
//         { [req.params.flight]: { $exists: true } },
//         { projection: { _id: 0 } }
//       );
//     if (flight) {
//       res.status(200).json({
//         status: 200,
//         data: flight,
//       });
//     } else {
//       res.status(400).json({
//         status: 400,
//         message: "Wrong flight id, not found",
//       });
//     }
//   });
// };

// // returns all reservations
// const getReservations = async (req, res) => {
//   MongoClient.connect(MONGO_URI, async (error, client) => {
//     if (error) return;
//     const db = client.db("SlingAirDB");
//     const reservations = await db.collection("reservations").find().toArray();
//     res.status(200).json({
//       status: 200,
//       data: reservations,
//     });
//   });
// };

// // returns a single reservation
// const getSingleReservation = async (req, res) => {
//   MongoClient.connect(MONGO_URI, async (error, client) => {
//     if (error) return;
//     const db = client.db("SlingAirDB");
//     const reservation = await db
//       .collection("reservations")
//       .findOne({ id: req.params.reservation.toString() });
//     if (reservation) {
//       res.status(200).json({
//         status: 200,
//         data: reservation,
//       });
//     } else {
//       res.status(400).json({
//         status: 400,
//         message: "Wrong reservation id, not found",
//       });
//     }
//   });
// };

// creates a new reservation
const addGroup = async (req, res) => {
  const group = {
    id: uuidv4(),
    name: req["body"]["name"],
    users: req["body"]["users"],
  };
  console.log("Group ", group);
  MongoClient.connect(MONGO_URI, async (error, client) => {
    if (error) return;
    console.log("IN here ");
    const db = client.db("BreakDownApp");
    const addGroup = await db.collection("groups").insertOne(group);
    // const flight = await db
    //   .collection("flights")
    //   .findOne(
    //     { [req["body"]["flight"]]: { $exists: true } },
    //     { projection: { _id: 0 } }
    //   );
    res.status(200).json({
      status: 200,
      data: "Recieved",
    });
  });
};

// // updates an existing reservation
// const updateReservation = async (req, res) => {
//   MongoClient.connect(MONGO_URI, async (error, client) => {
//     if (error) return;
//     const db = client.db("SlingAirDB");
//     const specificReservation = await db
//       .collection("reservations")
//       .updateOne(
//         { id: req.body.id },
//         { $set: { [req.body.field]: req.body.value } }
//       );
//     res.status(200).json({
//       status: 200,
//       data: specificReservation,
//     });
//   });
// };

// // deletes a specified reservation
// const deleteReservation = async (req, res) => {
//   MongoClient.connect(MONGO_URI, async (error, client) => {
//     if (error) return;
//     const db = client.db("SlingAirDB");

//     const specificReservation = await db
//       .collection("reservations")
//       .deleteOne({ id: req.params.reservation });
//     res.status(200).json({
//       status: 200,
//       message: specificReservation,
//     });
//   });
// };

module.exports = {
  getUsers,
  addGroup,
};
