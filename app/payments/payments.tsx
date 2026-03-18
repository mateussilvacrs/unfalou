
type PaymentProps = {
  id: string
  link: string
  status: "Sim" | "Não"
  hora: string,
  username: string
}

export const payments: PaymentProps[] = [
  {
    id: "728ed52f",
    link: "www.google.com",
    status: "Sim",
    hora: "00-00-00",
    username: ``,
  },
  {
    id: "489e1d42",
    link: "125",
    status: "Não",
    hora: "00-00-00",
    username: "example@gmail.com",
  },
  // ...
]