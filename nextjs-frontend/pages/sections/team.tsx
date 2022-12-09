import {
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Text,
  SimpleGrid,
  GridItem,
  Checkbox,
  Button,
  Divider,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { useState } from "react";
import { useAccount } from "wagmi";
import CreateChallenge from "../buttons/CreateChallenge";
import AcceptChallenge from "../buttons/AcceptChallenge";
import DeclineChallenge from "../buttons/DeclineChallenge";
import CancelChallenge from "../buttons/CancelChallenge";
import UpdateChallenge from "../buttons/UpdateChallenge";
import UpdateLocationProvider from "../buttons/UpdateLocationProvider";
import abi from "../constants/abi.json";

const Team = () => {
  const bgColor = useColorModeValue("yellow.400", "gray.700");
  const colSpan = useBreakpointValue({ base: 2, md: 1 });

  const { address } = useAccount();

  const [challengeId, setChallengeId] = useState("");
  const onChangeChallengeId = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChallengeId(event.target.value);
  };

  return (
    <VStack
      w="full"
      h="full"
      padding={5}
      spacing={5}
      alignItems="flex-start"
      bg={bgColor}
    >
      <VStack spacing={3} alignItems="flex-start">
        <Heading as="h2" size="xl">
          Team
        </Heading>
      </VStack>

      <SimpleGrid columns={2} columnGap={3} rowGap={3} w="full">
        <GridItem colSpan={colSpan}>
          <CreateChallenge />
        </GridItem>

        {/* Accept/Decline section */}
        <GridItem colSpan={colSpan}>
          <GridItem colSpan={2}>
            <Heading as="h3" size="md">
              Respond to a challenge
            </Heading>
          </GridItem>

          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Challenge ID:</FormLabel>
              <Input
                value={challengeId}
                onChange={onChangeChallengeId}
                type="number"
                placeholder="Enter challenge ID"
              ></Input>
            </FormControl>
          </GridItem>

          <GridItem colSpan={2}>
            <Text>
              Cost of accepting: <strong>0.001 ETH</strong>
            </Text>
          </GridItem>

          <GridItem colSpan={1} marginY={3}>
            <AcceptChallenge challengeId={challengeId} />
          </GridItem>

          <GridItem colSpan={1}>
            <DeclineChallenge challengeId={challengeId} />
          </GridItem>
        </GridItem>

        <GridItem colSpan={2}>
          <Divider />
        </GridItem>

        <GridItem colSpan={colSpan}>
          <UpdateLocationProvider />
        </GridItem>

        <GridItem colSpan={colSpan}>
          <UpdateChallenge />
        </GridItem>
        {/* Update challenge section */}

        <GridItem colSpan={2}>
          <Divider />
        </GridItem>

        {/* Cancel challenge section */}
        <GridItem colSpan={2}>
          <CancelChallenge />
        </GridItem>
      </SimpleGrid>
    </VStack>
  );
};

export default Team;
