import { useState, useRef } from "react";
import { Button, Form, Modal } from "react-bootstrap";

const FormComponent = (props) => {
  //state title và content để post bài
  const [title, setTitle] = useState(props.title);
  const [content, setContent] = useState(props.content);
  const imageInput = useRef();
  //state active nút submit
  const [activeSubmit, setActiveSubmit] = useState(true);

  //hàm cập nhật title và active nút submit nếu các trường đều đã được nhập
  const changeTitleInput = (e) => {
    setTitle(e.target.value);
    if (title !== "" && content !== "" && imageInput.current.files[0]) {
      setActiveSubmit(false);
    } else {
      setActiveSubmit(true);
    }
  };

  //hàm cập nhật content và active nút submit nếu các trường đều đã được nhập
  const changeContentInput = (e) => {
    setContent(e.target.value);
    if (title !== "" && content !== "" && imageInput.current.files[0]) {
      setActiveSubmit(false);
    } else {
      setActiveSubmit(true);
    }
  };

  //hàm xử lý up ảnh và active nút submit nếu các trường đều đã được nhập
  const changeImageInput = () => {
    if (title !== "" && content !== "" && imageInput.current.files[0]) {
      setActiveSubmit(false);
    } else {
      setActiveSubmit(true);
    }
  };

  //hàm đăng hoặc cập nhật ảnh và bài viết
  const submitForm = (e) => {
    e.preventDefault();
    if (props.postId === "") {
      const formData = new FormData();
      formData.append("title", title);
      formData.append("content", content);
      formData.append("image", imageInput.current.files[0]);
      fetch(
        "https://post-app-backend-express-session.onrender.com/posts/post",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "Please enter a valid value") {
            alert("Please enter a valid value");
          } else if (data.message === "jpg, jpeg, png accepted") {
            alert("jpg, jpeg, png accepted");
          } else if (data.message === "Posted!") {
            alert("Posted!");
            props.handleClose();
          }
        })
        .catch((err) => console.log(err));
    } else if (props.postId !== "") {
      const formData = new FormData();
      formData.append("id", props.postId);
      formData.append("title", title);
      formData.append("content", content);
      formData.append("image", imageInput.current.files[0]);
      fetch(
        "https://post-app-backend-express-session.onrender.com/posts/update",
        {
          method: "POST",
          credentials: "include",
          body: formData,
        }
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.message === "Please enter a valid value") {
            alert("Please enter a valid value");
          } else if (data.message === "jpg, jpeg, png accepted") {
            alert("jpg, jpeg, png accepted");
          } else if (data.message === "Updated!") {
            alert("Updated!");
            props.handleClose();
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <>
      <Modal show={props.show} onHide={props.handleClose}>
        <Modal.Header
          style={{ borderBottom: "solid #3b0062 0.1rem" }}
          closeButton
        >
          <Modal.Title style={{ color: "#3b0062" }}>New Post</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitForm} encType="multipart/form-data">
            <Form.Group className="mb-2" controlId="title">
              <Form.Label>TITLE</Form.Label>
              <Form.Control
                defaultValue={title}
                onChange={changeTitleInput}
                type="text"
                autoFocus
                name="title"
              />
            </Form.Group>
            <Form.Group className="mb-5" controlId="image">
              <Form.Label>IMAGE</Form.Label>
              <Form.Control
                onChange={changeImageInput}
                ref={imageInput}
                type="file"
                name="image"
              />
              <Form.Text>Please choose an image.</Form.Text>
            </Form.Group>
            <Form.Group className="mb-5" controlId="content">
              <Form.Label>CONTENT</Form.Label>
              <Form.Control
                defaultValue={content}
                onChange={changeContentInput}
                as="textarea"
                rows={3}
                name="content"
              />
            </Form.Group>
            <Form.Group className="d-flex justify-content-end">
              <Button
                className="bg-white border-0 mx-3"
                style={{ color: "red" }}
                onClick={props.handleClose}
              >
                CANCEL
              </Button>
              <Button
                disabled={activeSubmit}
                className="rounded-0"
                style={{ color: "white", backgroundColor: "#3b0062" }}
                type="submit"
              >
                ACCEPT
              </Button>
            </Form.Group>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default FormComponent;
