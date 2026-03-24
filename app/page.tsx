"use client";

import { useState } from "react";
import UploadZip from "@/components/UploadZip/UploadZip";
import { DataTable } from "../components/payments/data-table";
import { columns } from "../components/payments/columns";
import { Button } from "@/components/ui/button";
import { Tutorial } from "@/components/tutoriais";

type Payment = {
  id: string;
  link: string;
  hora: string;
  status: "Sim" | "Não";
  username: string;
};

type UserWithDate = {
  username: string;
  date: string;
};

export default function Home() {
  const [followers, setFollowers] = useState<UserWithDate[]>([]);
  const [following, setFollowing] = useState<UserWithDate[]>([]);
  const [payments, setPayments] = useState<Payment[]>([]);
  const [tableTitle, setTableTitle] = useState("");
  const [isComparing, setIsComparing] = useState(false);
  const [visibleTable, setVisibleTable] = useState(false);

  // 🔹 estado derivado
  const uploaded = followers.length > 0 && following.length > 0;

  function showFollowers(users: UserWithDate[]) {
    setFollowers(users);
  }

  function showFollowing(users: UserWithDate[]) {
    setFollowing(users);
  }

  function showFollowersUsers() {
  const result: Payment[] = followers.map((user, index) => ({
    id: String(index),
    username: user.username,
    hora: user.date,
    link: `https://instagram.com/${user.username}`,
    status: "Sim",
  }));

  setIsComparing(false);
  setTableTitle("Pessoas que te seguem");
  setVisibleTable(true);
  setPayments(result);
}

  function resetVerification() {
    setFollowers([]);
    setFollowing([]);
    setPayments([]);
    setVisibleTable(false);
  }

  function compareUsers(
    followersList: UserWithDate[],
    followingList: UserWithDate[],
  ) {
    const followersSet = new Set(followersList.map((f) => f.username));

    const notFollowingBack = followingList.filter(
      (user) => !followersSet.has(user.username),
    );

    const result: Payment[] = notFollowingBack.map((user, index) => ({
      id: String(index),
      username: user.username,
      hora: user.date,
      link: `https://instagram.com/${user.username}`,
      status: "Não",
    }));

    setIsComparing(true);
    setTableTitle("Pessoas que não te seguem");
    setVisibleTable(true);
    setPayments(result);
  }

function showFollowingUsers() {
  const result: Payment[] = following.map((user, index) => ({
    id: String(index),
    username: user.username,
    hora: user.date,
    link: `https://instagram.com/${user.username}`,
    status: "Sim",
  }));

  setIsComparing(false);
  setTableTitle("Pessoas que você segue");
  setVisibleTable(true);
  setPayments(result);
}

  function showNotFollowingBack() {
  const followersSet = new Set(followers.map((f) => f.username));

  const notFollowingBack = following.filter(
    (user) => !followersSet.has(user.username)
  );

  const result: Payment[] = notFollowingBack.map((user, index) => ({
    id: String(index),
    username: user.username,
    hora: user.date,
    link: `https://instagram.com/${user.username}`,
    status: "Não",
  }));

  setIsComparing(true);
  setTableTitle("Pessoas que não te seguem de volta");
  setVisibleTable(true);
  setPayments(result);
}

function showAllUsers() {
  const followersSet = new Set(followers.map((f) => f.username));
  const followingSet = new Set(following.map((f) => f.username));

  const allUsersMap = new Map<string, UserWithDate>();

  followers.forEach((user) => {
    allUsersMap.set(user.username, user);
  });

  following.forEach((user) => {
    if (!allUsersMap.has(user.username)) {
      allUsersMap.set(user.username, user);
    }
  });

  const result: Payment[] = Array.from(allUsersMap.values()).map(
    (user, index) => ({
      id: String(index),
      username: user.username,
      hora: user.date,
      link: `https://instagram.com/${user.username}`,
      status: followingSet.has(user.username)
        ? followersSet.has(user.username)
          ? "Sim"
          : "Não"
        : "Sim",
    })
  );

      result.sort((a, b) => a.username.localeCompare(b.username, "pt-BR"));


  setIsComparing(true);
  setTableTitle("Todos os usuários");
  setVisibleTable(true);
  setPayments(result);
}

  const followersSet = new Set(followers.map((f) => f.username));

  const notFollowingBackCount = following.filter(
    (user) => !followersSet.has(user.username),
  ).length;
  const totalUsers = followers.length + following.length;

  return (
<div className="min-h-[80vh]">
    <div className="flex flex-col items-center justify-center gap-8 p-4 mt-1">
      <Tutorial />
        

      {visibleTable && (
        <DataTable
          columns={columns(isComparing)}
          data={payments}
          title={tableTitle}
        />
      )}
      


{/* Upload */}
{!uploaded ? (
<div className="h-full flex flex-col">
      <UploadZip
      onFollowersLoaded={showFollowers}
      onFollowingLoaded={showFollowing}
    />
  </div>
) : (      

  /* Estatísticas */
  <div className={`flex flex-col items-center gap-5 p-4 w-full ${!visibleTable ? "flex flex-col items-center gap-5 p-4 w-full" : ""}`}>
    <div className="grid grid-cols-2 gap-5 w-full sm:grid-cols-2 md:grid-cols-4 md:w-[80%]">
      <div className="flex flex-col justify-between items-center text-center gap-2 md:gap-5 p-3 bg-gray-100 rounded-lg shadow h-full">
        <span className="font-bold">Seguidores: {followers.length}</span>
        <Button onClick={showFollowersUsers}>Ver meus seguidores</Button>
      </div>

      <div className="flex flex-col justify-between items-center text-center gap-2 md:gap-5 p-3 bg-gray-100 rounded-lg shadow h-full">
        <span className="font-bold">Seguindo: {following.length}</span>
        <Button onClick={showFollowingUsers}>Ver quem eu sigo</Button>
      </div>

      <div className="flex flex-col justify-between items-center text-center gap-2 md:gap-5 p-3 bg-gray-100 rounded-lg shadow h-full">
        <span className="font-bold">Não te seguem de volta: {notFollowingBackCount}</span>
        <Button onClick={showNotFollowingBack}>Ver quem não segue</Button>
      </div>

      <div className="flex flex-col justify-between items-center text-center gap-2 md:gap-5 p-3 bg-gray-100 rounded-lg shadow h-full">
        <span className="font-bold">Total: {totalUsers}</span>
        <Button onClick={showAllUsers}>Ver todos</Button>
      </div>
    </div>

    <Button onClick={resetVerification}>Fazer nova verificação</Button>
  </div>
)}
</div>
</div>
)}