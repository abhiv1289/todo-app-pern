import React from "react";
import { Outlet } from "react-router";
import Navbar from "../components/Navbar";

const MainLayout = () => {
  return (
    <>
      Main Layout
      <Navbar />
      <Outlet />
    </>
  );
};

export default MainLayout;
