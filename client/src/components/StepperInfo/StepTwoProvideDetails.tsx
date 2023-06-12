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
import { Props } from "./StepperInfo";
import { useAppDispatch } from "../../app/hooks";
import { setUser } from "../../features/auth/authSlice";
import { useNavigate } from "react-router-dom";

const StepTwoProvideDetails = ({
  setUserInfo,
  userInfo,
  setStep,
  isLoading,
}: Props) => {
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
          <TextInput
            label="School / University"
            size="md"
            value={userInfo.school}
            onChange={(e) =>
              setUserInfo({ ...userInfo, school: e.target.value })
            }
          />
          <NumberInput
            label="OJT / Internship hours"
            size="md"
            hideControls
            value={userInfo.hours?.ojtHours}
            onChange={(value) =>
              setUserInfo({
                ...userInfo,
                hours: { ...userInfo.hours!, ojtHours: Number(value) },
              })
            }
          />
        </Stack>
      </Box>
      <Flex justify="end" pt={70}>
        <Group spacing={0}>
          {!isLoading && (
            <Button
              onClick={() => setStep(1)}
              variant="white"
              color="gray"
              p={0}
            >
              Return
            </Button>
          )}
          {userInfo.school !== "" && userInfo.hours?.ojtHours !== 0 ? (
            <Button
              variant="white"
              color="cyan"
              type="submit"
              loading={isLoading}
            >
              Done
            </Button>
          ) : (
            ""
          )}
        </Group>
      </Flex>
    </Box>
  );
};

export default StepTwoProvideDetails;
