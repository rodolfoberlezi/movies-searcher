import React, { FC, ReactElement, useEffect, useState } from "react";
import axios from "axios";
import {
  Alert,
  AlertIcon,
  AlertTitle,
  AlertDescription,
  Box,
  Center,
  Container,
  Flex,
  Heading,
  Img,
  Input,
  InputGroup,
  InputRightElement,
  List,
  ListItem,
  Stack,
  Text,
  Spinner,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { useBottomScrollListener } from "react-bottom-scroll-listener";

import {
  MOVIES_API_KEY,
  MOVIES_API_URL,
  MOVIES_IMG_URL,
} from "../../apis/constants";
import { Movie, MoviesList } from "../../types/movies";

export const Home: FC = (): ReactElement => {
  const [searchTitle, setSearchTerm] = useState<string>("");
  const [moviesList, setMoviesList] = useState<Movie[]>(); // change to

  const [moviesResult, setMoviesResult] = useState<MoviesList>();

  const [errorMessage, setErrorMessage] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [endOfTheList, setEndOfTheList] = useState<boolean>(false);

  useBottomScrollListener(() => {
    loadMoreMovies();
  });

  const searchMovies = async () => {
    setErrorMessage("");
    setEndOfTheList(false);

    if (searchTitle !== "") {
      setIsLoading(true);
      return await axios
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
          setIsLoading(false);
          setErrorMessage(error.response.data.status_message);
        });
    }
  };

  const loadMoreMovies = async () => {
    if (
      moviesResult?.total_pages &&
      moviesResult?.total_pages > 1 &&
      moviesResult?.page !== moviesResult?.total_pages
    ) {
      setIsLoading(true);
      return await axios
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
          setIsLoading(false);
          setErrorMessage(error.response.data.status_message);
        });
    }
  };

  useEffect(() => {
    const delayTyping = setTimeout(async () => {
      searchMovies();
    }, 500);

    return () => clearTimeout(delayTyping);
  }, [searchTitle]);

  const getImage = (url: string) => {
    return `${MOVIES_IMG_URL}${url}`;
  };

  return (
    <Container maxW="container.lg">
      <Center>
        <Stack width="80%">
          <Center>
            <Heading as={"h1"}>Welcome to MovieSearcher</Heading>
          </Center>

          <InputGroup size={"lg"} width="100%" colorScheme={"blue"}>
            <Input
              p={24}
              width="100%"
              onChange={(event: any) => {
                if (event.target.value) {
                  setSearchTerm(event.target.value);
                } else {
                  setSearchTerm(event.target.value);
                  setMoviesList(undefined);
                }
              }}
              placeholder="Search for the Title of a Movie"
            ></Input>
            <InputRightElement
              p={24}
              pointerEvents={"none"}
              children={<SearchIcon />}
            />
          </InputGroup>

          {moviesList && (
            <Box width={"100%"} bgColor={"rgba(0, 123, 240, 0.1)"}>
              <List p={12} fontWeight={500}>
                {moviesList?.length && moviesList?.length > 0 ? (
                  moviesList?.map((movie: Movie) => {
                    return (
                      <ListItem mb={20} border={"solid"} p={8}>
                        <Flex justifyContent={"space-between"}>
                          <Box mr={10}>
                            <Heading>{movie.title}</Heading>
                            <Text>{movie.release_date}</Text>
                          </Box>
                          <Img
                            maxWidth="150px"
                            src={
                              movie.poster_path
                                ? getImage(movie.poster_path)
                                : ""
                            }
                            alt={movie.title}
                          ></Img>
                        </Flex>
                      </ListItem>
                    );
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

          {errorMessage && (
            <Box border="solid 1px red" bgColor={"rgba(255, 0, 0, 0.2)"}>
              <Alert status="error" p={6} flexDirection={"column"}>
                <AlertIcon w={42} color={"red"} mr={5} />
                <AlertTitle fontWeight={500}>
                  Sorry, your search failed.
                </AlertTitle>
                <AlertDescription>{errorMessage}</AlertDescription>
              </Alert>
            </Box>
          )}

          {isLoading && (
            <Box m={10} textAlign={"center"}>
              <Spinner
                w={100}
                h={100}
                thickness="3px"
                speed="0.65s"
                color="gray"
              />
            </Box>
          )}
        </Stack>
      </Center>
    </Container>
  );
};
