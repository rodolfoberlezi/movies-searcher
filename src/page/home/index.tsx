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
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

import {
  MOVIES_API_KEY,
  MOVIES_API_URL,
  MOVIES_IMG_URL,
} from "../../apis/constants";
import { Movie, MoviesList } from "../../types/movies";

export const Home: FC = (): ReactElement => {
  const [searchTitle, setSearchTerm] = useState<string>("");
  const [moviesList, setMoviesList] = useState<MoviesList>();

  const [showError, setShowError] = useState<boolean>(false);

  const searchMovies = async () => {
    return await axios
      .get(
        `${MOVIES_API_URL}/search/movie?query=${searchTitle}&api_key=${MOVIES_API_KEY}`
      )
      .then((result) => {
        console.log(result.data);
        setMoviesList(result.data);
        return result.data;
      })
      .catch((error) => {
        setShowError(true);
        return error;
      });
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
          <Center>
            <InputGroup size={"lg"} width="100%">
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
          </Center>

          {moviesList && (
            <Box width={"100%"} bg={"gray"}>
              <List p={12} fontWeight={500}>
                {moviesList?.results?.length &&
                moviesList?.results?.length > 0 ? (
                  moviesList?.results?.map((movie: Movie) => {
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

          {showError ?? (
            <Alert status="error">
              <AlertIcon />
              <AlertTitle>Sorry, your search failed.</AlertTitle>
              <AlertDescription>
                Please reset the page and try again.
              </AlertDescription>
            </Alert>
          )}
        </Stack>
      </Center>
    </Container>
  );
};
