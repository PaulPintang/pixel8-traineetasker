import {
  Box,
  Container,
  Center,
  Text,
  Title,
  Button,
  Stack,
  Radio,
  Group,
  Flex,
  TextInput,
  NumberInput,
} from "@mantine/core";
import { Suspense, lazy } from "react";
const SelectField = lazy(() => import("./SelectField"));
const ProvideDetails = lazy(() => import("./ProvideDetails"));

const StepperInfo = () => {
  return (
    <div className="h-[calc(100vh-100px)] ">
      <Flex justify="center" align="center" className="h-full">
        <Container size="xs">
          <Suspense fallback="dasda">
            <SelectField />
            {/* <ProvideDetails /> */}
          </Suspense>
        </Container>
      </Flex>
    </div>
  );
};

export default StepperInfo;
