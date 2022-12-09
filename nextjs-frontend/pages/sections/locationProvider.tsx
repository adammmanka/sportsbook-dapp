import {
  VStack,
  Heading,
  useColorModeValue,
  SimpleGrid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Button,
  Divider,
  useBreakpointValue,
} from "@chakra-ui/react";
import CompleteChallenge from "../buttons/CompleteChallenge";
import StartChallenge from "../buttons/StartChallenge";
import ReadIsStarted from "../buttons/ReadIsStarted";

const LocationProvider = () => {
  const bgColor = useColorModeValue("green.400", "gray.600");
  const colSpan = useBreakpointValue({ base: 2, md: 1 });

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
          Location provider
        </Heading>

        <SimpleGrid columns={2} columnGap={3} rowGap={3} w="full">
          <StartChallenge />

          <GridItem colSpan={2}>
            <Divider />
          </GridItem>

          <CompleteChallenge />
        </SimpleGrid>
      </VStack>
    </VStack>
  );
};

export default LocationProvider;
