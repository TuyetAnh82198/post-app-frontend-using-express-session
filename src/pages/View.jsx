import { Container, Card } from "react-bootstrap";
import { useLocation } from "react-router-dom";
import moment from "moment";

const View = () => {
  //lấy dữ liệu của bài viết được truyền bằng useNavigate
  const location = useLocation();
  const post = location.state;

  return (
    <Container className="col-5">
      <Card className="border-0">
        <Card.Header
          className="bg-white border-bottom-3 border-dark"
          style={{ textAlign: "center" }}
        >
          <Card.Text as="h3" style={{ color: "#3b0062" }}>
            {post.title}
          </Card.Text>
          <Card.Text style={{ color: "gray" }}>
            Created by on {moment(post.date).format("DD/MM/YYYY")}
          </Card.Text>
        </Card.Header>
        <Card.Body style={{ textAlign: "center" }}>
          <Card.Img
            className="rounded-0 w-50 my-5"
            src={`https://post-app-backend-express-session.onrender.com/${post.image}`}
            alt="image"
          />
          <Card.Text style={{ color: "#3b0062" }}>{post.content}</Card.Text>
        </Card.Body>
      </Card>
    </Container>
  );
};

export default View;
