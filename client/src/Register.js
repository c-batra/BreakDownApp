// import React from "react";
// import { useState } from "react";

// const Register = () => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [register, setRegister] = useState(false);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     alert("Submited");
//   };

//   return (
//     <div>
//       <label>First Name</label>
//       <input
//       type="text"
//         name="first_name"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Enter email"></input>
//       <label>Email address</label>
//       <input
//         type="email"
//         name="email"
//         value={email}
//         onChange={(e) => setEmail(e.target.value)}
//         placeholder="Enter email"
//       ></input>
//       <label>Password</label>
//       <input
//         type="password"
//         name="password"
//         value={password}
//         onChange={(e) => setPassword(e.target.value)}
//         placeholder="Password"
//       ></input>
//       <button type="submit" onClick={(e) => handleSubmit(e)}>
//         Register
//       </button>
//     </div>
//   );
// };

// export default Register;
