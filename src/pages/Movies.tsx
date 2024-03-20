import { useInfiniteQuery } from "@tanstack/react-query";
import { IGetMoviesResult, IMovie, getMovies } from "../api";
import { makeImagePath } from "../utils";
import styled from "styled-components";
import { Link, Outlet, useMatch } from "react-router-dom";
import { motion } from "framer-motion";
import { useCallback, useEffect, useRef } from "react";
import Spinner from "../components/Spinner";

const MovieList = styled(motion.div)`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;

const MovieItem = styled(motion.div)`
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  img {
    border-radius: 15px;
  }
  span {
    padding: 10px 0;
  }
`;

const LoadMore = styled.div`
  width: 100%;
  height: 50px;
  border-radius: 10px;
  border: 1px solid white;
  margin: 20px 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
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

export default function Movies({
  pathType,
}: {
  pathType: "" | "/now-playing" | "/coming-soon";
}) {
  const { data, isLoading, hasNextPage, fetchNextPage, isFetchingNextPage } =
    useInfiniteQuery<IGetMoviesResult>({
      queryKey: [pathType],
      queryFn: ({ pageParam = 1 }) => getMovies(pathType, pageParam),
      initialPageParam: 1,
      getNextPageParam: (lastPage, allPages) => {
        if (lastPage.page < lastPage.total_pages) {
          return lastPage.page + 1;
        }
      },
    });

  const loader = useRef(null);

  // console.log(data);
  const match = useMatch(`${pathType}/movie/:movieId`);

  const selectedMovie =
    match?.params.movieId &&
    // reduce 반환값 타입을 IMovie 로 지정해줌.
    // - 디폴트로 pages 타입 즉 IGetMovieResult 를 받아오고 있기에 바꿔줌.
    data?.pages.reduce<IMovie | undefined>(
      (foundMovie, page) =>
        foundMovie ??
        page.results.find((movie) => movie.id + "" === match.params.movieId),
      undefined
    );

  // console.log("selectedMovie", selectedMovie);

  // Infinity Scrolling
  const loadMore = useCallback(() => {
    if (!hasNextPage || isFetchingNextPage) return;
    fetchNextPage();
  }, [hasNextPage, isFetchingNextPage, fetchNextPage]);

  useEffect(() => {
    const currentLoader = loader.current;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      {
        rootMargin: "20px",
        threshold: 1.0,
      }
    );
    if (currentLoader) {
      observer.observe(currentLoader);
    }
    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, [loadMore]);

  return (
    <>
      {isLoading ? (
        <Spinner />
      ) : (
        <>
          <MovieList variants={movieListVariants} initial="start" animate="end">
            {data?.pages.map((page) =>
              page?.results.map((movie) => {
                // console.log(`${pathType}/movie/${movie.id}`);
                return (
                  <MovieItem variants={movieItemVariants}>
                    <motion.div
                      layoutId={`${pathType}/movie/${movie.id}`}
                      key={`${pathType}/movie/${movie.id}`}
                      whileHover={{ y: -20 }}
                    >
                      <Link to={`movie/${movie.id}`}>
                        <img
                          style={{ width: "300px", objectFit: "cover" }}
                          alt={movie.title}
                          src={makeImagePath(movie.poster_path)}
                        />
                      </Link>
                    </motion.div>
                    <span>{movie.title}</span>
                  </MovieItem>
                );
              })
            )}
          </MovieList>

          {isFetchingNextPage ? (
            <Spinner />
          ) : (
            hasNextPage && (
              <LoadMore ref={loader} onClick={loadMore}>
                Load More
              </LoadMore>
            )
          )}
        </>
      )}
      <Outlet context={selectedMovie} />
    </>
  );
}
