"use client";

import { useState, useRef, useEffect } from "react";
import UploadZip from "@/components/UploadZip/UploadZip";
import { DataTable } from "@/components/Table-Users/data-table";
import { columns } from "@/components/Table-Users/columns";
import { Button } from "@/components/ui/button";
import { CarouselPlugin } from "@/components/Container-Slides";
import ContainerHome from "@/components/Container-Home";
import { PixModal } from "@/components/Pix-Modal";


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
    const [recentUnfollow, setRecentUnfollow] = useState<UserWithDate[]>([]);

  const [payments, setPayments] = useState<Payment[]>([]);
  const [tableTitle, setTableTitle] = useState("");
  const [isComparing, setIsComparing] = useState(false);
  const [visibleTable, setVisibleTable] = useState(false);
  const [showUpload, setShowUpload] = useState(false);

  //  PIX STATE
  const [showPix, setShowPix] = useState(false);
  const [pixKey, setPixKey] = useState("");
  const [copied, setCopied] = useState(false);


  // BUSCAR PIX
  useEffect(() => {
    if (!showPix) return;

    if (!pixKey) {
      fetch("/api/pix")
        .then((r) => r.json())
        .then((data) => setPixKey(data.key ?? "")) 
        .catch(() => setPixKey(""));
    }
  }, [showPix, pixKey]);

  async function copyPix() {
    try {
      await navigator.clipboard.writeText(pixKey);
    } catch {
      const textarea = document.createElement("textarea");
      textarea.value = pixKey;
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      document.body.appendChild(textarea);
      textarea.focus();
      textarea.select();

      try {
        document.execCommand("copy");
      } catch {
        alert("Não foi possível copiar.");
      }

      document.body.removeChild(textarea);
    }

    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }


  const uploadRef = useRef<HTMLDivElement>(null);

  const handleAnalyzeClick = () => {
    setShowUpload(true);
    setVisibleTable(false);
    setTimeout(() => {
      uploadRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 100);
  };

const handleBothLoaded = (
  newFollowers: UserWithDate[],
  newFollowing: UserWithDate[],
  newRecentUnfollow: UserWithDate[],
) => {
  setFollowers(newFollowers);
  setFollowing(newFollowing);
  setRecentUnfollow(newRecentUnfollow);
  setShowUpload(false);
};


  const showFollowersUsers = () => {
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
  };

  const showFollowingUsers = () => {
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
  };

  const showNotFollowingBack = () => {
    const followersSet = new Set(followers.map((f) => f.username));
    const result: Payment[] = following
      .filter((user) => !followersSet.has(user.username))
      .map((user, index) => ({
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
  };

  
const showRecentUnfollow = () => {
  const result: Payment[] = recentUnfollow.map((user, index) => ({
    id: String(index),
    username: user.username,
    hora: user.date,
    link: `https://instagram.com/${user.username}`,
    status: "Não",
  }));

  setIsComparing(false);
  setTableTitle("Pessoas que deixaram de seguir você recentemente");
  setVisibleTable(true);
  setPayments(result);
};

  const showAllUsers = () => {
    const followersSet = new Set(followers.map((f) => f.username));
    const followingSet = new Set(following.map((f) => f.username));
    const allUsersMap = new Map<string, UserWithDate>();

    [...followers, ...following].forEach((user) => {
      allUsersMap.set(user.username, user);
    });

    const result: Payment[] = Array.from(allUsersMap.values())
      .map((user, index) => ({
        id: String(index),
        username: user.username,
        hora: user.date,
        link: `https://instagram.com/${user.username}`,
        status: (
          followingSet.has(user.username) && followersSet.has(user.username)
            ? "Sim"
            : "Não"
        ) as Payment["status"],
      }))
      .sort((a, b) => a.username.localeCompare(b.username, "pt-BR"));

    setIsComparing(true);
    setTableTitle("Todos os usuários");
    setVisibleTable(true);
    setPayments(result);
  };

  const resetVerification = () => {
    setFollowers([]);
    setFollowing([]);
    setRecentUnfollow([])
    setPayments([]);
    setVisibleTable(false);
    setShowUpload(false);
    setTableTitle("");
    setIsComparing(false);
  };

  const followersSet = new Set(followers.map((f) => f.username));
  const notFollowingBackCount = following.filter(
    (user) => !followersSet.has(user.username),
  ).length;

const notRecentUnfollowCount = recentUnfollow.length;

  const totalUsers = new Set([
    ...followers.map((f) => f.username),
    ...following.map((f) => f.username),
  ]).size;

  const bothLoaded = followers.length > 0 && following.length > 0;



  return (
    <div className="flex flex-col gap-8  dark:bg-gray-900 min-h-screen max-w-7xl m-auto md:p-0">
      <CarouselPlugin
        onAnalyzeClick={handleAnalyzeClick}
        onPixClick={() => setShowPix(true)}
      />
        <ContainerHome  onAnalyzeClick={handleAnalyzeClick} />

      <div className="max-w-7xl mx-auto w-full flex flex-col  gap-10 ">


        {visibleTable && (
          <DataTable
            columns={columns(isComparing)}
            data={payments}
            title={tableTitle}
            enableDate={!isComparing}
          />
        )}

        {(!bothLoaded || showUpload) && (
          <div className="flex justify-center animate-fadeIn mt-10">
            <div ref={uploadRef}>
              <UploadZip onBothLoaded={handleBothLoaded} />
            </div>
          </div>
        )}

        {bothLoaded && !showUpload && (
          <div className="flex flex-col px-4 gap-8 animate-fadeIn">

<div className="
  px-4 
  grid 
  grid-cols-1 
  sm:grid-cols-2 
  md:grid-cols-3 
  lg:grid-cols-5 
  gap-6
">              {[
                {
                  label: "Seguidores",
                  value: followers.length,
                  action: showFollowersUsers,
                  color: "bg-blue-50 text-blue-700",
                },
                {
                  label: "Seguindo",
                  value: following.length,
                  action: showFollowingUsers,
                  color: "bg-purple-50 text-purple-700",
                },
                {
                  label: "Não seguem você",
                  value: notFollowingBackCount,
                  action: showNotFollowingBack,
                  color: "bg-red-50 text-red-700",
                },

                                {

 label: "Deixou de seguir",
 value: notRecentUnfollowCount,
 action: showRecentUnfollow,

                  color: "bg-red-50 text-red-700",
                },
                {
                  label: "Total",
                  value: totalUsers,
                  action: showAllUsers,
                  color: "bg-gray-50 text-gray-700",
                },
              ].map((card, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col items-center gap-3 p-6 rounded-2xl border shadow-sm hover:shadow-lg hover:scale-105 transition-transform duration-300 ${card.color}`}
                >
                  <span className="text-sm font-medium">{card.label}</span>
                  <span className="text-3xl font-extrabold">{card.value}</span>
                  <Button className="w-full" onClick={card.action}>
                    Ver lista
                  </Button>
                </div>
              ))}
            </div>

            <div className="flex justify-center mb-10">
              <Button
                variant="outline"
                className="px-8 py-2 hover:bg-gray-100 transition duration-800 hover:cursor-pointer bg-black text-white"
                onClick={resetVerification}
              >
                Fazer nova verificação
              </Button>
            </div>

          </div>
        )}
      </div>





      {/* 🔥 AQUI ESTAVA FALTANDO */}
      <PixModal
        open={showPix}
        onClose={() => setShowPix(false)}
        pixKey={pixKey}
        copied={copied}
        onCopy={copyPix}
      />

    </div>
  );
}