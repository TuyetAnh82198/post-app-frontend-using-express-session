import { Form, Button, Container, Card } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import moment from "moment";

import { socket } from "../socket.js";
import FormComponent from "../components/Form.jsx";

const Post = () => {
  //state danh sách các bài viết
  const [posts, setPosts] = useState([]);

  //state và hàm quản lý ẩn, hiện Form của Bootstrap
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  //state title và content để update post
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  //state id bài viết muốn update
  const [postId, setPostId] = useState("");

  const navigate = useNavigate();
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
        if (data.message === "have not been logged in yet") {
          navigate("/login");
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => checkLogin(), []);

  //hàm lấy danh sách bài viết để hiển thị
  const fetchPosts = () => {
    fetch("https://post-app-backend-express-session.onrender.com/posts/get", {
      method: "GET",
      credentials: "include",
    })
      .then((response) => response.json())
      .then((data) => {
        setPosts(data.result);
        if (
          data.message === "Your login session has expired, please log in again"
        ) {
          alert("Your login session has expired, please log in again");
        }
      })
      .catch((err) => console.log(err));
  };
  useEffect(() => fetchPosts(), []);

  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  });

  useEffect(() => {
    const postHandler = (data) => {
      if (data.action === "post") {
        setPosts(data.postResult);
      } else if (data.action === "update") {
        setPosts(data.updateResult);
      } else if (data.action === "delete") {
        setPosts(data.deleteResult);
      }
    };
    socket.on("posts", postHandler);
    return () => {
      socket.off("posts", postHandler);
    };
  });

  //hàm xử lý việc edit bài viết
  const editHandler = (id, title, content) => {
    setPostId(id);
    setTitle(title);
    setContent(content);
    handleShow();
  };

  //hàm xóa bài viết
  const deletePost = (id) => {
    fetch(
      `https://post-app-backend-express-session.onrender.com/posts/delete/${id}`,
      {
        method: "GET",
        credentials: "include",
      }
    )
      .then((response) => response.json())
      .then((data) => {
        if (data.message === "Deleted!") {
          alert("Deleted!");
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <div>
      {show && (
        <FormComponent
          show={show}
          handleClose={handleClose}
          title={title}
          content={content}
          postId={postId}
        />
      )}
      <Container className="col-4 mt-4">
        <Form className="p-3" style={{ textAlign: "center" }}>
          <Form.Group
            controlId="post"
            className="d-flex justify-content-between"
          >
            <Form.Control
              className="p-1"
              type="text"
              placeholder="How are you today?"
            />
            <Form.Text
              style={{
                color: "#3b0062",
                marginLeft: "1rem",
                cursor: "pointer",
              }}
            >
              UPDATE
            </Form.Text>
          </Form.Group>
          <Button
            onClick={handleShow}
            className="border-0 rounded-0 mt-3 shadow"
            style={{
              backgroundColor: "#fab83f",
              color: "#3b0062",
              fontWeight: "500",
            }}
          >
            NEW POST
          </Button>
        </Form>
      </Container>
      <Container className="col-6">
        {posts.length === 0 && (
          <div style={{ textAlign: "center" }}>No posts found.</div>
        )}
        {posts.length > 0 &&
          posts.map((post) => (
            <Card key={post._id} className="p-3">
              <Card.Text style={{ color: "gray", fontWeight: "600" }}>
                Posted by on {moment(post.date).format("DD/MM/YYYY")}
              </Card.Text>
              <Card.Title style={{ color: "#3b0062", fontWeight: "650" }}>
                {post.title}
              </Card.Title>
              <div className="d-flex justify-content-end">
                <Button
                  onClick={() => navigate(`/view/${post._id}`, { state: post })}
                  className="bg-white border-0"
                  style={{ color: "#3b0062", fontWeight: "500" }}
                >
                  VIEW
                </Button>
                <Button
                  onClick={() =>
                    editHandler(post._id, post.title, post.content)
                  }
                  className="bg-white border-0"
                  style={{ color: "#3b0062", fontWeight: "500" }}
                >
                  EDIT
                </Button>
                <Button
                  onClick={() => deletePost(post._id)}
                  className="bg-white border-0"
                  style={{ color: "red", fontWeight: "500" }}
                >
                  DELETE
                </Button>
              </div>
            </Card>
          ))}
      </Container>
    </div>
  );
};

export default Post;
