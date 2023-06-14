import { EffectCallback, Suspense, useEffect, useRef } from "react";
import { Container } from "@mantine/core";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import LoaderFallback from "../components/LoaderFallback";
import StepperInfo from "../components/StepperInfo/StepperInfo";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useRefetchMutation } from "../features/api/account/accountApiSlice";
import { setUser } from "../features/auth/authSlice";
import { useGetTraineeQuery } from "../features/api/trainee/traineeApiSlice";

const RootLayout = () => {
  const mounted = useRef(true);
  const { user } = useAppSelector((state) => state.auth);
  const [refetchLogin] = useRefetchMutation();
  const dispatch = useAppDispatch();

  // useEffect(() => {
  //   const refetch = async () => {
  //     const acc = await refetchLogin({ email: user?.email }).unwrap();
  //     dispatch(setUser(acc));
  //   };
  //   if (!user) {
  //     console.log("da user");

  //     refetch().catch((err) => console.log(err));
  //   }
  // }, []);

  return (
    <Container size="lg">
      <Header />
      <Toaster />
      {user?.course === "" && user?.role === "trainee" ? (
        <StepperInfo />
      ) : (
        <Suspense fallback={<LoaderFallback />}>
          {user && user?.role !== "admin" ? <Navigation /> : ""}
          <div className="bg-slate-50  bg-opacity-30 w-full px-4 pt-[18px]">
            <Outlet />
          </div>
        </Suspense>
      )}
    </Container>
  );
};

export default RootLayout;
