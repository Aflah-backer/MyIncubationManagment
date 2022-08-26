import React, { useState, useEffect } from "react";
import { Navbar, Nav, Button, Container, Form } from "react-bootstrap";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

function AdminHeader() {
  const navigate = useNavigate();
  const [cookies, removeCookie] = useCookies([]);

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
  }, [cookies, navigate, removeCookie]);

  const logout = () => {
    removeCookie("jwt");
    navigate("/adminlogin");
  };

  return (
    <Navbar bg="dark" expand="lg">
      <Container fluid>
        <Navbar.Brand onClick={() => navigate("/admin")} className="text-white">
          Admin Panel
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: "100px" }}
            navbarScroll
          >
            <Nav.Link
              onClick={() => navigate("/admin/slots")}
              className="text-white"
            >
              Slots
            </Nav.Link>
          </Nav>
          <Form className="d-flex">
            <Button variant="outline-success" onClick={logout}>
              Logout
            </Button>
          </Form>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default AdminHeader;
