import { useState } from "react";
import { Outlet } from "react-router";
import Header from "./UI/header";

export default function App() {
  return (
    <>
      <Header />
      <main>
        <Outlet />
      </main>
    </>
  );
}
