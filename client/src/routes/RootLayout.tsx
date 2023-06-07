import { Suspense } from "react";
import { Container } from "@mantine/core";
import { Toaster } from "react-hot-toast";
import { Outlet } from "react-router-dom";
import Header from "../components/Header";
import Navigation from "../components/Navigation";

const RootLayout = () => {
  return (
    <Container>
      <Header />
      <Toaster />
      <Navigation />
      <Suspense fallback={<p>Loading...</p>}>
        <Outlet />{" "}
      </Suspense>
    </Container>
  );
};

export default RootLayout;
