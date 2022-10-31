import React, { FC, ReactElement } from "react";
import {
  Alert,
  AlertDescription,
  AlertIcon,
  AlertTitle,
  Box,
} from "@chakra-ui/react";

interface ErrorAlertProps {
  message: string;
}

export const ErrorAlert: FC<ErrorAlertProps> = ({ message }): ReactElement => {
  return (
    <Box border="solid 1px red" bgColor={"rgba(255, 0, 0, 0.2)"}>
      <Alert status="error" p={6} flexDirection={"column"}>
        <AlertIcon w={42} color={"red"} mr={5} />
        <AlertTitle fontWeight={500}>Sorry, your search failed.</AlertTitle>
        <AlertDescription>{message}</AlertDescription>
      </Alert>
    </Box>
  );
};
