import React, { FC, ReactElement } from "react";
import { Box, Spinner } from "@chakra-ui/react";

export const Loader: FC = (): ReactElement => {
  return (
    <Box m={10} textAlign={"center"}>
      <Spinner w={100} h={100} thickness="3px" speed="0.65s" color="gray" />
    </Box>
  );
};
