import React, { lazy } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { store } from "./app/store";
import { Provider } from "react-redux";
import "./index.css";

import RootLayout from "./routes/RootLayout";
import { Protected } from "./middleware/Protected";
const Dashboard = lazy(() => import("./routes/Dashboard/Dashboard"));
const TimeSheets = lazy(() => import("./routes/TimeSheets/TimeSheets"));
const Tasks = lazy(() => import("./routes/Tasks/Tasks"));
const DailyTimeRecord = lazy(
  () => import("./routes/DailyTimeRecord/DailyTimeRecord")
);
const Home = lazy(() => import("./routes/Home/Home"));
const ErrorPage = lazy(() => import("./routes/ErrorPage"));

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
      },
      {
        path: "timesheet",
        element: <TimeSheets />,
      },
      {
        path: "tasks",
        element: <Tasks />,
      },
      {
        path: "dtr",
        element: <DailyTimeRecord />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <MantineProvider
        withGlobalStyles
        withNormalizeCSS
        theme={{
          fontFamily: "Lato, sans-serif",
        }}
      >
        <RouterProvider router={router} />
      </MantineProvider>
    </Provider>
  </React.StrictMode>
);
