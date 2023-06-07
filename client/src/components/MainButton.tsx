import { Button } from "@mantine/core";
import React from "react";

type Child = {
  children: React.ReactNode;
};

const MainButton = ({ children }: Child) => {
  return (
    <Button size="sm" radius={0} color="cyan">
      {children}
    </Button>
  );
};

export default MainButton;
