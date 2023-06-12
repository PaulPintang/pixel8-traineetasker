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
import { Suspense, lazy, useState } from "react";
import { useAppSelector } from "../../app/hooks";
import { IUser } from "../../interfaces/user.interface";
const SelectField = lazy(() => import("./SelectField"));
const ProvideDetails = lazy(() => import("./ProvideDetails"));
import { Dispatch, SetStateAction } from "react";
import LoaderFallback from "../LoaderFallback";
export interface Props {
  userInfo: IUser;
  setUserInfo: Dispatch<SetStateAction<IUser>>;
}

const StepperInfo = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [userInfo, setUserInfo] = useState<IUser>({ ...user });
  return (
    <div className="h-[calc(100vh-100px)] ">
      <Flex justify="center" align="center" className="h-full">
        <Container size="xs">
          <Suspense fallback={<Loader size="xs" color="gray" />}>
            {userInfo?.course === "" ? (
              <SelectField userInfo={userInfo} setUserInfo={setUserInfo} />
            ) : (
              <ProvideDetails userInfo={userInfo} setUserInfo={setUserInfo} />
            )}
          </Suspense>
        </Container>
      </Flex>
    </div>
  );
};

export default StepperInfo;
