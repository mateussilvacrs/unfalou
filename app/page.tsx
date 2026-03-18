"use client";

import { useState } from "react";
import UploadJson from "@/components/HandleFile";
import { Button } from "@/components/ui/button";
import { DataTable } from "./payments/data-table";
import { columns } from "./payments/columns";

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

  function showFollowers(users: UserWithDate[]) {
    setIsComparing(false);
    setTableTitle("Pessoas que te seguem");
    setFollowers(users);
    setVisibleTable(true);

    const list: Payment[] = users.map((user, index) => ({
      id: String(index),
      username: user.username,
      hora: user.date,
      link: `https://instagram.com/${user.username}`,
      status: "Sim",
    }));

    setPayments(list);
  }

  function showFollowing(users: UserWithDate[]) {
    setIsComparing(false);
    setTableTitle("Pessoas que você segue");
    setFollowing(users);
    setVisibleTable(true);

    const list: Payment[] = users.map((user, index) => ({
      id: String(index),
      username: user.username,
      hora: user.date,
      link: `https://instagram.com/${user.username}`,
      status: "Sim",
    }));

    setPayments(list);
  }

  function compareUsers() {
    setIsComparing(true);
    setTableTitle("Pessoas que não te seguem");
    setVisibleTable(true);

    const followersSet = new Set(followers.map((f) => f.username));

    const notFollowingBack = following.filter(
      (user) => !followersSet.has(user.username),
    );

    const result: Payment[] = notFollowingBack.map((user, index) => ({
      id: String(index),
      username: user.username,
      hora: user.date,
      link: `https://instagram.com/${user.username}`,
      status: "Não",
    }));

    setPayments(result);
  }

  function showAllUsers() {
    setIsComparing(true);
    setTableTitle("Todos os usuários");
    setVisibleTable(true);

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
      }),
    );

    result.sort((a, b) => a.username.localeCompare(b.username, "pt-BR"));

    setPayments(result);
  }

  return (
    <div className="flex flex-col items-center justify-center gap-8 p-2 min-h-[80%]">
      {/* UPLOADS */}
      <div className="flex gap-5 flex-wrap items-center justify-center">
        <UploadJson type="followers" onUsersLoaded={showFollowers} />

        <UploadJson type="following" onUsersLoaded={showFollowing} />
      </div>

      {/* BOTÕES */}
      <div className="flex gap-2 flex-col justify-center">
        <Button
          onClick={compareUsers}
          disabled={!followers.length || !following.length}
        >
          Ver quem não me segue de volta!
        </Button>

        <Button
          onClick={showAllUsers}
          disabled={!followers.length || !following.length}
        >
          Ver todos
        </Button>
      </div>

      {/* TABELA */}
      {visibleTable && (
        <DataTable
          columns={columns(isComparing)}
          data={payments}
          title={tableTitle}
        />
      )}
    </div>
  );
}
