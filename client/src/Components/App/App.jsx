import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import { ToastContainer, toast } from "react-toastify";
import { Form } from "react-bootstrap";
import { Grid, TextField, createTheme, FormLabel, Button } from "@mui/material";
import axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [team, setTeam] = useState("");
  const [product, setProduct] = useState("");
  const [problem, setProblem] = useState("");
  const [solution, setSolution] = useState("");
  const [proposition, setProposition] = useState("");
  const [competators, setCompetators] = useState("");
  const [revenue, setRevenue] = useState("");
  const [market, setMarket] = useState("");
  const [plan, setPlan] = useState("");
  const [proposal, setProposal] = useState("");
  const [type, setType] = useState("");
  const [confirmation, setConfimration] = useState("");
  const [error, setError] = useState("");

  const theme = createTheme({
    status: {
      danger: "#e53e3e",
    },
    palette: {
      primary: {
        main: "#0971f1",
        darker: "#053e85",
      },
      neutral: {
        main: "#ffffff",
        contrastText: "#fff",
      },
    },
  });

  const navigate = useNavigate();
  const [cookie, setCookie, removeCookie] = useCookies([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const userId = cookie.jwt;
    try {
      const data = {
        name,
        email,
        address,
        city,
        state,
        phoneNo,
        companyName,
        team,
        product,
        problem,
        solution,
        proposition,
        competators,
        revenue,
        market,
        plan,
        type,
        proposal,
        userId,
      };

      const application = await axios.post(
        "http://localhost:4000/userApplication",
        data
      );
      if (application.data.errors) {
        const errorApp = application.data.errors.application;
        toast(errorApp, { theme: "dark" });
      } else {
        navigate("/");
        toast("Application Submitted", { theme: "dark" });
      }
      setName("");
      setEmail("");
      setAddress("");
      setCity("");
      setState("");
      setPhoneNo("");
      setCompanyName("");
      setTeam("");
      setProduct("");
      setProblem("");
      setSolution("");
      setProposition("");
      setCompetators("");
      setRevenue("");
      setMarket("");
      setPlan("");
      setProposal("");
      setType("");
    } catch (err) {
      setError("Please fill all the field!");
    }
  };

  return (
    <div>
      <div className="container mt-3">
        <h2 className="ms-5 text-uppercase"><b>Add details</b></h2>
        <Form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item sm={4} xs={12}>
              <TextField
                className="text"
                margin="normal"
                required
                fullWidth
                label="Name"
                name="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <TextField
                className="text"
                margin="normal"
                required
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Grid>

            <Grid item sm={4} xs={12}>
              <TextField
                className="text"
                margin="normal"
                required
                fullWidth
                label="Address"
                name="address"
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <TextField
                className="text"
                margin="normal"
                required
                fullWidth
                label="City"
                name="city"
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <TextField
                className="text"
                margin="normal"
                required
                fullWidth
                label="State"
                name="state"
                type="text"
                value={state}
                onChange={(e) => setState(e.target.value)}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <TextField
                className="text"
                margin="normal"
                required
                fullWidth
                label="Phone no"
                type="number"
                name="phoneno"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <TextField
                className="text"
                margin="normal"
                required
                fullWidth
                label="Company name"
                type="text"
                name="companyname"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <textarea
                class="form-control"
                name="team"
                value={team}
                onChange={(e) => setTeam(e.target.value)}
                placeholder="Describe your team and background"
                rows="3"
              ></textarea>
            </Grid>
            <Grid item sm={4} xs={12}>
              <textarea
                class="form-control"
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                name="product"
                placeholder="Describe your Company and Product"
                rows="3"
              ></textarea>
            </Grid>
            <Grid item sm={4} xs={12}>
              <textarea
                class="form-control"
                value={problem}
                onChange={(e) => setProblem(e.target.value)}
                name="problem"
                placeholder="Describe the problem you are trying to solve"
                rows="3"
              ></textarea>
            </Grid>
            <Grid item sm={4} xs={12}>
              <TextField
                className="text"
                margin="normal"
                required
                fullWidth
                label="What is unique about your solution"
                type="text"
                name="solution"
                value={solution}
                onChange={(e) => setSolution(e.target.value)}
              />
            </Grid>
            <Grid item sm={4} xs={12}>
              <textarea
                class="form-control"
                value={proposition}
                onChange={(e) => setProposition(e.target.value)}
                name="proposition"
                placeholder="What is your value proposition for the customer"
                rows="3"
              ></textarea>
            </Grid>
            <Grid item sm={4} xs={12}>
              <textarea
                class="form-control"
                value={market}
                onChange={(e) => setMarket(e.target.value)}
                name="market"
                placeholder="Explain your marketing strategy"
                rows="3"
              ></textarea>
            </Grid>
            <Grid item sm={4} xs={12}>
              <textarea
                class="form-control"
                value={revenue}
                onChange={(e) => setRevenue(e.target.value)}
                name="revenue"
                placeholder="Explain your revenue model"
                rows="3"
              ></textarea>
            </Grid>
            <Grid item sm={4} xs={12}>
              <textarea
                class="form-control"
                value={competators}
                onChange={(e) => setCompetators(e.target.value)}
                name="competators"
                placeholder="Who are your competators and what is your competatiev advantage?"
                rows="3"
              ></textarea>
            </Grid>
            <Grid item sm={4} xs={12}>
              <textarea
                class="form-control"
                value={proposal}
                onChange={(e) => setProposal(e.target.value)}
                name="proposal"
                placeholder="Give a detailed business proposal"
                rows="3"
              ></textarea>
            </Grid>
            <Grid item sm={4} xs={12}>
              <FormLabel id="demo-radio-buttons-group-label">
                Type of incubation needed
              </FormLabel>
              <br />
              {["radio"].map((type) => (
                <div key={`inline-${type}`} className="mb-3">
                  <Form.Check
                    inline
                    label="Physical Incubation"
                    name="select"
                    type={type}
                    value={"Physical"}
                    onClick={(e) => setType(e.target.value)}
                    required
                  />
                  <Form.Check
                    inline
                    label="Virtual Incubation"
                    name="select"
                    type={type}
                    value={"Virtual"}
                    onClick={(e) => setType(e.target.value)}
                  />
                </div>
              ))}
            </Grid>
            <Grid item xs={12}>
              <Button
                className="button "
                variant="contained"
                color="success"
                type="submit"
              >
                Submit
              </Button>
            </Grid>
          </Grid>
        </Form>
      </div>
      <ToastContainer />
    </div>
  );
}

export default App;
