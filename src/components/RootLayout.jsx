import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const RootLayout = () => {
  //state trạng thái đăng nhập của người dùng
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  //hàm kiểm tra người dùng đã đăng nhập chưa
  const checkLogin = () => {
    fetch(
      "https://post-app-backend-express-session.onrender.com/users/check-login",
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "You are logged in") {
          setIsLoggedIn(true);
        } else if (data.message === "have not been logged in yet") {
          setIsLoggedIn(false);
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => checkLogin(), []);

  const navigate = useNavigate();
  //hàm đăng xuất
  const logOut = () => {
    fetch(
      "https://post-app-backend-express-session.onrender.com/users/logout",
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "You are logged out!") {
          setIsLoggedIn(false);
          alert("You are logged out!");
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <div>
      <div
        style={{ backgroundColor: "#3b0062", color: "white" }}
        className="d-flex justify-content-between p-2"
      >
        <div className="border border-white p-1">MessageNode</div>
        {!isLoggedIn && (
          <nav>
            <NavLink
              to="/login"
              className="d-inline-block p-1 mx-3"
              style={({ isActive }) =>
                isActive
                  ? { color: "yellow", textDecoration: "none" }
                  : { color: "white", textDecoration: "none" }
              }
            >
              Login
            </NavLink>
            <NavLink
              to="/"
              className="d-inline-block p-1 mx-3"
              style={({ isActive }) =>
                isActive
                  ? { color: "yellow", textDecoration: "none" }
                  : { color: "white", textDecoration: "none" }
              }
            >
              Signup
            </NavLink>
          </nav>
        )}
        {isLoggedIn && (
          <nav>
            <NavLink
              onClick={logOut}
              style={{ color: "white", textDecoration: "none" }}
              className="d-inline-block p-1 mx-3"
            >
              Logout
            </NavLink>
          </nav>
        )}
      </div>
      <Outlet />
    </div>
  );
};

export default RootLayout;
