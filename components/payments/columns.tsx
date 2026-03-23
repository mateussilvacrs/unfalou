"use client";

import Link from "next/link";
import { ColumnDef } from "@tanstack/react-table";

type Payment = {
  id: string;
  link: string;
  hora: string;
  status: "Sim" | "Não";
  username: string;
};

export function columns(showStatus: boolean): ColumnDef<Payment>[] {
  const cols: ColumnDef<Payment>[] = [
    {
      accessorKey: "username",
      header: "Usuário",
      cell: ({ row }) => (
        <div className="max-w-full truncate " title={row.original.username}>
          {row.original.username}
        </div>
      ),
    },

    {
      id: "perfil",
      header: "Perfil",
      cell: ({ row }) => {
        const username = row.original.username;

        return (
          <Link
            href={`https://instagram.com/${username}`}
            target="_blank"
            className="text-white underline bg-black p-2 text-sm rounded-2xl"
          >
            Abrir
          </Link>
        );
      },
    },
  ];

  // 🔥 Se estiver comparando → mostra status
  if (showStatus) {
    cols.splice(1, 0, {
      accessorKey: "status",
      header: "Me segue",
      cell: ({ row }) => {
        const status = row.getValue("status") as string;
        return <span>{status}</span>;
      },
    });
  } else {
    // 🔥 Se NÃO estiver comparando → mostra data
    cols.splice(1, 0, {
      accessorKey: "hora",
      header: "Desde",
      cell: ({ row }) => {
        const hora = row.original.hora;
        return <span>{hora}</span>;
      },
    });
  }

  return cols;
}
