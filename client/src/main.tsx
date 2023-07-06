import React, { Suspense, lazy } from "react";
import ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { MantineProvider } from "@mantine/core";
import { store } from "./app/store";
import { Provider } from "react-redux";
import "./index.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

import RootLayout from "./routes/RootLayout";
import { Protected } from "./middleware/Protected";
import Profile from "./routes/Profile/Profile";
import useDocumentTitle from "./hooks/useDocumentTitle";
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
        element: (
          <Protected>
            <Suspense fallback={<h1>Preparing yoyr dashboard</h1>}>
              <Dashboard />
            </Suspense>
          </Protected>
        ),
      },
      {
        path: "timesheet",
        element: (
          <Protected>
            <TimeSheets />
          </Protected>
        ),
      },
      {
        path: "tasks",
        element: (
          <Protected>
            <Tasks />
          </Protected>
        ),
      },
      {
        path: "dtr",
        element: (
          <Protected>
            <DailyTimeRecord />
          </Protected>
        ),
      },
      {
        path: "profile/:id",
        element: (
          <Protected>
            <Profile />
          </Protected>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <Provider store={store}>
      <GoogleOAuthProvider clientId={import.meta.env.VITE_OAUTH_CLIENT_ID}>
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            fontFamily: "Lato, sans-serif",
          }}
        >
          <RouterProvider router={router} />
        </MantineProvider>
      </GoogleOAuthProvider>
    </Provider>
  </React.StrictMode>
);
