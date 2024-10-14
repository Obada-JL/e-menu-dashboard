import { Outlet } from "react-router-dom";
import NavBar from "./Components/Navbar";
import "./PageLayout.css";
// import Footer from "./components/Footer";
// import Footer from "./Footer";

function PageLayout() {
  return (
    <div className="d-flex" style={{ width: "98.9vw", minHeight: "100vh" }}>
      <div className="w-75">
        <Outlet />
      </div>
      <div className="w-25">
        <NavBar />
      </div>
      {/* <div className="d-flex justify-content-center">
        <Footer />
      </div> */}
    </div>
  );
}
export default PageLayout;
