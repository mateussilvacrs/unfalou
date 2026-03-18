"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type UploadJsonProps = {
  type: "followers" | "following";
  onUsersLoaded: (users: UserWithDate[]) => void;
};

type UserWithDate = {
  username: string;
  date: string;
};

// 🔹 Representa o usuário no JSON do Instagram
type InstagramUser = {
  href?: string;
  value?: string;
  timestamp?: number;
};

// 🔹 Estrutura principal do JSON
type InstagramData = {
  title?: string;
  string_list_data: InstagramUser[];
};

// 🔹 Tipos dos arquivos exportados
type FollowersJson = {
  relationships_followers: InstagramData[];
};

type FollowingJson = {
  relationships_following: InstagramData[];
};

export default function UploadJson({ type, onUsersLoaded }: UploadJsonProps) {
  const [file, setFile] = useState<File | null>(null);

  function handleSelect(event: React.ChangeEvent<HTMLInputElement>) {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) setFile(selectedFile);
  }

  // 🔥 Função principal corrigida
  function extractUsers(
    json: InstagramData[] | FollowersJson | FollowingJson,
  ): UserWithDate[] {
    const extract = (data: InstagramData[]) =>
      data.flatMap((item) =>
        item.string_list_data.map((user) => ({
          username: user.value ?? item.title ?? "",
          date: user.timestamp
            ? new Date(user.timestamp * 1000).toLocaleDateString("pt-BR")
            : "",
        })),
      );

    if (Array.isArray(json)) return extract(json);

    if ("relationships_followers" in json) {
      return extract(json.relationships_followers);
    }

    if ("relationships_following" in json) {
      const data = json.relationships_following;

      if (Array.isArray(data)) {
        return extract(data);
      }

      // caso venha como objeto
      return extract([data]);
    }

    return [];
  }

  function handleUpload() {
    if (!file) return;

    const reader = new FileReader();

    reader.onload = (e) => {
      const text = e.target?.result as string;
      const json = JSON.parse(text);

      const users = extractUsers(json);

      console.log("Usuarios carregados:", users);

      onUsersLoaded(users);
    };

    reader.readAsText(file);
  }

  return (
    <div>
      <div className="flex flex-col items-center gap-3 border p-4 rounded-md">
        <p className="font-bold">
          Upload {type === "followers" ? "Followers" : "Following"}
        </p>

        <Input type="file" accept=".json" onChange={handleSelect} />

        <Button onClick={handleUpload}>
          {type === "followers" ? "Ver seguidores" : "Ver quem eu sigo"}
        </Button>
      </div>
    </div>
  );
}
