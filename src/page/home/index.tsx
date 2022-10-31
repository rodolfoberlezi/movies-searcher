import React, { FC, ReactElement, useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Center,
  Container,
  Heading,
  List,
  Stack,
  Text,
} from "@chakra-ui/react";
import { useBottomScrollListener } from "react-bottom-scroll-listener";

import { MOVIES_API_KEY, MOVIES_API_URL } from "../../apis/constants";
import { ErrorAlert } from "../../components/ErrorAlert";
import { Loader } from "../../components/Loader";
import { Searcher } from "../../components/Searcher";
import { Movie, MoviesList } from "../../types/movies";
import { MovieBanner } from "../../components/MovieBanner";

export const Home: FC = (): ReactElement => {
  const [searchTitle, setSearchTerm] = useState<string>("");
  const [moviesList, setMoviesList] = useState<Movie[]>();
  const [moviesResult, setMoviesResult] = useState<MoviesList>();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [endOfTheList, setEndOfTheList] = useState<boolean>(false);

  useBottomScrollListener(() => {
    loadMoreMovies();
  });

  const errorHandler = (error: any) => {
    setIsLoading(false);
    setErrorMessage(error.response.data.status_message);
  };

  const searchMovies = () => {
    setErrorMessage("");
    setEndOfTheList(false);

    if (searchTitle !== "") {
      setIsLoading(true);
      return axios
        .get(
          `${MOVIES_API_URL}/search/movie?query=${searchTitle}&api_key=${MOVIES_API_KEY}`
        )
        .then((result) => {
          setIsLoading(false);
          setMoviesList(result.data.results);
          setMoviesResult(result.data);
          if (result.data.total_pages === 1) {
            setEndOfTheList(true);
          }
        })
        .catch((error) => {
          errorHandler(error);
        });
    }
  };

  const loadMoreMovies = () => {
    if (
      moviesResult?.total_pages &&
      moviesResult?.total_pages > 1 &&
      moviesResult?.page !== moviesResult?.total_pages
    ) {
      setIsLoading(true);
      return axios
        .get(
          `${MOVIES_API_URL}/search/movie?query=${searchTitle}&page=${
            moviesResult.page + 1
          }&api_key=${MOVIES_API_KEY}`
        )
        .then((result) => {
          setIsLoading(false);
          setMoviesList((old: any) => {
            return [...old, ...result.data.results];
          });
          setMoviesResult(result.data);
          if (result.data.page === moviesResult?.total_pages) {
            setEndOfTheList(true);
          }
        })
        .catch((error) => {
          errorHandler(error);
        });
    }
  };

  useEffect(() => {
    const delayTyping = setTimeout(() => {
      searchMovies();
    }, 500);

    return () => clearTimeout(delayTyping);
  }, [searchTitle]);

  return (
    <Container maxW="container.lg">
      <Center>
        <Stack width="80%">
          <Center>
            <Heading as={"h1"}>Welcome to MovieSearcher</Heading>
          </Center>

          <Searcher
            setMoviesList={setMoviesList}
            setSearchTerm={setSearchTerm}
          ></Searcher>

          {moviesList && (
            <Box width={"100%"} bgColor={"rgba(0, 123, 240, 0.1)"}>
              <List p={12} fontWeight={500}>
                {moviesList?.length && moviesList?.length > 0 ? (
                  moviesList?.map((movie: Movie) => {
                    return <MovieBanner movie={movie}></MovieBanner>;
                  })
                ) : (
                  <Text>Sorry, any movie was found.</Text>
                )}
              </List>
            </Box>
          )}

          {endOfTheList && (
            <Box
              width={"100%"}
              bgColor={"rgba(0, 123, 240, 0.1)"}
              mt={0}
              textAlign={"center"}
            >
              <Text>End of the list.</Text>
            </Box>
          )}

          {errorMessage && <ErrorAlert message={errorMessage}></ErrorAlert>}

          {isLoading && <Loader></Loader>}
        </Stack>
      </Center>
    </Container>
  );
};
