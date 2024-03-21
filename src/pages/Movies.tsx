import { useInfiniteQuery } from "@tanstack/react-query";
import { IGetMoviesResult, IMovie, getMovies } from "../api";
import styled from "styled-components";
import { Outlet, useMatch } from "react-router-dom";
import { useCallback, useEffect, useRef } from "react";
import Spinner from "../components/Spinner";
import MovieList from "../components/MovieList";

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
  // console.log(data);
  const match = useMatch(`${pathType}/movie/:movieId`);
  const loader = useRef(null);

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
          <MovieList data={data} pathType={pathType} />
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
