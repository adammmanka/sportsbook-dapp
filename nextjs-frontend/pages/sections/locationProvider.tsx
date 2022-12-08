import {
  VStack,
  Heading,
  Text,
  useColorModeValue,
  SimpleGrid,
  GridItem,
  FormControl,
  FormLabel,
  Input,
  Checkbox,
  Button,
  Divider,
  useBreakpointValue,
} from "@chakra-ui/react";

const LocationProvider = () => {
  const bgColor = useColorModeValue("yellow.400", "gray.600");
  const colSpan = useBreakpointValue({ base: 2, md: 1 });

  return (
    <VStack
      w="full"
      h="full"
      padding={10}
      spacing={10}
      alignItems="flex-start"
      bg={bgColor}
    >
      {" "}
      <VStack spacing={3} alignItems="flex-start">
        <Heading as="h2" size="xl">
          Location provider
        </Heading>
        <Text size="md">
          Remember to use yourself as a provider while it's in beta to not lose
          your funds
        </Text>

        <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
          <GridItem colSpan={2}>
            <Heading as="h3" size="md">
              Set a challenge as started
            </Heading>
            <Text>Is this function really necessary?</Text>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Challenge ID:</FormLabel>
              <Input type="text" placeholder="Enter challenge ID"></Input>
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <Button colorScheme="brand" size="lg" w="full">
              Start challenge
            </Button>
          </GridItem>

          <GridItem colSpan={2}>
            <Divider />
          </GridItem>

          <GridItem colSpan={2}>
            <Heading as="h3" size="md">
              Set a challenge as completed
            </Heading>
            <Text>
              It would be nice to display team's names to avoid confusions
            </Text>
          </GridItem>
          <GridItem colSpan={2}>
            <FormControl>
              <FormLabel>Challenge ID:</FormLabel>
              <Input type="text" placeholder="Enter challenge ID"></Input>
            </FormControl>
          </GridItem>
          <GridItem colSpan={colSpan}>
            <FormControl>
              <FormLabel>Team 1 result:</FormLabel>
              <Input type="text" placeholder="Enter team 1 result"></Input>
            </FormControl>
          </GridItem>
          <GridItem colSpan={colSpan}>
            <FormControl>
              <FormLabel>Team 2 result:</FormLabel>
              <Input type="text" placeholder="Enter team 2 result"></Input>
            </FormControl>
          </GridItem>
          <GridItem colSpan={2}>
            <Button colorScheme="brand" size="lg" w="full">
              Complete challenge
            </Button>
          </GridItem>
        </SimpleGrid>
      </VStack>
    </VStack>
  );
};

export default LocationProvider;
