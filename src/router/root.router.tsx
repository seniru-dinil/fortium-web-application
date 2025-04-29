import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "../pages/login.page";
import HomePage from "../pages/home.page";
import UserTable from "../pages/users.page";

export default function RootRouter() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/home" element={<HomePage />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/users" element={<UserTable />}></Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}
