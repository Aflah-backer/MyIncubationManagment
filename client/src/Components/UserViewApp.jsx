import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";
import { Container, Card } from "react-bootstrap";

function UserViewApp() {
  const [app, setApp] = useState({});
  // const [confirmation,setConfirmation] = useState('')
  const id = JSON.parse(localStorage.getItem("appId"));
  const viewApplication = async () => {
    const appDetails = await axios.get(
      `http://localhost:4000/admin/viewapplication/${id[0]}`
    );
    setApp(appDetails.data.data);
  };
  console.log(app);
  useEffect(() => {
    viewApplication();
  }, []);

  return (
    <>
      <Header />
      <div style={{ marginTop: "3%" }}>
        <div className="d-flex justify-content-around">
          <Container>
            <Card style={{ width: "100%", backgroundColor: "#f7f7f7" }}>
              <Card.Body>
                <dl class="row">
                  <dt class="col-sm-3">Name</dt>
                  <dd class="col-sm-9">: {app.name}</dd>
                  <dt class="col-sm-3">Email</dt>
                  <dd class="col-sm-9">: {app.email}</dd>
                  <dt class="col-sm-3">Phone No</dt>
                  <dd class="col-sm-9">: {app.phoneNo}</dd>

                  <dt class="col-sm-3">Company Name</dt>
                  <dd class="col-sm-9">: {app.companyName}</dd>
                  <dt class="col-sm-3">Address</dt>
                  <dd class="col-sm-9">: {app.address}</dd>
                  <dt class="col-sm-3">City</dt>
                  <dd class="col-sm-9">: {app.city}</dd>
                  <dt class="col-sm-3">State</dt>
                  <dd class="col-sm-9">: {app.state}</dd>
                  <dt class="col-sm-3">Team and Backgorund</dt>
                  <dd class="col-sm-9">: {app.team}</dd>
                  <dt class="col-sm-3">Company and products</dt>
                  <dd class="col-sm-9">: {app.product}</dd>
                  <dt class="col-sm-3">Solution and uniqueness</dt>
                  <dd class="col-sm-9">: {app.solution}</dd>
                  <dt class="col-sm-3">Value Propostions</dt>
                  <dd class="col-sm-9">: {app.proposition}</dd>
                  <dt class="col-sm-3">Incubation Type</dt>
                  <dd class="col-sm-9">: {app.type}</dd>
                  <dt class="col-sm-3">Section</dt>
                  <dd class="col-sm-9">: {app.section}</dd>
                  <dt class="col-sm-3">Slot No</dt>
                  <dd class="col-sm-9">: {app.slot_no}</dd>
                </dl>
              </Card.Body>
            </Card>
          </Container>
        </div>
      </div>
    </>
  );
}

export default UserViewApp;
