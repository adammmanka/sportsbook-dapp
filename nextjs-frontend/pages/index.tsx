import { ConnectButton } from "@rainbow-me/rainbowkit";
import { useAccount } from "wagmi";
import {
  Container,
  Box,
  Heading,
  Text,
  Input,
  Button,
  Flex,
  VStack,
  HStack,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";
import type { NextPage } from "next";
import { useIsMounted } from "./hooks/useIsMounted";
import Team from "./sections/team";
import LocationProvider from "./sections/locationProvider";
import Head from "next/head";

const Home: NextPage = () => {
  const { toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue("gray.100", "black.100");

  const mounted = useIsMounted();
  const { address } = useAccount();

  return (
    <>
      <Head>
        <title>Sportsbook</title>
        <meta name="description" content="Made with love by Lulox" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Container maxW="container.xl" p={0} bg={bgColor} centerContent>
        <HStack
          justifyContent="space-between"
          alignItems="center"
          w="full"
          px={10}
        >
          <Heading marginTop={5} as="h1" size="3xl">
            Sportsbook ⚽
          </Heading>

          <Button
            onClick={toggleColorMode}
            marginTop={5}
            variant="link"
            colorScheme="black"
          >
            Dark theme?
          </Button>
          <ConnectButton label="Connect Web3 Wallet" chainStatus={"none"} />
        </HStack>
        {mounted
          ? address && (
              <Flex
                h={{ base: "auto", md: "full" }}
                py={[0, 5, 2]}
                direction={{ base: "column", md: "row" }}
              >
                <Team />
                <LocationProvider />
              </Flex>
            )
          : null}
      </Container>
    </>
  );
};

export default Home;
