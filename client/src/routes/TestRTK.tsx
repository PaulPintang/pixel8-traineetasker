import React from "react";
import { useGetPokemonByNameQuery } from "../features/api/apiSlice";

const TestRTK = () => {
  const { data, isFetching } = useGetPokemonByNameQuery("bulbasaur");
  return <div>{isFetching ? "hello" : JSON.stringify(data)}</div>;
};

export default TestRTK;
