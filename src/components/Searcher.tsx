import React, { FC, ReactElement } from "react";
import { Input, InputGroup, InputRightElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";

interface SearcherProps {
  setSearchTerm: (data: any) => void;
  setMoviesList: (data: any) => void;
}

export const Searcher: FC<SearcherProps> = ({
  setMoviesList,
  setSearchTerm,
}): ReactElement => {
  return (
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
  );
};
