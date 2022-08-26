//import './Login.css'
import React from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { useEffect, useState } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function Login() {
  const [cookies, setCookie, removeCookie] = useCookies([]);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAdmin = async () => {
      if (!cookies.jwt) {
        navigate("/adminlogin");
      } else {
        navigate("/admin");
      }
    };
    verifyAdmin();
  }, [cookies, navigate]);

  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const generateError = (err) =>
    toast.error(err, {
      position: "bottom-right",
    });
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios.post(
        "http://localhost:4000/admin/login",
        {
          ...values,
        },
        {
          withCredentials: true,
        }
      );
      if (data) {
        console.log(data);
        if (data.errors) {
          console.log("data");
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          navigate("/admin");
        }
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bodi">
      <div className="containers md-4">
        <h5>
          {" "}
          <b>Admin Login</b>{" "}
        </h5>
        <form className="form" onSubmit={(e) => handleSubmit(e)}>
          <div>
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              placeholder="Email"
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
              placeholder="Password"
              onChange={(e) =>
                setValues({ ...values, [e.target.name]: e.target.value })
              }
            />
          </div>
          <button className="btn btn-dark" type="submit">
            Submit
          </button>
        </form>
        <ToastContainer />
      </div>
    </div>
  );
}

export default Login;
