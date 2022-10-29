import React, { FC, ReactElement, useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Center,
  Container,
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

import { MOVIES_API_KEY, MOVIES_API_URL } from "../../apis/constants";
import { Movie, MoviesList } from "../../types/movies";

export const Home: FC = (): ReactElement => {
  const [searchTitle, setSearchTerm] = useState<string>("");
  const [moviesList, setMoviesList] = useState<MoviesList>();

  const searchMovies = async () => {
    return await axios
      .get(
        `${MOVIES_API_URL}/search/movie?query=pantera&api_key=${MOVIES_API_KEY}`
      )
      .then((result) => {
        console.log(result.data);
        setMoviesList(result.data);
        return result.data;
      });
  };

  useEffect(() => {
    const delayTyping = setTimeout(async () => {
      searchMovies();
    }, 500);

    return () => clearTimeout(delayTyping);
  }, [searchTitle]);

  // getImage

  return (
    <Container maxW="container.lg">
      <Center>
        <Stack>
          <Heading as="h1">Welcome to MovieSearcher</Heading>
          <InputGroup size={"lg"} width="100%">
            <Input
              p={24}
              width="100%"
              onChange={(event: any) => {
                setSearchTerm(event.target.value);
              }}
              placeholder="Search for the title of a movie"
            ></Input>
            <InputRightElement
              p={24}
              pointerEvents={"none"}
              children={<SearchIcon />}
            />
          </InputGroup>

          <Box bg={"gray"} p={12}>
            <List>
              {moviesList?.results?.map((movie: Movie) => {
                return (
                  <ListItem>
                    <Heading>{movie.title}</Heading>
                    <Text>{movie.release_date}</Text>
                    {/* <Img src={movie?.poster_path}></Img> */}
                  </ListItem>
                );
              })}
            </List>
          </Box>
        </Stack>
      </Center>
    </Container>
  );
};
