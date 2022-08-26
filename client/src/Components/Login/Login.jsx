import './Login.css'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useContext } from 'react'
import { useCookies } from 'react-cookie'
import { AuthContext } from '../../Store/TokenContext'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { ToastContainer, toast } from 'react-toastify'

function Login() {

    const { setUserdata } = useContext(AuthContext)
    const [cookies] = useCookies([])
    const navigate = useNavigate()

    useEffect(() => {
        const verifyUser = async () => {
            console.log(cookies.jwt);
            if (!cookies.jwt) {
                navigate('/login')
            } else {
                navigate('/')
            }
        }
        verifyUser()
    }, [cookies, navigate])

    const [values, setValues] = useState({
        email: "",
        password: "",
    });
    const generateError = (err) =>
        toast.error(err, {
            position: "bottom-center",
        });
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const { data } = await axios.post(
                "http://localhost:4000/login",
                {
                    ...values,
                },
                {
                    withCredentials: true,
                }
            );
            if (data) {
                setUserdata(data.data);

                if (data.errors) {
                    const { email, password } = data.errors;
                    if (email) generateError(email);
                    else if (password) generateError(password);
                } else {
                    navigate("/");
                }
            }
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="bodi">
            <div className="containers md-4 card-shadow">
                <h5><b> Login Account</b></h5>
                <form className="form" onSubmit={(e) => handleSubmit(e)}>
                    <div className="div">
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
                    <button className='btn btn-dark' type="submit">Submit</button>
                    <span>
                        Already have an account? <Link to="/register">Register</Link>
                    </span>
                    
                </form>
                
                <ToastContainer />
            </div>
        </div>
    )
}

export default Login




{/* <div>
      <div className="lContainer">
        <section className="vh-100 gradient-custom">
          <div className="container py-5 h-100">
            <div className="row d-flex justify-content-center align-items-center h-100">
              <div className="col-12 col-md-8 col-lg-6 col-xl-5">
                <div
                  className="card bg-dark text-white"
                  style={{ borderRadius: "1rem" }}
                >
                  <div className="card-body p-5 text-center">
                    <div className="mb-md-5 mt-md-4 pb-5">
                      <h2 className="fw-bold mb-2 text-uppercase">Admin</h2>
                      <p className="text-white-50 mb-5">
                        Please enter your login and password!
                      </p>

                      <div className="form-outline form-white mb-4">
                        <input
                          type="text"
                          placeholder="Email Address"
                          id="email"
                          onChange={handleChange}
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" for="typeEmailX">
                          Email
                        </label>
                      </div>

                      <div className="form-outline form-white mb-4">
                        <input
                          type="password"
                          placeholder="Password"
                          id="password"
                          onChange={handleChange}
                          className="form-control form-control-lg"
                        />
                        <label className="form-label" for="typePasswordX">
                          Password
                        </label>
                      </div>
                      <button className="btn btn-outline-light btn-lg px-5" onClick={handleClick}>
                        Login
                      </button>
                    </div>
                    {/* {error && <span style={{color:"red"}}>{error.message}</span>} */}
    //               </div>
    //             </div>
    //           </div>
    //         </div>
    //       </div>
    //     </section>
    //   </div>
    // </div> */}