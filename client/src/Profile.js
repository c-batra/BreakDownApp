import React, { useEffect, useState } from "react";
import { createPath, useLocation } from "react-router-dom";

require("dotenv").config();
const { ExtKey, ExtHost } = process.env;

const Profile = () => {
  const [allGroups, setAllGroups] = useState([]);
  const [expenses, setExpenses] = useState([]);
  const [allUsers, setAllUsers] = useState([]);
  const [convertCurrencyAmount, setConvertCurrencyAmount] = useState(0);
  const [resultConvert, setResultConvert] = useState(0);
  const [showConversion, setShowConversion] = useState(false);
  const location = useLocation();

  const onChangeCurrencyAmount = (e) => {
    setConvertCurrencyAmount(e.target.value);
  };
  const convertCurrency = () => {
    const myHeaders = new Headers();
    myHeaders.append("apikey", "0GWPCTcdFci5UQJOIMWubVrSbXXju32O");

    const requestOptions = {
      method: "GET",
      redirect: "follow",
      headers: myHeaders,
    };

    fetch(
      "https://api.apilayer.com/fixer/convert?to=USD&from=CAD&amount=" +
        convertCurrencyAmount,
      requestOptions
    )
      .then((response) => response.text())
      .then((result) => {
        setResultConvert(JSON.parse(result).result);
        setShowConversion(!showConversion);
      });
  };

  useEffect(() => {
    const options = {
      method: "GET",
      headers: {
        "X-RapidAPI-Key": ExtKey,
        "X-RapidAPI-Host": ExtHost,
      },
    };

    fetch("/api/get-groups/")
      .then((res) => res.json())
      .then((json) => {
        setAllGroups(json.data);
      });
    fetch("/api/get-expenses/")
      .then((res) => res.json())
      .then((json) => {
        setExpenses(json.data);
      });
    fetch("/api/get-users/")
      .then((res) => res.json())
      .then((json) => {
        setAllUsers(json.data);
      });
  });
  // console.log("Currency", currencyInfo);
  return (
    <div>
      <span
        style={{
          fontFamily: "cursive",
          fontSize: 18,
          marginTop: 15,
          marginBottom: 10,
          marginRight: 400,
        }}
      >
        First Name :
        {allUsers
          ?.filter((element) => element._id == location.state.userId)
          .map((element) => (
            <span
              style={{
                fontFamily: "cursive",
                fontSize: 18,
                marginTop: 15,
                marginBottom: 10,
                marginRight: 400,
              }}
            >
              {element.first_name}
            </span>
          ))}
      </span>
      <br />
      <span
        style={{
          fontFamily: "cursive",
          fontSize: 18,
          marginTop: 15,
          marginBottom: 10,
          marginRight: 400,
        }}
      >
        Last Name :
        {allUsers
          ?.filter((element) => element._id == location.state.userId)
          .map((element) => (
            <span
              style={{
                fontFamily: "cursive",
                fontSize: 18,
                marginTop: 15,
                marginBottom: 10,
                marginRight: 400,
              }}
            >
              {element.last_name}
            </span>
          ))}
      </span>
      <br />
      <span
        style={{
          fontFamily: "cursive",
          fontSize: 18,
          marginTop: 15,
          marginBottom: 10,
          marginRight: 400,
        }}
      >
        Email :
        {allUsers
          ?.filter((element) => element._id == location.state.userId)
          .map((element) => (
            <span
              style={{
                fontFamily: "cursive",
                fontSize: 18,
                marginTop: 15,
                marginBottom: 10,
                marginRight: 400,
              }}
            >
              {element.email}
            </span>
          ))}
      </span>
      <br />
      <table
        style={{
          marginLeft: 200,
        }}
      >
        <tr>
          <th
            style={{
              width: 150,
              border: "solid",
              fontWeight: 800,
              color: "white",
            }}
          >
            Group
          </th>
          <th
            style={{
              width: 150,
              border: "solid",
              fontWeight: 800,
              color: "white",
            }}
          >
            Spent
          </th>
          <th
            style={{
              width: 150,
              border: "solid",
              fontWeight: 800,
              color: "white",
            }}
          >
            Owed
          </th>
        </tr>
        {allGroups?.map((element) =>
          element.users.includes(location.state.userId) ? (
            <tr>
              <td style={{ width: 150, border: "ridge", fontWeight: 600 }}>
                {element.name}
              </td>
              <td
                style={{
                  width: 150,
                  border: "ridge",
                  fontWeight: 600,
                  color: "#AFE1AF",
                  textAlign: "center",
                }}
              >
                {expenses
                  .filter(
                    (grp) =>
                      grp.group_code == element.code &&
                      grp.paid_by == location.state.userId
                  )
                  .map((mapped) => parseInt(mapped.amount))
                  .reduce(function (a, b) {
                    return a + b;
                  }, 0)}
              </td>
              <td
                style={{
                  width: 150,
                  border: "ridge",
                  fontWeight: 600,
                  color: "#F67280",
                  textAlign: "center",
                }}
              >
                {expenses
                  ?.filter(
                    (grp) =>
                      grp.group_code == element.code &&
                      grp.paid_by != location.state.userId
                  )
                  .map((mapped) => parseInt(mapped.amount))
                  .reduce(function (a, b) {
                    return a + b;
                  }, 0)}
              </td>
            </tr>
          ) : null
        )}
      </table>
      <span style={{ marginTop: 30 }}> Want to convert CAD to USD ?</span>
      <input
        type="text"
        value={convertCurrencyAmount}
        onChange={(e) => onChangeCurrencyAmount(e)}
        style={{ width: 50, marginTop: 30, marginLeft: 10 }}
      />
      <button
        onClick={() => convertCurrency()}
        style={{
          backgroundColor: "blue",
          color: "white",
          width: 150,
          marginLeft: 5,
          padding: 5,
          cursor: "pointer",
          fontWeight: 600,
          borderRadius: 7,
        }}
      >
        {" "}
        Convert Currency{" "}
      </button>
      <br />
      <span
        style={{
          marginLeft: "210px",
          color: "black",
        }}
      >
        {showConversion ? resultConvert : null}
      </span>
    </div>
  );
};
export default Profile;
