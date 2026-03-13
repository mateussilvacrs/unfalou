interface ContainerInfoProps {
  title: string;
  users: string[];
}

export function ContainerInfo({ title, users }: ContainerInfoProps) {
  return (
    <div className="border-solid border w-96 rounded-sm text-center">
      <h1 className="font-bold">{title}</h1>
      <div>
{users.slice(0,5).map((user, index) => (
  <p key={index}>{user}</p>
))}
      </div>
    </div>
  );
}
