import { Suspense, useEffect } from "react";
import { Container } from "@mantine/core";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import LoaderFallback from "../components/LoaderFallback";
import StepperInfo from "../components/StepperInfo/StepperInfo";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useRefetchMutation } from "../features/api/user/userApiSlice";
import { setUser } from "../features/auth/authSlice";

const RootLayout = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [refetchLogin] = useRefetchMutation();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const refetch = async () => {
      console.log("refetch run");
      const acc = await refetchLogin({ email: user?.email }).unwrap();
      dispatch(setUser(acc));
    };

    user && refetch().catch((err) => console.log(err));
  }, []);

  return (
    <Container size="lg">
      <Header />
      <Toaster />
      {/* CHECK IF ACCOUNT ROLE IS SPECIFY */}
      {user?.role === "" ? (
        <StepperInfo />
      ) : (
        <Suspense fallback={<LoaderFallback />}>
          {user && <Navigation />}
          <div className="bg-slate-50  bg-opacity-30 w-full px-4 pt-[18px]">
            <Outlet />
          </div>
        </Suspense>
      )}
    </Container>
  );
};

export default RootLayout;
