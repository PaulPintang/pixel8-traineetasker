import { Box, Text, Title, Button, Stack, Radio, Flex } from "@mantine/core";
import { IUser } from "../../interfaces/user.interface";
import { Props } from "./StepperInfo";
import { useState } from "react";

const SelectField = ({ setUserInfo, userInfo }: Props) => {
  const [value, setValue] = useState("developer");
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
        <Radio.Group value={value} onChange={setValue}>
          <Stack spacing={10}>
            <Radio
              value="developer"
              color="cyan"
              label="Software Development"
            />
            <Radio value="System Analyst" color="cyan" label="System Analyst" />
            <Radio value="designer" color="cyan" label="UI/UX Designer" />
          </Stack>
        </Radio.Group>
      </Box>
      <Flex justify="end" pt={70}>
        <Button
          className=""
          onClick={() => setUserInfo({ ...userInfo, course: value })}
          variant="white"
          color="cyan"
        >
          Next
        </Button>
      </Flex>
    </Box>
  );
};

export default SelectField;
