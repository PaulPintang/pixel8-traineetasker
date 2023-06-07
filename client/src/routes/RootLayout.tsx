import { Suspense } from "react";
import { Container } from "@mantine/core";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navigation from "../components/Navigation";
import LoaderFallback from "../components/LoaderFallback";

const RootLayout = () => {
  return (
    <Container size="lg">
      <Header />
      <Toaster />
      <Navigation />
      <Suspense fallback={<LoaderFallback />}>
        <div className="bg-slate-50  bg-opacity-30 w-full border-gray-100 px-4 pt-[18px]">
          <Outlet />
        </div>
      </Suspense>
    </Container>
  );
};

export default RootLayout;
