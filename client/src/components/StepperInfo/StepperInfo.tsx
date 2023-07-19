import { Container, Flex, Loader } from "@mantine/core";
import { Suspense, lazy, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { ITrainee } from "../../interfaces/user.interface";
const SelectField = lazy(() => import("./StepOneSelectField"));
const ProvideDetails = lazy(() => import("./StepTwoProvideDetails"));
import { Dispatch, SetStateAction } from "react";
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
      const response: any = await addTrainee(traineeInfo).unwrap();
      dispatch(setUser(response.newAcc));
      navigate("dashboard");
    } catch (error) {}
  };

  return (
    <form onSubmit={addTraineeData}>
      <div className="h-[calc(100vh-100px)] ">
        <Flex justify="center" align="center" className="h-full">
          <Container size="xs">
            <Suspense fallback={<Loader color="gray" />}>
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
