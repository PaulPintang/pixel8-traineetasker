import {
  Box,
  Text,
  Title,
  Button,
  Stack,
  Group,
  Flex,
  TextInput,
  NumberInput,
} from "@mantine/core";

const ProvideDetails = () => {
  return (
    <Box component="div">
      <Text c="dimmed">2/2</Text>
      <Title>Provide your information</Title>
      <Text c="dimmed">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem eveniet
        magnam atque illo quam nobis obcaecati iusto animi, magni culpa!
      </Text>
      <Box pt={16}>
        <Stack spacing={10}>
          <TextInput label="School / University" size="md" />
          <NumberInput label="OJT / Internship hours" size="md" hideControls />
        </Stack>
      </Box>
      <Flex justify="end" pt={70}>
        <Group spacing={0}>
          <Button variant="white" color="gray" p={0}>
            Return
          </Button>
          {/* <Button variant="white" color="cyan">
                  Next
                </Button> */}
          <Button variant="white" color="cyan">
            Done
          </Button>
        </Group>
      </Flex>
    </Box>
  );
};

export default ProvideDetails;
