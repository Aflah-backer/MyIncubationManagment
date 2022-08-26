import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login/Login";
import Register from "./Components/Register/Register";
import AdminLogin from "./Components/AdminLogin";
import ViewApplication from "./Components/ViewApp";
import UserViewApplication from "./Components/UserViewApp";
import Context from "./Store/TokenContext";
import Home from "./Pages/Home";
import "react-toastify/dist/ReactToastify.css";
import AdminHome from "./Components/AdminHome";
import Slots from "./Components/Slots";
import AddIncubator from "./Pages/AddIncubator";

function App() {
  return (
    <BrowserRouter>
      <Context>
        <Routes>
          <Route exact path="/register" element={<Register />} />
          <Route exact path="/" element={<Home />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/addincubator" element={<AddIncubator />} />
          <Route path="/admin" element={<AdminHome />} />
          <Route exact path="/adminlogin" element={<AdminLogin />} />
          <Route path="/admin/slots" element={<Slots />} />
          <Route path="/admin/viewapplication" element={<ViewApplication />} />
          <Route path="/viewapplication" element={<UserViewApplication />} />
        </Routes>
      </Context>
    </BrowserRouter>
  );
}

export default App;
