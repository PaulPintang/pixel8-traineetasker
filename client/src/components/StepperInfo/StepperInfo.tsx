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
  Loader,
} from "@mantine/core";
import { Suspense, lazy, useReducer, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { IAccount, ITrainee } from "../../interfaces/user.interface";
const SelectField = lazy(() => import("./StepOneSelectField"));
const ProvideDetails = lazy(() => import("./StepTwoProvideDetails"));
import { Dispatch, SetStateAction } from "react";
import LoaderFallback from "../LoaderFallback";
import { useNavigate } from "react-router-dom";
import { useAddTraineeMutation } from "../../features/api/trainee/traineeApiSlice";
import { setUser } from "../../features/auth/authSlice";
export interface Props {
  traineeInfo: ITrainee;
  setTraineeInfo: Dispatch<SetStateAction<ITrainee>>;
  setStep: Dispatch<SetStateAction<number>>;
  isLoading?: boolean;
}

const StepperInfo = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const [traineeInfo, setTraineeInfo] = useState<ITrainee>({
    ...user,
    course: "",
    school: "",
    hours: { ojtHours: 0, pending: 0, rendered: 0 },
  });
  const [step, setStep] = useState(1);

  const [addTrainee, { isLoading }] = useAddTraineeMutation();

  const addTraineeData = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // ? POST request to add trainee after stepper
      const user = await addTrainee(traineeInfo).unwrap();
      dispatch(setUser(user));
      navigate("dashboard");
    } catch (error) {}
  };

  return (
    <form onSubmit={addTraineeData}>
      <div className="h-[calc(100vh-100px)] ">
        <Flex justify="center" align="center" className="h-full">
          <Container size="xs">
            <Suspense fallback={<Loader size="xs" color="gray" />}>
              {step === 1 ? (
                <SelectField
                  traineeInfo={traineeInfo}
                  setTraineeInfo={setTraineeInfo}
                  setStep={setStep}
                />
              ) : (
                <ProvideDetails
                  traineeInfo={traineeInfo}
                  setTraineeInfo={setTraineeInfo}
                  setStep={setStep}
                  isLoading={isLoading}
                />
              )}
            </Suspense>
          </Container>
        </Flex>
      </div>
    </form>
  );
};

export default StepperInfo;
