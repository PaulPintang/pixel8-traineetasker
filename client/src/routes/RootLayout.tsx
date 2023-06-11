import { Suspense } from "react";
import { Container } from "@mantine/core";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import LoaderFallback from "../components/LoaderFallback";
import ProvideDetails from "../components/StepperInfo/ProvideDetails";
import StepperInfo from "../components/StepperInfo/StepperInfo";
import TestRTK from "./TestRTK";

const RootLayout = () => {
  return (
    <Container size="lg">
      <Header />
      <Toaster />
      <Suspense fallback={<LoaderFallback />}>
        <Navigation />
        {/* <div className="pt-[18px]"> */}
        <div className="bg-slate-50  bg-opacity-30 w-full px-4 pt-[18px]">
          {/* <Outlet /> */}
        </div>
        {/* <StepperInfo /> */}
        <TestRTK />
      </Suspense>
    </Container>
  );
};

export default RootLayout;
