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
        <div className="max-w-full truncate" title={row.original.username}>
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
    // 🔥 Se NÃO estiver comparando → mostra data com ordenação correta
    cols.splice(1, 0, {
      accessorKey: "hora",
      header: "Desde",

      cell: ({ row }) => {
        const hora = row.original.hora;

        const parseDate = (dateStr: string) => {
          const parts = dateStr.split("/");

          if (parts.length === 3) {
            const [day, month, year] = parts;
            return new Date(`${year}-${month}-${day}`);
          }

          return new Date(dateStr);
        };

        const date = parseDate(hora);

        return (
          <span>
            {isNaN(date.getTime())
              ? hora
              : date.toLocaleDateString("pt-BR")}
          </span>
        );
      },

      // 🔥 AQUI ESTÁ O SEGREDO DA ORDENAÇÃO
      sortingFn: (rowA, rowB) => {
        const parseDate = (dateStr: string) => {
          if (!dateStr) return 0;

          const parts = dateStr.split("/");

          if (parts.length === 3) {
            const [day, month, year] = parts;
            return new Date(`${year}-${month}-${day}`).getTime();
          }

          return new Date(dateStr).getTime();
        };

        const a = parseDate(rowA.getValue("hora"));
        const b = parseDate(rowB.getValue("hora"));

        return a - b;
      },
    });
  }

  return cols;
}