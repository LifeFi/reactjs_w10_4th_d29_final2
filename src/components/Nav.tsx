import { Link } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.nav`
  display: flex;
  justify-content: space-around;
  width: 420px;
  margin: 10px;
`;

export default function Nav() {
  return (
    <Wrapper>
      <Link to="/">POPULAR</Link>
      <Link to="/coming-soon">COMING SOON</Link>
      <Link to="/now-playing">NOW PLAYING</Link>
    </Wrapper>
  );
}
