import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/login.page";

import UserTable from "../pages/users.page";
import MainLayout from "../layout/mainLayout";

export default function RootRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <MainLayout>
                <UserTable />
              </MainLayout>
            }
          ></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route
            path="/USERS"
            element={
              <MainLayout>
                <UserTable />
              </MainLayout>
            }
          ></Route>
          <Route
            path="/SETTINGS"
            element={
              <MainLayout>
                <UserTable />
              </MainLayout>
            }
          ></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
