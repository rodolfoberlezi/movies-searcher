import React, { FC, ReactElement, useEffect, useState } from "react";
import {
  Center,
  Container,
  Heading,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

export const Home: FC = (): ReactElement => {
  const [searchTitle, setSearchTerm] = useState<String>("");

  useEffect(() => {
    const delayTyping = setTimeout(() => {
      //axios request
      console.log("hellow world");
    }, 500);

    return () => clearTimeout(delayTyping);
  }, [searchTitle]);

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
        </Stack>
      </Center>
    </Container>
  );
};
