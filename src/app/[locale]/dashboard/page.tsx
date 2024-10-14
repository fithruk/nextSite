"use client";
import { useSession, signOut } from "next-auth/react";
import DashboardLayout from "./layout";

const Dashboard = () => {
  const session = useSession();
  console.log(session);

  return <DashboardLayout />;
};

export default Dashboard;
