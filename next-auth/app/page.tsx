'use client';
import { Appbar } from "@/components/Appbar";
import { useSession } from "next-auth/react";

export default function Home() {
  const session = useSession();
  return (
    <div>
      <Appbar/>
      {JSON.stringify(session.data?.user)}
    </div>
  );
}
