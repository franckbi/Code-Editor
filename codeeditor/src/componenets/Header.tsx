"use client";
import { Box, Flex, Link, Spacer, Text } from "@chakra-ui/react";
import React from "react";

export const Header: React.FC = () => {
  return (
    <Box p={4} bg="gray.900" color="white">
      <Flex align="center" maxW="1200px" mx="auto">
        <Link href="./" _hover={{ textDecoration: "none" }}>
          <Text fontSize="xl" fontWeight="bold">
            Code Editor
          </Text>
        </Link>
        <Spacer />
        <Flex gap={4}>
          <Link href="/About" _hover={{ color: "blue.500" }}>
            About Me
          </Link>
          <Link href="/AboutApp" _hover={{ color: "blue.500" }}>
            App Description
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
};
