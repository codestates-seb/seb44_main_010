import error from "../../assets/—Pngtree—404 error page_1362453.png";
import { ErrorImg, Container } from "../../pages/error/404PageStyled";

export default function ErrorPage() {
  return (
    <Container>
      <ErrorImg src={error} alt="icon"></ErrorImg>;
    </Container>
  );
}
