import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import ForgotPassword from "./pages/ForgotPassword";
import Connection from "./pages/Connection";
import Registration from "./pages/Registration";
import Header from "./components/Header";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Menu from "./pages/Menu";
import Promotion from "./pages/Promotion";
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';


function App() {
  return (
    <>
      <Router>
        <Header/>
        <Routes>
          <Route path="/" element={<Home/>} />
          <Route path="/menu" element={<Menu/>} />
          <Route path="/promotions" element={<Promotion/>} />
          <Route path="/profile" element={<Profile/>} />
          <Route path="/about-us" element={<About/>}/>
          <Route path="/contact-us" element={<Contact/>}/>
          <Route path="/connect" element={<Connection/>} />
          <Route path="/register" element={<Registration/>} />
          <Route path="/forgot-password" element={<ForgotPassword/>} />
        </Routes>
      </Router>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
        />
    </>
  );
}

export default App;
