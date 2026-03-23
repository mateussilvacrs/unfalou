"use client";

import JSZip from "jszip";
import { ChangeEvent, useState } from "react";

type UserWithDate = {
  username: string;
  date: string;
};

type InstagramUser = {
  href?: string;
  value?: string;
  timestamp?: number;
};

type InstagramData = {
  title?: string;
  string_list_data: InstagramUser[];
};

type FollowersJson = { relationships_followers: InstagramData[] };
type FollowingJson = { relationships_following: InstagramData[] };

type Props = {
  onFollowersLoaded: (users: UserWithDate[]) => void;
  onFollowingLoaded: (users: UserWithDate[]) => void;
};

type ValidationError = "not_instagram_zip" | "invalid_json" | null;

// ─── Validação 1: estrutura do ZIP ───────────────────────────────────────────

function isValidInstagramZip(fileNames: string[]): boolean {
  const hasFollowers = fileNames.some((n) => /followers_\d+\.json$/i.test(n));
  const hasFollowing = fileNames.some((n) => /following(_\d+)?\.json$/i.test(n));
  return hasFollowers || hasFollowing;
}

// ─── Validação 2: estrutura do JSON ──────────────────────────────────────────

function isValidInstagramJson(
  json: unknown
): json is InstagramData[] | FollowersJson | FollowingJson {
  if (Array.isArray(json)) {
    return json.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        "string_list_data" in item &&
        Array.isArray((item as InstagramData).string_list_data)
    );
  }
  if (typeof json === "object" && json !== null) {
    if ("relationships_followers" in json)
      return Array.isArray((json as FollowersJson).relationships_followers);
    if ("relationships_following" in json)
      return Array.isArray((json as FollowingJson).relationships_following);
  }
  return false;
}

// ─── Extração ────────────────────────────────────────────────────────────────

function extractUsers(
  json: InstagramData[] | FollowersJson | FollowingJson
): UserWithDate[] {
  const extract = (data: InstagramData[]) =>
    data.flatMap((item) =>
      item.string_list_data.map((user) => ({
        username: user.value ?? item.title ?? "",
        date: user.timestamp
          ? new Date(user.timestamp * 1000).toLocaleDateString("pt-BR")
          : "",
      }))
    );

  if (Array.isArray(json)) return extract(json);
  if ("relationships_followers" in json) return extract(json.relationships_followers);
  if ("relationships_following" in json) return extract(json.relationships_following);
  return [];
}

// ─── Mensagens de erro ───────────────────────────────────────────────────────

const ERROR_MESSAGES = {
  not_instagram_zip: {
    title: "ZIP inválido",
    description:
      "Este arquivo não parece ser um export do Instagram. Exporte seus dados em Configurações → Sua atividade → Baixar suas informações.",
  },
  invalid_json: {
    title: "Formato inesperado",
    description:
      "Os arquivos dentro do ZIP não têm o formato esperado do Instagram. Verifique se o export está completo e tente novamente.",
  },
} as const;

// ─── Componente ──────────────────────────────────────────────────────────────

export default function UploadZip({ onFollowersLoaded, onFollowingLoaded }: Props) {
  const [error, setError] = useState<ValidationError>(null);
  const [loading, setLoading] = useState(false);

  async function handleZip(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    setError(null);
    setLoading(true);

    try {
      const zip = await JSZip.loadAsync(file);
      const files = Object.values(zip.files);
      const fileNames = files.map((f) => f.name);

      if (!isValidInstagramZip(fileNames)) {
        setError("not_instagram_zip");
        return;
      }

      const followersFiles = files.filter((f) =>
        /followers_\d+\.json$/i.test(f.name)
      );
      const followingFiles = files.filter((f) =>
        /following(_\d+)?\.json$/i.test(f.name)
      );

      let followersUsers: UserWithDate[] = [];
      let followingUsers: UserWithDate[] = [];

      for (const f of followersFiles) {
        const json = JSON.parse(await f.async("string"));
        if (!isValidInstagramJson(json)) {
          setError("invalid_json");
          return;
        }
        followersUsers = followersUsers.concat(extractUsers(json));
      }

      for (const f of followingFiles) {
        const json = JSON.parse(await f.async("string"));
        if (!isValidInstagramJson(json)) {
          setError("invalid_json");
          return;
        }
        followingUsers = followingUsers.concat(extractUsers(json));
      }

      onFollowersLoaded(followersUsers);
      onFollowingLoaded(followingUsers);
    } catch {
      setError("not_instagram_zip");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex flex-col items-center gap-3 border text-center rounded-md p-4">
      <p className="font-bold">Upload do arquivo ZIP exportado do Instagram</p>

      <input
        type="file"
        accept=".zip"
        onChange={handleZip}
        disabled={loading}
        className="border p-2 rounded cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      />

      {loading && (
        <p className="text-sm text-gray-500 animate-pulse">Processando ZIP…</p>
      )}

      {error && (
        <div className="flex flex-col gap-1 bg-red-50 border border-red-200 text-red-700 rounded-md px-4 py-3 text-sm max-w-sm">
          <span className="font-semibold">{ERROR_MESSAGES[error].title}</span>
          <span>{ERROR_MESSAGES[error].description}</span>
        </div>
      )}

      {!error && !loading && (
        <span className="text-sm text-gray-500">
          Faça upload do ZIP exportado do Instagram
        </span>
      )}
    </div>
  );
}