import React from "react";
import Navbar from "./navbar";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({
  children,
}: {
  children: MainLayoutProps;
}) {
  return (
    <>
      <Navbar />
      {children}
    </>
  );
}
