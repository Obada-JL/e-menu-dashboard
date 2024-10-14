import Logo from "../assets/Logo.png";
import "./NavBar.css";
function NavBar() {
  return (
    <div className="pe-5 pt-5 NavBarContainer">
      <div>
        <a href="/">
          <img src={Logo} width={100} />
        </a>
      </div>
      <hr style={{ opacity: ".75", width: "90%" }} />
      <div>
        <ul className="NavList h2 d-flex flex-column gap-3">
          <li>
            <a href="/foods" className="menu__link">
              المأكولات
            </a>
          </li>
          <li>
            <a href="/desserts" className="menu__link">
              الحلويات
            </a>
          </li>
          <li>
            <a href="/drinks" className="menu__link">
              المشروبات
            </a>
          </li>
          <li>
            <a href="/images" className="menu__link">
              الصور
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
export default NavBar;
