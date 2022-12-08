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

const Team = () => {
  const bgColor = useColorModeValue("green.400", "gray.700");
  const colSpan = useBreakpointValue({ base: 2, md: 1 });

  return (
    <VStack
      w="full"
      h="full"
      padding={10}
      spacing={5}
      alignItems="flex-start"
      bg={bgColor}
    >
      <VStack spacing={3} alignItems="flex-start">
        <Heading as="h2" size="xl">
          Team (user) options
        </Heading>
        <Text size="md">
          Remember to use yourself as a provider while it's in beta to not lose
          your funds
        </Text>
      </VStack>
      <SimpleGrid columns={2} columnGap={3} rowGap={6} w="full">
        <GridItem colSpan={2}>
          <Heading as="h3" size="md">
            Challenge another team to a match
          </Heading>
          <Text>Ideally this two would include a search engine</Text>
        </GridItem>
        <GridItem colSpan={colSpan}>
          <FormControl>
            <FormLabel>Address of team to challenge:</FormLabel>
            <Input
              type="text"
              placeholder="Enter wallet of team to challenge"
            ></Input>
          </FormControl>
        </GridItem>
        <GridItem colSpan={colSpan}>
          <FormControl>
            <FormLabel>Address of location provider:</FormLabel>
            <Input
              type="text"
              placeholder="Enter wallet of location provider"
            ></Input>
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <Checkbox>Bet on this challenge</Checkbox>
        </GridItem>
        <GridItem colSpan={2}>
          <Text>Your cost: $25 | Total cost: $50</Text>
        </GridItem>
        <GridItem colSpan={2}>
          <Button size="lg" w="full">
            Send challenge
          </Button>
        </GridItem>
        <GridItem colSpan={2}>
          <Divider />
        </GridItem>

        <GridItem colSpan={2}>
          <Heading as="h3" size="md" py={2}>
            Accept/Decline existing challenge
          </Heading>
          <Text>
            Ideally this would be a selector that reads current existing
            challenges to connected wallet
          </Text>
        </GridItem>

        <GridItem colSpan={2}>
          <FormControl>
            <FormLabel>Challenge ID:</FormLabel>
            <Input type="text" placeholder="Enter challenge ID"></Input>
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <Text>Cost of accepting: $25</Text>
        </GridItem>

        <GridItem colSpan={1}>
          <Button size="lg" w="full" colorScheme="yellow">
            Accept
          </Button>
        </GridItem>
        <GridItem colSpan={1}>
          <Button size="lg" w="full" colorScheme="red">
            Decline
          </Button>
        </GridItem>

        <GridItem colSpan={2}>
          <Divider />
        </GridItem>

        <GridItem colSpan={2}>
          <Heading as="h3" size="md" py={2}>
            Update challenge
          </Heading>
          <Text>
            Ideally this display challenges created by current user to make
            selection easier. Also it shows location price and betted amount
          </Text>
        </GridItem>
        <GridItem colSpan={colSpan}>
          <FormControl>
            <FormLabel>Challenge ID:</FormLabel>
            <Input type="text" placeholder="Enter challenge ID"></Input>
          </FormControl>
        </GridItem>
        <GridItem colSpan={colSpan}>
          <FormControl>
            <FormLabel>Address of new challenged team:</FormLabel>
            <Input
              type="text"
              placeholder="Enter wallet of challenged team"
            ></Input>
          </FormControl>
        </GridItem>
        <GridItem colSpan={2}>
          <Button size="lg" w="full">
            Update challenge
          </Button>
        </GridItem>
      </SimpleGrid>
    </VStack>
  );
};

export default Team;
