"use client";

import JSZip from "jszip";
import { ChangeEvent, useState } from "react";
import { Folder } from "lucide-react";
import { Input } from "../ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

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

type UnfollowItem = {
  timestamp: number;
  label_values: { label: string; value: string }[];
};

type FollowersJson = { relationships_followers: InstagramData[] };
type FollowingJson = { relationships_following: InstagramData[] };
type RecentJson = { relationships_unfollowed_users: InstagramData[] };

type Props = {
  onBothLoaded: (followers: UserWithDate[], following: UserWithDate[], recentUnfollow: UserWithDate[]) => void;
};

type ValidationError = "not_instagram_zip" | "invalid_json" | "file_too_large" | null;

const MAX_FILE_MB = 2000;
const WARN_FILE_MB = 50;

function isValidInstagramZip(fileNames: string[]): boolean {
  const hasFollowers = fileNames.some((n) => /followers_\d+\.json$/i.test(n));
  const hasFollowing = fileNames.some((n) => /following(_\d+)?\.json$/i.test(n));
  const recentUnFollowing = fileNames.some((n) => /recently_unfollowed_profiles(_\d+)?\.json$/i.test(n));
  return hasFollowers || hasFollowing || recentUnFollowing;
}

function extractUnfollowItem(item: UnfollowItem): UserWithDate | null {
  const usernameFromLabel =
    item.label_values.find((l) => l.label.toLowerCase().includes("rio"))?.value ?? "";
  const urlValue =
    item.label_values.find(
      (l) => l.label === "URL" && l.value.includes("instagram.com"),
    )?.value ?? "";
  const usernameFromUrl = urlValue.split("/").filter(Boolean).pop() ?? "";
  const username = usernameFromLabel || usernameFromUrl;
  if (!username) return null;
  return {
    username,
    date: item.timestamp
      ? new Date(item.timestamp * 1000).toLocaleDateString("pt-BR")
      : "",
  };
}

function isValidInstagramJson(
  json: unknown,
): json is InstagramData[] | FollowersJson | FollowingJson | RecentJson | UnfollowItem[] | UnfollowItem {
  if (Array.isArray(json)) {
    if (json.length === 0) return true;
    if ("label_values" in (json[0] as object)) {
      return json.every(
        (item) =>
          typeof item === "object" &&
          item !== null &&
          "label_values" in item &&
          Array.isArray((item as UnfollowItem).label_values),
      );
    }
    return json.every(
      (item) =>
        typeof item === "object" &&
        item !== null &&
        "string_list_data" in item &&
        Array.isArray((item as InstagramData).string_list_data),
    );
  }
  if (typeof json === "object" && json !== null) {
    if ("relationships_followers" in json)
      return Array.isArray((json as FollowersJson).relationships_followers);
    if ("relationships_following" in json)
      return Array.isArray((json as FollowingJson).relationships_following);
    if ("relationships_unfollowed_users" in json)
      return Array.isArray((json as RecentJson).relationships_unfollowed_users);
    if ("label_values" in json)
      return Array.isArray((json as UnfollowItem).label_values);
  }
  return false;
}

function extractUsers(
  json: InstagramData[] | FollowersJson | FollowingJson | RecentJson | UnfollowItem[] | UnfollowItem,
): UserWithDate[] {
  // Objeto único com label_values
  if (
    !Array.isArray(json) &&
    typeof json === "object" &&
    json !== null &&
    "label_values" in json &&
    !("relationships_followers" in json) &&
    !("relationships_following" in json) &&
    !("relationships_unfollowed_users" in json)
  ) {
    const result = extractUnfollowItem(json as UnfollowItem);
    return result ? [result] : [];
  }

  // Array com label_values
  if (
    Array.isArray(json) &&
    json.length > 0 &&
    "label_values" in (json[0] as object)
  ) {
    return (json as UnfollowItem[])
      .map(extractUnfollowItem)
      .filter((u): u is UserWithDate => u !== null);
  }

  const extract = (data: InstagramData[]) =>
    data.flatMap((item) =>
      item.string_list_data.map((user) => ({
        username: user.value ?? item.title ?? "",
        date: user.timestamp
          ? new Date(user.timestamp * 1000).toLocaleDateString("pt-BR")
          : "",
      })),
    );

if (Array.isArray(json)) return extract(json as InstagramData[]);
  
if (Array.isArray(json)) return extract(json as InstagramData[]);

  if ("relationships_followers" in (json as object))
    return extract((json as FollowersJson).relationships_followers);
  if ("relationships_following" in (json as object))
    return extract((json as FollowingJson).relationships_following);
  if ("relationships_unfollowed_users" in (json as object))
    return extract((json as RecentJson).relationships_unfollowed_users);
  return [];
}

async function parseZipFile(zipFile: JSZip.JSZipObject): Promise<unknown> {
  const text = await zipFile.async("string");
  await new Promise((r) => setTimeout(r, 0));
  return JSON.parse(text);
}

const ERROR_MESSAGES = {
  not_instagram_zip: {
    title: "ZIP inválido",
    description: "Este arquivo não parece ser um export do Instagram.",
  },
  invalid_json: {
    title: "Formato inválido",
    description: "Os dados do ZIP não estão no formato esperado.",
  },
  file_too_large: {
    title: "Arquivo muito grande",
    description: `O arquivo deve ter no máximo ${MAX_FILE_MB}MB.`,
  },
} as const;

export default function UploadZip({ onBothLoaded }: Props) {
  const [error, setError] = useState<ValidationError>(null);
  const [warning, setWarning] = useState(false);
  const [lastFile, setLastFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [progressLabel, setProgressLabel] = useState("");
  const [dragActive, setDragActive] = useState(false);
  const [showVideoModal, setShowVideoModal] = useState(false);

  async function processFile(file: File, ignoreWarning = false) {
    setError(null);
    setWarning(false);
    setProgress(0);
    setProgressLabel("");

    const fileMB = file.size / (1024 * 1024);

    if (fileMB > MAX_FILE_MB) {
      setError("file_too_large");
      return;
    }

    if (fileMB > WARN_FILE_MB && !ignoreWarning) {
      setWarning(true);
      setLastFile(file);
      return;
    }

    setLoading(true);

    try {
      setProgressLabel("Abrindo arquivo...");
      setProgress(10);

      const arrayBuffer = await new Promise<ArrayBuffer>((resolve, reject) => {
        const reader = new FileReader();
        reader.onprogress = (e) => {
          if (e.lengthComputable) {
            const pct = Math.round(10 + (e.loaded / e.total) * 30);
            setProgress(pct);
          }
        };
        reader.onload = () => resolve(reader.result as ArrayBuffer);
        reader.onerror = reject;
        reader.readAsArrayBuffer(file);
      });

      setProgress(40);
      setProgressLabel("Extraindo arquivos...");
      await new Promise((r) => setTimeout(r, 50));

      const zip = await JSZip.loadAsync(arrayBuffer);

      const files = Object.values(zip.files).filter((f) => !f.dir);
      const fileNames = files.map((f) => f.name);

      if (!isValidInstagramZip(fileNames)) {
        setError("not_instagram_zip");
        return;
      }

      const followersFiles = files.filter((f) =>
        /followers_\d+\.json$/i.test(f.name),
      );
      const followingFiles = files.filter((f) =>
        /following(_\d+)?\.json$/i.test(f.name),
      );
      const recentUnfolowFiles = files.filter((f) =>
        /recently_unfollowed_profiles(_\d+)?\.json$/i.test(f.name),
      );

      let followersUsers: UserWithDate[] = [];
      let followingUsers: UserWithDate[] = [];
      let recentUnfolowUsers: UserWithDate[] = [];

      const total = followersFiles.length + followingFiles.length + recentUnfolowFiles.length;
      let done = 0;

      setProgressLabel("Lendo seguidores...");

      for (const f of followersFiles) {
        const json = await parseZipFile(f);
        if (!isValidInstagramJson(json)) {
          setError("invalid_json");
          return;
        }
        followersUsers = followersUsers.concat(extractUsers(json));
        done++;
        setProgress(50 + Math.round((done / total) * 45));
      }

      setProgressLabel("Lendo quem você segue...");

      for (const f of followingFiles) {
        const json = await parseZipFile(f);
        if (!isValidInstagramJson(json)) {
          setError("invalid_json");
          return;
        }
        followingUsers = followingUsers.concat(extractUsers(json));
        done++;
        setProgress(50 + Math.round((done / total) * 45));
      }

      setProgressLabel("Lendo unfollows recentes...");

      for (const f of recentUnfolowFiles) {
        const json = await parseZipFile(f);
        if (!isValidInstagramJson(json)) {
          setError("invalid_json");
          return;
        }
        recentUnfolowUsers = recentUnfolowUsers.concat(extractUsers(json));
        done++;
        setProgress(50 + Math.round((done / total) * 45));
      }

      setProgress(100);
      setProgressLabel("Concluído!");

      await new Promise((r) => setTimeout(r, 400));

      onBothLoaded(followersUsers, followingUsers, recentUnfolowUsers);
    } catch {
      setError("not_instagram_zip");
    } finally {
      setLoading(false);
      setProgress(0);
      setProgressLabel("");
    }
  }

  async function handleZip(e: ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;
    await processFile(file);
  }

  function handleDrag(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else {
      setDragActive(false);
    }
  }

  async function handleDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (!file) return;
    await processFile(file);
  }

  return (
    <div className="md:px-4 w-90 md:w-7xl mb-10">
      <Card>
        <CardHeader className="text-center">
          <CardTitle>Faça sua verificação</CardTitle>
          <CardDescription>
            Envie o arquivo exportado do Instagram
          </CardDescription>
        </CardHeader>

        <CardContent
          className="relative"
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDragLeave={handleDrag}
          onDrop={handleDrop}
        >
          <label
            htmlFor="instagramZip"
            className={`group flex flex-col items-center justify-center border-2 border-dashed rounded-xl p-10 cursor-pointer transition-all duration-300 gap-3
            hover:bg-gray-50 hover:border-black
            ${dragActive ? "bg-gray-100 border-black scale-[1.02]" : ""}`}
          >
            <Folder className="w-10 h-10 text-gray-400 group-hover:text-black transition" />
            <span className="font-semibold">Arraste ou clique para enviar</span>
            <span className="text-sm text-gray-400">Apenas arquivos .zip</span>
          </label>

          <Input
            id="instagramZip"
            type="file"
            accept=".zip"
            className="hidden"
            onChange={handleZip}
            disabled={loading}
          />

          {loading && (
            <div className="absolute inset-0 bg-white/90 backdrop-blur-sm flex flex-col items-center justify-center rounded-xl gap-4 px-8">
              <span className="text-sm font-medium text-gray-700">
                {progressLabel}
              </span>

              <div className="w-full bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className="bg-black h-2 rounded-full transition-all duration-300"
                  style={{ width: `${progress}%` }}
                />
              </div>

              <span className="text-xs text-gray-400">{progress}%</span>
            </div>
          )}
        </CardContent>

        <CardFooter className="flex flex-col items-center gap-2">
          {warning && lastFile && (
            <div className="text-sm flex flex-col gap-3 w-full">
              <div className="text-yellow-600 text-center">
                <p><strong>Arquivo grande detectado</strong></p>
                <p className="text-xs mt-1">
                  Este arquivo pode travar em celulares com pouca memória.
                </p>
              </div>

              <div className="flex gap-2 justify-center">
                <button
                  onClick={() => {
                    setWarning(false);
                    processFile(lastFile, true);
                  }}
                  className="px-4 py-1.5 bg-yellow-500 text-white rounded-lg text-xs hover:bg-yellow-600 transition"
                >
                  Continuar mesmo assim
                </button>
                <button
                  onClick={() => {
                    setWarning(false);
                    setLastFile(null);
                  }}
                  className="px-4 py-1.5 border rounded-lg text-xs hover:bg-gray-100 transition"
                >
                  Cancelar
                </button>
              </div>

              <div className="border rounded-xl p-4 bg-gray-50 flex flex-col gap-2">
                <p className="font-semibold text-gray-700 text-center text-xs uppercase tracking-wide">
                  Como exportar um arquivo menor
                </p>

                <ol className="flex flex-col gap-2 text-gray-600 text-xs list-none">
                  {[
                    {
                      n: "01",
                      text: 'No Instagram, vá em "Configurações" → "Central de privacidade" → "Baixar seus dados".',
                    },
                    {
                      n: "02",
                      text: 'Escolha "Algumas informações suas" e marque APENAS "Seguidores e seguindo".',
                    },
                    {
                      n: "03",
                      text: "Selecione um intervalo de datas mais curto, como os últimos 12 meses, para reduzir o tamanho.",
                    },
                    {
                      n: "04",
                      text: 'Certifique-se de escolher o formato JSON e clique em "Criar arquivos".',
                    },
                  ].map((step) => (
                    <li key={step.n} className="flex gap-3 items-start">
                      <span className="font-extrabold text-gray-300 leading-none min-w-5">
                        {step.n}
                      </span>
                      <span>{step.text}</span>
                    </li>
                  ))}
                </ol>

                <p className="text-gray-400 text-xs text-center mt-1">
                  Exportando só os dados necessários, o arquivo fica muito menor e processa sem travar.
                </p>

                <button
                  onClick={() => setShowVideoModal(true)}
                  className="mt-1 w-full flex items-center justify-center gap-2 px-4 py-2 bg-black text-white rounded-lg text-xs hover:bg-gray-800 transition"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                  Ver vídeo explicativo
                </button>
              </div>
            </div>
          )}

          {showVideoModal && (
            <div
              className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
              onClick={() => setShowVideoModal(false)}
            >
              <div
                className="bg-white rounded-2xl shadow-2xl w-full max-w-sm flex flex-col gap-4 p-4"
                onClick={(e) => e.stopPropagation()}
              >
                <div className="flex items-center justify-between">
                  <span className="font-semibold text-sm text-gray-900">
                    Como exportar um arquivo menor
                  </span>
                  <button
                    onClick={() => setShowVideoModal(false)}
                    className="text-gray-400 hover:text-gray-700 transition text-lg leading-none"
                  >
                    ✕
                  </button>
                </div>

                <div className="rounded-xl overflow-hidden bg-black flex justify-center">
                  <video
                    src="/big-file-unfalou.mp4"
                    controls
                    playsInline
                    muted={false}
                    className="h-100 w-auto"
                  />
                </div>

                <button
                  onClick={() => setShowVideoModal(false)}
                  className="w-full py-2 border rounded-lg text-sm hover:bg-gray-100 transition"
                >
                  Fechar
                </button>
              </div>
            </div>
          )}

          {error && (
            <div className="text-red-600 text-sm text-center">
              <strong>{ERROR_MESSAGES[error].title}</strong>
              <p>{ERROR_MESSAGES[error].description}</p>
            </div>
          )}
        </CardFooter>
      </Card>
    </div>
  );
}