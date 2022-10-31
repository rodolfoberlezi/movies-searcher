import React, { FC, ReactElement } from "react";
import { Box, Flex, Heading, Img, ListItem, Text } from "@chakra-ui/react";

import { MOVIES_IMG_URL } from "../apis/constants";
import { Movie } from "../types/movies";

interface MovieBannerProps {
  movie: Movie;
}

export const MovieBanner: FC<MovieBannerProps> = ({ movie }): ReactElement => {
  const getImage = (url: string) => {
    return `${MOVIES_IMG_URL}${url}`;
  };

  return (
    <ListItem mb={20} border={"solid"} p={8}>
      <Flex justifyContent={"space-between"}>
        <Box mr={10}>
          <Heading>{movie.title}</Heading>
          <Text>{movie.release_date}</Text>
        </Box>
        <Img
          maxWidth="150px"
          src={movie.poster_path ? getImage(movie.poster_path) : ""}
          alt={movie.title}
        ></Img>
      </Flex>
    </ListItem>
  );
};
