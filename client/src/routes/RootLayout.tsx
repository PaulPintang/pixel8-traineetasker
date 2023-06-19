import { EffectCallback, Suspense, useEffect, useRef } from "react";
import { Container } from "@mantine/core";
import { Toaster } from "react-hot-toast";
import { Outlet, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Navigation from "../components/Navigation";
import LoaderFallback from "../components/LoaderFallback";
import StepperInfo from "../components/StepperInfo/StepperInfo";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useRefetchQuery } from "../features/api/account/accountApiSlice";
import { setUser } from "../features/auth/authSlice";
import { socket } from "../utils/socketConnect";

const RootLayout = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { data: account, isLoading, isSuccess } = useRefetchQuery();

  useEffect(() => {
    const refetch = async () => {
      dispatch(setUser(account));
    };
    refetch().then(() => {
      socket.emit("courseRoom", account?.course);
      socket.emit("roleRoom", account?.role);
    });
  }, [account]);

  if (isLoading) return <LoaderFallback />;

  return (
    <Container size="lg">
      <Header />
      <Toaster />
      {user?.course === "" && user?.role === "trainee" ? (
        <StepperInfo />
      ) : (
        <>
          {user && <Navigation />}
          <Suspense>
            <div className="bg-slate-50  bg-opacity-30 w-full px-4 pt-[18px]">
              <Outlet />
            </div>
          </Suspense>
        </>
      )}
    </Container>
  );
};

export default RootLayout;
