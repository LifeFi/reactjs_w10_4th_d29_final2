import { useQueryClient } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useLocation, useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  background-color: black;
  z-index: 1;
`;

const NavBar = styled.div`
  display: flex;
  justify-content: space-around;
  width: 420px;
  margin: 20px auto;
  font-size: 18px;
  font-weight: 600;
`;

const BottomSpace = styled.div`
  margin-bottom: 70px;
`;

const Circle = styled(motion.span)`
  position: absolute;
  width: 5px;
  height: 5px;
  border-radius: 5px;
  bottom: -9px;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: red;
`;

const NavItem = styled.div<{ selected: boolean }>`
  position: relative;
  cursor: pointer;
  color: ${(props) => (props.selected ? "red" : "white")};
`;

export default function Nav() {
  const popularMatch = useMatch("/");
  const popularMovieMatch = useMatch("/movie/:movieId");
  const nowPlayingMatch = useMatch("/now-playing");
  const nowPlayingMovieMatch = useMatch("/now-playing/movie/:movieId");
  const comingSoonMatch = useMatch("/coming-soon");
  const comingSoonMovieMatch = useMatch("/coming-soon/movie/:movieId");

  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const location = useLocation();

  const onNavItemClick = (path: string) => {
    // console.log(window.scrollY);
    if (location.pathname === path) {
      if (window.scrollY > 0) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
        console.log("scrollToTop ===========");
      } else {
        // invalidateQueries : remove caches & refrech in the background
        // resetQueries : remove caches & reset pre-loaded state
        queryClient.resetQueries({
          queryKey: [path === "/" ? "" : path],
        });
        console.log("resetQueries", path, " ===========");
      }
    } else {
      navigate(path);
      if (window.scrollY > 0) {
        window.scrollTo({
          top: 0,
          behavior: "smooth",
        });
      }
    }
  };

  return (
    <>
      <Wrapper>
        <NavBar>
          <NavItem
            selected={Boolean(popularMatch || popularMovieMatch)}
            onClick={() => onNavItemClick("/")}
          >
            POPULAR
            {(popularMatch || popularMovieMatch) && (
              <Circle layoutId="circle" />
            )}
          </NavItem>

          <NavItem
            selected={Boolean(comingSoonMatch || comingSoonMovieMatch)}
            onClick={() => onNavItemClick("/coming-soon")}
          >
            COMING SOON
            {(comingSoonMatch || comingSoonMovieMatch) && (
              <Circle layoutId="circle" />
            )}
          </NavItem>
          <NavItem
            selected={Boolean(nowPlayingMatch || nowPlayingMovieMatch)}
            onClick={() => onNavItemClick("/now-playing")}
          >
            NOW PLAYING
            {(nowPlayingMatch || nowPlayingMovieMatch) && (
              <Circle layoutId="circle" />
            )}
          </NavItem>
        </NavBar>
      </Wrapper>
      <BottomSpace />
    </>
  );
}
