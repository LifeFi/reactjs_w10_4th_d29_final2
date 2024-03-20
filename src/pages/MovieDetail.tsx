import { motion } from "framer-motion";
import {
  useLocation,
  useNavigate,
  useOutletContext,
  useParams,
} from "react-router-dom";
import styled from "styled-components";
import { makeImagePath } from "../utils";
import { IMovie, IMovieDetail, getMovie } from "../api";
import { useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import Spinner from "../components/Spinner";

const Overlay = styled(motion.div)`
  position: fixed;
  z-index: 2;
  width: 100%;
  height: 100%;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Detail = styled(motion.div)`
  width: 480px;
  height: 90vh;
  display: flex;
  flex-direction: column;
  margin: 50px auto;
  padding-bottom: 20px;
  /* position: relative; */
  border-radius: 15px;
  overflow: scroll;
  border: 1px solid white;
  background-color: black;

  img {
    height: 480px;
    object-fit: cover;
    object-position: top;
    border-top-left-radius: 15px;
    border-top-right-radius: 15px;
  }
`;

const CloseButton = styled(motion.div)`
  position: absolute;
  right: calc(50% - 230px);
  top: calc(5vh + 20px);
  width: 35px;
  height: 35px;
  /* border-radius: 50%;
  background-color: white; */
  cursor: pointer;
`;

const Title = styled.h2`
  padding: 10px;
  font-size: 26px;
  font-weight: 600;
`;

const Overview = styled.p`
  padding: 0 10px 20px 10px;
  font-size: 18px;
`;

const OtherInfo = styled.ul`
  padding: 10px;
  font-size: 18px;
  li {
    margin-bottom: 5px;
    span {
      opacity: 0.8;
    }
    a:hover {
      color: yellow;
    }
  }
`;

export default function MovieDetail() {
  const { movieId } = useParams();
  const navigate = useNavigate();
  const { pathname: path } = useLocation();

  const parentMovie = useOutletContext<IMovie>();
  // console.log("MovieDetail", parentMovie);

  const parentPath = path.replace("movie/" + movieId, "");
  // console.log("parentPath", parentPath);
  // console.log("path", path);

  const { data, isLoading } = useQuery<IMovieDetail>({
    queryKey: ["movie", movieId],
    queryFn: () => getMovie(+movieId!),
  });

  // console.log(data);
  const onOverlayClick = () => {
    navigate(parentPath);
  };
  const onDetailClick = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
  };

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  return (
    <Overlay onClick={onOverlayClick}>
      <Detail layoutId={path} onClick={onDetailClick}>
        <img
          alt={movieId}
          src={makeImagePath(parentMovie?.poster_path, "w500")}
        />
        <CloseButton
          onClick={onOverlayClick}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
        >
          <svg
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <path
              clipRule="evenodd"
              fillRule="evenodd"
              d="M10 18a8 8 0 1 0 0-16 8 8 0 0 0 0 16ZM8.28 7.22a.75.75 0 0 0-1.06 1.06L8.94 10l-1.72 1.72a.75.75 0 1 0 1.06 1.06L10 11.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L11.06 10l1.72-1.72a.75.75 0 0 0-1.06-1.06L10 8.94 8.28 7.22Z"
            />
          </svg>
        </CloseButton>
        <Title>{parentMovie.title}</Title>
        <Overview>{parentMovie.overview}</Overview>

        {isLoading ? (
          <Spinner />
        ) : (
          <OtherInfo>
            {data?.budget ? (
              <li>
                <span>Budget: </span>${data?.budget}
              </li>
            ) : null}
            {data?.revenue ? (
              <li>
                <span>Revenue: </span>${data?.revenue}
              </li>
            ) : null}
            {data?.runtime ? (
              <li>
                <span>Runtime: </span>
                {data?.runtime} minutes
              </li>
            ) : null}
            {data?.vote_average ? (
              <li>
                <span>Rating: </span>
                {data?.vote_average}
              </li>
            ) : null}
            {data?.homepage ? (
              <li>
                <span>Homepage: </span>
                <a
                  href={data?.homepage}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {data?.homepage}
                </a>
              </li>
            ) : null}
          </OtherInfo>
        )}
      </Detail>
    </Overlay>
  );
}
