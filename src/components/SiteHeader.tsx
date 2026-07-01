"use client";

import { Box, Flex, HStack, Text, Icon } from "@chakra-ui/react";
import { HeartPulse } from "lucide-react";
import NextLink from "next/link";

export function SiteHeader() {
  return (
    <Box
      as="header"
      position="sticky"
      top={0}
      zIndex={10}
      bg="rgba(255,255,255,0.8)"
      backdropFilter="blur(10px)"
      borderBottom="1px solid"
      borderColor="blackAlpha.100"
    >
      <Flex
        maxW="1120px"
        mx="auto"
        px={{ base: 5, md: 8 }}
        h="64px"
        align="center"
        justify="space-between"
      >
        <HStack as={NextLink} gap={2.5} aria-label="CardioRisk home" asChild >
         <NextLink href="/" >
          <Flex
            w="36px"
            h="36px"
            align="center"
            justify="center"
            bg="brand.500"
            color="white"
            borderRadius="l1"
          >
            <Icon as={HeartPulse} boxSize={5} />
          </Flex>
          <Text fontWeight="800" fontSize="lg" letterSpacing="-0.02em">
            CardioPredictor
          </Text>
           </NextLink>
        </HStack>
        <HStack gap={6} fontSize="sm" fontWeight="600" color="fg.muted">
          <Text as={NextLink} _hover={{ color: "brand.600" }} asChild>
            <NextLink href="/">Home</NextLink>
          </Text>
          <Text as={NextLink} _hover={{ color: "brand.600" }} asChild>
            <NextLink href="/calculator">Calculator</NextLink>
          </Text>
          <Text as={NextLink} _hover={{ color: "brand.600" }} asChild>
            <NextLink href="/research">Research</NextLink>
          </Text>
         
        </HStack>
      </Flex>
    </Box>
  );
}
