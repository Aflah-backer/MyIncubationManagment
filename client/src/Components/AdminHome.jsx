import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import { Container, Tab, Table, Tabs, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import AdminHeader from "./AdminHeader";
import axios from "axios";
import swal from "sweetalert";
import { useCookies } from "react-cookie";

function AdminHome() {
  const navigate = useNavigate();
  const [newdata, setNewdata] = useState([]);
  const [pending, setPending] = useState([]);
  const [alldata, setAlldata] = useState([]);
  const [status, setStatus] = useState([]);
  const notify = (error) => {
    toast(error);
  };
  const [cookies, removeCookie] = useCookies([]);

  const manage = async () => {
    const allApplication = await axios.get(
      "http://localhost:4000/admin/alldata"
    );
    if (allApplication.status) {
      setAlldata(allApplication.data.data);
    }
    const newApplication = await axios.get(
      "http://localhost:4000/admin/newdata"
    );
    if (newApplication.status) {
      setNewdata(newApplication.data.datas);
    }
    const pendingApplication = await axios.get(
      "http://localhost:4000/admin/pendingapplications"
    );
    if (pendingApplication.status) {
      setPending(pendingApplication.data.data);
    }
  };

  useEffect(() => {
    const verifyAdmin = async () => {
      if (!cookies.jwt) {
        navigate("/adminlogin");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000/admin",
          {},
          { withCredentials: true }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/adminlogin");
        }
      }
    };
    verifyAdmin();
    manage();
  }, [cookies, navigate, removeCookie]);

  async function ChangeStatus(status, id) {
    let obj = { status, id };
    if (status !== "Rejected") {
      try {
        await axios
          .post("http://localhost:4000/admin/changeStatus", obj)
          .then((res) => {
            manage();
            if (status === "Approved") {
              notify(status);
              setStatus(status);
              setPending(
                pending.filter((row) => {
                  console.log(row._id);
                  console.log(res.data.datas.id);
                  return row._id !== res.data.datas.id;
                })
              );
            }
            if (status === "Pending") {
              console.log("rhuh");

              notify("Application Added to Pending list");
              setStatus(status);
              console.log(res.data.data);
              pending.push(res.data.data);
              console.log(pending);
              setNewdata(
                newdata.filter((row) => {
                  console.log(row._id);
                  console.log(res.data.datas.id);
                  return row._id !== res.data.datas.id;
                })
              );
            }
          });
      } catch (err) {}
    } else if (status === "Rejected") {
      swal({
        title: "Are you sure?",
        text: "Once rejected, You will not be able to recover this application",
        icon: "warning",
        buttons: true,
        dangerMode: true,
      }).then((willDelete) => {
        if (willDelete) {
          swal("Oops!, Your application has been rejected!", {
            icon: "success",
          }).then(async () => {
            try {
              console.log("changestatus");
              await axios
                .post("http://localhost:4000/admin/changestatus", obj)
                .then((res) => {
                  if (status === "Rejected") {
                    manage();
                    setStatus(status);
                  }
                });
            } catch (error) {}
          });
        } else {
          swal("Your file is safe");
        }
      });
    }
  }

  return (
    <div>
      <AdminHeader />
      <div className="m-5">
        <Container>
          <Tabs
            defaultActiveKey="home"
            transition={false}
            id="noanim-tab-example"
            className="mb-3"
          >
            <Tab eventKey="home" title="All Data">
              {alldata.length > 0 ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Sl no</th>
                      <th>Application ID</th>
                      <th>Company Name</th>
                      <th>Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {alldata.map((obj, index) => {
                      return (
                        <tr key={obj._id}>
                          <td>{index + 1}</td>
                          <td>{obj._id}</td>
                          <td>{obj.companyName}</td>
                          <td style={{ color: "black" }}>{obj.status}</td>
                          <td>
                            <p
                              className="view"
                              style={{
                                color: "blue",
                                textAlign: "center",
                              }}
                              onClick={() => {
                                navigate("/admin/viewapplication");
                                localStorage.setItem(
                                  "appId",
                                  JSON.stringify([obj._id, obj.userId])
                                );
                              }}
                            >
                              View Application
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              ) : (
                <div style={{ textAlign: "center" }}>
                  <h3 style={{ color: "red" }}>
                    No Application under Processing
                  </h3>
                </div>
              )}
            </Tab>
            <Tab eventKey="profile" onClick={manage} title="New Data">
              {newdata.length > 0 ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Sl No</th>
                      <th>Application ID</th>
                      <th>Company Name</th>
                      {/* <th>Status</th> */}
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {newdata.map((obj, index) => {
                      return (
                        <tr key={obj._id}>
                          <td>{index + 1}</td>
                          <td>{obj._id}</td>
                          <td>{obj.companyName}</td>
                          <td style={{ textAlign: "center" }}>
                            <button
                              className="btn btn-warning"
                              onClick={() => {
                                setStatus("");
                                ChangeStatus("Pending", obj._id);
                              }}
                            >
                              Pending
                            </button>
                          </td>
                          <td>
                            <p
                              className="view"
                              style={{
                                color: "turquoise",
                                textAlign: "center",
                              }}
                              onClick={() => {
                                navigate("/admin/viewapplication");
                                localStorage.setItem(
                                  "appId",
                                  JSON.stringify([obj._id, obj.userId])
                                );
                              }}
                            >
                              View Application
                            </p>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              ) : (
                <div style={{ textAlign: "center" }}>
                  <h3 style={{ color: "red" }}>
                    No Application under Processing
                  </h3>
                </div>
              )}
            </Tab>
            <Tab eventKey="contact" title="Pending Data">
              {pending.length > 0 ? (
                <Table striped bordered hover>
                  <thead>
                    <tr>
                      <th>Sl No</th>
                      <th>Application ID</th>
                      <th>Company Name</th>
                      {/* <th>Status</th> */}
                      <th />
                    </tr>
                  </thead>
                  <tbody>
                    {pending.map((obj, index) => {
                      return (
                        <tr key={obj._id}>
                          <td>{index + 1}</td>
                          <td>{obj._id}</td>
                          <td>{obj.companyName}</td>
                          <td style={{ textAlign: "center" }}>
                            <button
                              className="btn btn-success"
                              onClick={() => {
                                setStatus("");
                                ChangeStatus("Approved", obj._id);
                              }}
                            >
                              Approved
                            </button>
                          </td>
                          <td style={{ textAlign: "center" }}>
                            <button
                              className="btn btn-danger"
                              onClick={() => {
                                setStatus("");
                                ChangeStatus("Rejected", obj._id);
                              }}
                            >
                              Decline
                            </button>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </Table>
              ) : (
                <div style={{ textAlign: "center" }}>
                  <h3 style={{ color: "red" }}>
                    No Application under Processing
                  </h3>
                </div>
              )}
            </Tab>
          </Tabs>
        </Container>
      </div>
    </div>
  );
}

export default AdminHome;
