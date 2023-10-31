import { Card, Form, Button, Container } from "react-bootstrap";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Signup = () => {
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

  //state thông báo lỗi dữ liệu không hợp lệ
  const [errEmail, setErrEmail] = useState("");
  const [errName, setErrName] = useState("");
  const [errPass, setErrPass] = useState("");

  const emailInput = useRef();
  const passInput = useRef();
  const nameInput = useRef();

  const navigate = useNavigate();
  const formSubmit = () => {
    fetch(
      "https://post-app-backend-express-session.onrender.com/users/signup",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: emailInput.current.value,
          pass: passInput.current.value,
          name: nameInput.current.value,
        }),
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Created!") {
          alert("Created!");
          navigate("/login");
        } else if (data.err.length > 0) {
          if (data.err[0].path === "email") {
            setErrEmail(data.err[0].msg);
          } else if (data.err[0].path !== "email") {
            setErrEmail("");
          }
          if (data.err[0].path === "name") {
            setErrName(data.err[0].msg);
          } else if (data.err[0].path !== "name") {
            setErrName("");
          }
          if (data.err[0].path === "pass") {
            setErrPass(data.err[0].msg);
          } else if (data.err[0].path !== "email") {
            setErrPass("");
          }
        } else if (data.message === "Existing user!") {
          alert("Existing user!");
        }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Container className="col-6 mt-4">
      {!isLoggedIn && (
        <Card>
          <Form className="p-3">
            <Form.Group controlId="email">
              <Form.Label className="mt-2">YOUR E-MAIL</Form.Label>
              <Form.Control
                onChange={() => setErrEmail("")}
                ref={emailInput}
                style={
                  errEmail === ""
                    ? {}
                    : {
                        backgroundColor: "#ffc2c2",
                        border: "solid red 0.05rem",
                      }
                }
                type="text"
              />
              <Form.Text className="text-danger">{errEmail}</Form.Text>
            </Form.Group>
            <Form.Group controlId="name">
              <Form.Label className="mt-2">YOUR NAME</Form.Label>
              <Form.Control
                onChange={() => setErrName("")}
                ref={nameInput}
                style={
                  errName === ""
                    ? {}
                    : {
                        backgroundColor: "#ffc2c2",
                        border: "solid red 0.05rem",
                      }
                }
                type="text"
              />
              <Form.Text className="text-danger">{errName}</Form.Text>
            </Form.Group>
            <Form.Group controlId="pass">
              <Form.Label className="mt-2">PASSWORD</Form.Label>
              <Form.Control
                onChange={() => setErrPass("")}
                ref={passInput}
                style={
                  errPass === ""
                    ? {}
                    : {
                        backgroundColor: "#ffc2c2",
                        border: "solid red 0.05rem",
                      }
                }
                type="password"
              />
              <Form.Text className="text-danger">{errPass}</Form.Text>
            </Form.Group>
            <Button
              className="border-0 rounded-0 mt-3"
              style={{ backgroundColor: "#3b0062", color: "white" }}
              onClick={formSubmit}
            >
              SIGNUP
            </Button>
          </Form>
        </Card>
      )}
    </Container>
  );
};

export default Signup;
