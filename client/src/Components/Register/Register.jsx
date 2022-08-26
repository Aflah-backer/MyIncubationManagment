import axios from "axios";
import React, { useState, useEffect } from "react";
import { ToastContainer } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "./Register.css";

function Register() {
  const [cookies, removeCookie] = useCookies([]);
  const navigate = useNavigate();
  const [values, setValues] = useState({ email: "", password: "" });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/register",
        { ...values },
        {
          withCredentials: true,
        }
      );
      if (data) {
        if (data.errors) {
          const { email, password, name } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
          else if (name) generateError(name);
        } else {
          navigate("/");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/register");
      } else {
        navigate("/");
      }
    };
    verifyUser();
  }, [cookies, navigate]);

  const generateError = (err) => {
    toast.error(err, { position: "bottom-right" });
  };

  return (
    <div className="bodi">
      <div className="containers">
        <b>
          <h4>Register</h4>
        </b>
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              placeholder="Enter your Name"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Enter your Email"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              placeholder="Enter your Password"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <button className="btn btn-dark" type="submit">
            Register
          </button>
          <span>
            Already have an Account?<Link to={"/login"}> Login</Link>
          </span>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default Register;
