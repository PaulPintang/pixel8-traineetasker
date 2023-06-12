import { Suspense } from "react";
import { Container } from "@mantine/core";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import LoaderFallback from "../components/LoaderFallback";
import StepperInfo from "../components/StepperInfo/StepperInfo";
import { useAppSelector } from "../app/hooks";

const RootLayout = () => {
  const { user } = useAppSelector((state) => state.auth);
  return (
    <Container size="lg">
      <Header />
      <Toaster />
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
