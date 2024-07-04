// import React, { useState } from "react";
// import toast from "react-hot-toast";
// import { Link, useNavigate } from "react-router-dom";
// import "../styles/register.css";
// export default function Register() {
//   const [userInput, setUserInput] = useState({
//     username: "",
//     email: "",
//     password: "",
//   });
//   function handleChange(e) {
//     setUserInput({ ...userInput, [e.target.name]: e.target.value });
//   }
//   const navigate = useNavigate();
//   async function handleSubmit(event) {
//     event.preventDefault();
//     if (
//       userInput.username === "" ||
//       userInput.email === "" ||
//       userInput.password === ""
//     ) {
//       return toast.error("Every input field must have a value...");
//     }
//     const callAPI = await fetch(
//       "https://evening-basin-91117-fe7ab328601f.herokuapp.com/registrationcheck",
//       {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(userInput),
//       }
//     );
//     const response = await callAPI.json();
//     if (response.message === "Email already exists") {
//       return toast.error("Email already exists");
//     }
//     if (response.error) {
//       return toast.error(response.error);
//     }
//     navigate("/verification");
//   }
//   return (
//     <div className="register-container">
//       <form method="post" onSubmit={handleSubmit}>
//         <label htmlFor="username">Username:</label>
//         <input
//           type="text"
//           id="username"
//           name="username"
//           placeholder="Name"
//           onChange={handleChange}
//         />
//         <label htmlFor="email">Email :</label>
//         <input
//           type="text"
//           id="email"
//           name="email"
//           placeholder="Email"
//           onChange={handleChange}
//         />
//         <label htmlFor="password">Password:</label>
//         <input
//           type="password"
//           id="password"
//           name="password"
//           placeholder="Password"
//           onChange={handleChange}
//         />
//         <Link to="/login">already have an account? login</Link>
//         <br></br>
//         <button type="submit">Register</button>
//       </form>
//     </div>
//   );
// }
//////////////////////////////////////////////////////////////////////////////////////

import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
import "../styles/register.css";

export default function Register() {
  const [userInput, setUserInput] = useState({
    username: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    const deleteUnverifiedUsers = async () => {
      try {
        await fetch("/delete-unverified-users", {
          method: "DELETE",
        });
      } catch (error) {
        console.error("Failed to delete unverified users:", error);
      }
    };

    deleteUnverifiedUsers();
  }, []);

  function handleChange(e) {
    setUserInput({ ...userInput, [e.target.name]: e.target.value });
  }

  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();
    if (
      userInput.username === "" ||
      userInput.email === "" ||
      userInput.password === ""
    ) {
      return toast.error("Every input field must have a value...");
    }
    const callAPI = await fetch("/registrationcheck", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userInput),
    });
    const response = await callAPI.json();
    if (response.message === "Email already exists") {
      return toast.error("Email already exists");
    }
    if (response.error) {
      return toast.error(response.error);
    }
    navigate("/verification");
  }

  return (
    <div className="register-container">
      <form method="post" onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Name"
          onChange={handleChange}
        />
        <label htmlFor="email">Email :</label>
        <input
          type="text"
          id="email"
          name="email"
          placeholder="Email"
          onChange={handleChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
        />
        <Link to="/login">already have an account? login</Link>
        <br></br>
        <button type="submit">Register</button>
      </form>
    </div>
  );
}
