"use client";
import { useSession, signOut } from "next-auth/react";

const Private = () => {
  const session = useSession();
  console.log(session);

  return (
    <div>
      Private
      <button onClick={() => signOut({ callbackUrl: "/" })}></button>
    </div>
  );
};

export default Private;
