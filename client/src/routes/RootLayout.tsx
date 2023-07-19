import { Suspense, useEffect, useState } from "react";
import { Container } from "@mantine/core";
import { Toaster } from "react-hot-toast";
import { Outlet, useLocation } from "react-router-dom";
import Header from "../components/Header/Header";
import Navigation from "../components/Navigation";
import LoaderFallback from "../components/LoaderFallback";
import StepperInfo from "../components/StepperInfo/StepperInfo";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { useRefetchQuery } from "../features/api/account/accountApiSlice";
import { setUser } from "../features/auth/authSlice";
import { socket } from "../utils/socketConnect";

const RootLayout = () => {
  const location = useLocation();
  const { pathname } = location;
  const dispatch = useAppDispatch();
  const [loadText, setLoadText] = useState("");
  const { user } = useAppSelector((state) => state.auth);
  const { data: account, isLoading } = useRefetchQuery();

  useEffect(() => {
    const refetch = async () => {
      dispatch(setUser(account));
    };
    refetch().catch((err) => console.log(err));
  }, [account]);

  useEffect(() => {
    setLoadText(pathname);
  }, [pathname]);

  if (isLoading) return <LoaderFallback text="Loading . . ." />;

  return (
    <Container size="lg">
      <Header />
      <Toaster />
      {user?.course === "" && user?.role === "trainee" ? (
        <StepperInfo />
      ) : (
        <>
          {user && pathname !== "/" && <Navigation />}
          <Suspense
            fallback={
              <LoaderFallback
                text={`Loading ${loadText.replace("/", "")} . . .`}
              />
            }
          >
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
