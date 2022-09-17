import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const GroupExpenses = () => {
  const [allUsers, setAllUsers] = useState([]);
  const [allGroups, setAllGroups] = useState([]);
  const [toAddExpense, setToAddExpense] = useState(false);
  const [expenseName, setExpenseName] = useState("");
  const [expenseAmount, setExpenseAmount] = useState(0);
  const [expenseNote, setExpenseNote] = useState("");
  const [groupExpenses, setGroupExpenses] = useState([]);
  const [expenseCounter, setExpenseCounter] = useState(0);

  const [toShowBalance, setToShowBalances] = useState(false);
  const [userPaid, setUserPaid] = useState(0);
  const [participantPaid, setParticipantPaid] = useState(0);
  const [balanceType, setBalanceType] = useState();

  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // TODO : In future -> Sagas calling api
    fetch("/api/get-users/")
      .then((res) => res.json())
      .then((json) => {
        setAllUsers(json.data);
      });
    fetch("/api/get-groups/")
      .then((res) => res.json())
      .then((json) => {
        setAllGroups(json.data);
      });
    fetch("/api/get-expenses/")
      .then((res) => res.json())
      .then((json) => {
        setGroupExpenses(json.data);
      });
  }, [expenseCounter]);

  const changeExpenseName = (e) => {
    setExpenseName(e.target.value);
  };

  const changeExpenseAmount = (e) => {
    setExpenseAmount(e.target.value);
  };

  const changeExpenseNote = (e) => {
    setExpenseNote(e.target.value);
  };

  const toggleAddExpense = () => {
    setToAddExpense(!toAddExpense);
  };
  const showBalances = () => {
    const userPaidExpenses = groupExpenses.filter(
      (element) => element.paid_by == location.state.userId
    );
    const participantPaidExpenses = groupExpenses.filter(
      (element) => element.paid_by != location.state.userId
    );
    const userPaidAmounts = userPaidExpenses.map((element) =>
      parseInt(element.amount)
    );
    const participantPaidAmounts = participantPaidExpenses.map((element) =>
      parseInt(element.amount)
    );

    const userContri =
      userPaidAmounts.reduce(function (a, b) {
        return a + b;
      }, 0) / 2;

    const participantContri =
      participantPaidAmounts.reduce(function (a, b) {
        return a + b;
      }, 0) / 2;

    if (userContri > participantContri) {
      setBalanceType("user");
    } else {
      setBalanceType("participant");
    }
    setUserPaid(userContri);
    setParticipantPaid(participantContri);
    setToShowBalances(!toShowBalance);
  };
  const submitExpense = () => {
    //Get Account user
    const accountUser = allUsers.filter(
      (element) => element.email == location.state.email
    );
    const accountGroup = allGroups.filter(
      (element) => element.code == location.state.code
    );
    if (accountUser.length == 0 || accountGroup.length == 0) {
      alert("Something went wrong");
      return;
    }
    const body = {
      name: expenseName,
      amount: expenseAmount,
      note: expenseNote,
      paid_by: accountUser[0]._id,
      //TODO : In future
      participants: accountGroup[0].users,
      group_code: location.state.code,
      created_at: new Date(),
    };
    fetch("/api/add-expense", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((json) => {
        setExpenseCounter(expenseCounter + 1);
      })
      .catch((err) => console.log(err));
  };
  const toDeleteExpense = (code) => {
    const body = {
      code: code,
    };
    fetch("/api/delete-expense", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((json) => {
        setExpenseCounter(expenseCounter - 1);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <button
          style={{
            backgroundColor: "blue",
            height: "40px",
            width: "200px",
            color: "white",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: 700,
            fontSize: 16,
            marginTop: 15,
          }}
          onClick={() => toggleAddExpense()}
        >
          {toAddExpense ? "Hide Expense" : "Add Expense"}
        </button>
        <button
          style={{
            backgroundColor: "blue",
            height: "40px",
            width: "200px",
            color: "white",
            borderRadius: "8px",
            cursor: "pointer",
            fontWeight: 700,
            fontSize: 16,
            marginTop: 5,
          }}
          onClick={() => showBalances()}
        >
          {toShowBalance ? "Hide Balances" : "Show Balances"}
        </button>
      </div>
      {toShowBalance ? (
        <div>
          {balanceType == "user" ? (
            <span>
              `${location.state.userName}` accounts for `$
              {userPaid - participantPaid}`
            </span>
          ) : (
            <span>
              {location.state.userName}` owes `${participantPaid - userPaid}`
            </span>
          )}
        </div>
      ) : null}
      {toAddExpense ? (
        <div
          style={{ marginTop: "5px", display: "flex", flexDirection: "column" }}
        >
          <label>Expense Name:</label>
          <input
            type="text"
            value={expenseName}
            onChange={(e) => changeExpenseName(e)}
          />
          <label>Expense Amount:</label>
          <input
            type="text"
            value={expenseAmount}
            onChange={(e) => changeExpenseAmount(e)}
          />
          <label>Note/Message:</label>
          <input
            type="text"
            value={expenseNote}
            onChange={(e) => changeExpenseNote(e)}
          />
          <button
            style={{ backgroundColor: "blue", color: "white" }}
            onClick={(e) => submitExpense()}
          >
            Submit Expense
          </button>
        </div>
      ) : null}
      <div style={{ marginTop: "20px" }}>
        <table>
          <th> Expense Name </th>
          <th> Expense Amount </th>
          <th> Expense Description </th>
          <th> Paid by: </th>
          <th> Delete </th>
          {groupExpenses?.map((element) =>
            element.group_code == location.state.code ? (
              <tr style={{ margin: "5px", backgroundColor: "#D3D3D3" }}>
                <td
                  style={{
                    border: "ridge",
                    display: "flex",
                    flexDirection: "column",
                    width: 150,
                    borderColor: "gray",
                    borderWidth: 5,
                  }}
                >
                  <span style={{ margin: "5px" }}>{element.name}</span>
                </td>
                <td
                  style={{
                    border: "ridge",
                    borderColor: "gray",
                    borderWidth: 5,
                    width: 150,
                  }}
                >
                  <span style={{ margin: "5px" }}>{element.amount}</span>
                </td>
                <td
                  style={{
                    border: "ridge",
                    borderColor: "gray",
                    borderWidth: 5,
                    width: 150,
                  }}
                >
                  <span style={{ margin: "5px" }}>{element.note}</span>
                </td>
                <td
                  style={{
                    border: "ridge",
                    borderColor: "gray",
                    borderWidth: 5,
                    width: 150,
                  }}
                >
                  <span style={{ margin: "5px" }}>
                    {
                      allUsers.filter((usr) => usr._id == element.paid_by)?.[0]
                        ?.first_name
                    }
                  </span>
                </td>
                <td
                  style={{
                    border: "ridge",
                    borderColor: "gray",
                    borderWidth: 5,
                  }}
                >
                  <button
                    onClick={() => toDeleteExpense(element.code)}
                    style={{
                      color: "white",
                      backgroundColor: "black",
                      cursor: "pointer",
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ) : null
          )}
        </table>
        {/* <button onClick={() => showBalances()}>Show Balances</button>
        {userPaid > participantPaid ? (
          <span>
            {" "}
            `${location.state.userName}` " account for " `$
            {userPaid - participantPaid}`
          </span>
        ) : (
          <span>
            {" "}
            `${location.state.userName}` " owes " `$
            {participantPaid - userPaid}`
          </span>
        )} */}
      </div>
    </div>
  );
};

export default GroupExpenses;
