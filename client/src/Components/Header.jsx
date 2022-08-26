import React, { useState, useEffect } from "react";
import { Navbar, Container, Nav, Button, Form } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Header() {
  const [cookie, setCookie, removeCookie] = useCookies([]);
  const [Status, setStatus] = useState(null);
  const token = cookie.jwt;
  const navigate = useNavigate();

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookie.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000",
          {},
          { withCredentials: true }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        }
      }
    };

    const getStatus = async () => {
      const applicationData = await axios.get(
        `http://localhost:4000/status/${token}`
      );
      console.log(applicationData.data.status);
      setStatus(applicationData.data.status);
    };
    verifyUser();
    getStatus();
  }, [cookie, navigate, removeCookie]);

  const logout = () => {
    removeCookie("jwt");
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <Navbar bg="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand
            onClick={() => {
              navigate("/");
            }}
            className="text-white"
          >
            INCUBATOR
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="navbarScroll" />
          <Navbar.Collapse id="navbarScroll">
            <Nav
              className="me-auto my-2 my-lg-0"
              style={{ maxHeight: "100px" }}
              navbarScroll
            >
              {Status == false ? (
                <Nav.Link
                  onClick={() => navigate("/addincubator")}
                  className="text-white"
                >
                  Add New Application
                </Nav.Link>
              ) : (
                ""
              )}
            </Nav>
            <Form className="d-flex">
              <Button variant="outline-success" onClick={logout}>
                Logout
              </Button>
            </Form>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Header;
