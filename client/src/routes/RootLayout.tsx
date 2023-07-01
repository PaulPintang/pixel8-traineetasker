import { EffectCallback, Suspense, useEffect, useRef } from "react";
import { Container } from "@mantine/core";
import { Toaster } from "react-hot-toast";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header/Header";
import Navigation from "../components/Navigation";
import LoaderFallback from "../components/LoaderFallback";
import StepperInfo from "../components/StepperInfo/StepperInfo";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useRefetchQuery } from "../features/api/account/accountApiSlice";
import { setUser } from "../features/auth/authSlice";
import { JoinRoom, socket } from "../utils/socketConnect";

const RootLayout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { data: account, isLoading, isSuccess } = useRefetchQuery();

  useEffect(() => {
    const refetch = async () => {
      dispatch(setUser(account));
    };
    refetch().catch((err) => console.log(err));
  }, [account]);

  if (isLoading) return <LoaderFallback text="Preparing your dashboard" />;

  return (
    <Container size="lg">
      <Header />
      <Toaster />
      {user?.course === "" && user?.role === "trainee" ? (
        <StepperInfo />
      ) : (
        <>
          {user && pathname !== "/" && <Navigation />}
          <Suspense>
            {/* <div className="bg-slate-50  bg-opacity-30 w-full px-4 pt-[18px]"> */}
            <div
              className={`bg-opacity-30 w-full md:px-4 lg:px-4 px-2 pt-[18px] ${
                pathname !== "/" ? "bg-slate-50" : ""
              }`}
            >
              <Outlet />
            </div>
          </Suspense>
        </>
      )}
    </Container>
  );
};

export default RootLayout;
