import { InfiniteData } from "@tanstack/react-query";
import { motion } from "framer-motion";
import styled from "styled-components";
import { IGetMoviesResult } from "../api";
import { Link } from "react-router-dom";
import { makeImagePath } from "../utils";

const Wrapper = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

const MovieItem = styled(motion.div)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    width: 300px;
    object-fit: cover;
    border: 2px solid transparent;
    border-radius: 15px;
  }
  span {
    padding: 10px 0;
  }
`;

const movieListVariants = {
  start: { scale: 0, opacity: 0 },
  end: {
    scale: 1,
    opacity: 1,
    transition: {
      delayChildren: 0.2,
      staggerChildren: 0.2,
    },
  },
};
const movieItemVariants = {
  start: { scale: 0, opacity: 0 },
  end: {
    scale: 1,
    opacity: 1,
  },
};

interface IMovieListProps {
  data: InfiniteData<IGetMoviesResult, unknown> | undefined;
  pathType: "" | "/now-playing" | "/coming-soon";
}

export default function MovieList({ data, pathType }: IMovieListProps) {
  return (
    <>
      <Wrapper
        variants={movieListVariants}
        initial="start"
        animate="end"
        key={pathType}
      >
        {data?.pages.map((page) =>
          page?.results.map((movie) => {
            // console.log(`${pathType}/movie/${movie.id}`);
            return (
              <MovieItem
                variants={movieItemVariants}
                key={`${pathType}/movie/${movie.id}`}
                layoutId={`${pathType}/movie/${movie.id}`}
              >
                <Link to={`movie/${movie.id}`}>
                  <motion.img
                    whileHover={{
                      y: -20,
                      border: "2px solid white",
                      transition: { duration: 0.2 },
                    }}
                    alt={movie.title}
                    src={makeImagePath(movie.poster_path, "w500")}
                  />
                </Link>
                <span>{movie.title}</span>
              </MovieItem>
            );
          })
        )}
      </Wrapper>
    </>
  );
}
