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

const StepTwoProvideDetails = ({
  setTraineeInfo,
  traineeInfo,
  setStep,
  isLoading,
}: Props) => {
  return (
    <Box component="div">
      <Text c="dimmed">2/2</Text>
      <Title>Provide your information</Title>
      <Text c="dimmed">
        We kindly request your OJT needed hours and school/university name.
        Thank you for considering us as a part of your professional development!
      </Text>
      <Box pt={16}>
        <Stack spacing={10}>
          <TextInput
            label="School / University"
            size="md"
            value={traineeInfo.school}
            onChange={(e) =>
              setTraineeInfo({ ...traineeInfo, school: e.target.value })
            }
          />
          <NumberInput
            label="OJT / Internship hours"
            size="md"
            hideControls
            value={traineeInfo.hours?.ojtHours}
            onChange={(value) =>
              setTraineeInfo({
                ...traineeInfo,
                hours: { ...traineeInfo.hours!, ojtHours: Number(value) },
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
          {traineeInfo.school !== "" && traineeInfo.hours?.ojtHours !== 0 ? (
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
