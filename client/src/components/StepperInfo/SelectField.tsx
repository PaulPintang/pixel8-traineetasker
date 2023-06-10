import { Box, Text, Title, Button, Stack, Radio, Flex } from "@mantine/core";

const SelectField = () => {
  return (
    <Box component="div">
      <Text c="dimmed">1/2</Text>
      <Title>Select field internship</Title>
      <Text c="dimmed">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem eveniet
        magnam atque illo quam nobis obcaecati iusto animi, magni culpa!
      </Text>
      <Box pt={16}>
        <Text c="dark" pb={10}>
          Our company offer
        </Text>
        <Radio.Group>
          <Stack spacing={10}>
            <Radio value="react" color="cyan" label="Software Development" />
            <Radio value="svelte" color="cyan" label="System Analyst" />
            <Radio value="ng" color="cyan" label="UI/UX Designer" />
          </Stack>
        </Radio.Group>
      </Box>
      <Flex justify="end" pt={70}>
        <Button variant="white" color="cyan">
          Next
        </Button>
      </Flex>
    </Box>
  );
};

export default SelectField;
