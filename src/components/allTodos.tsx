import { api } from "~/utils/api";

export default function AllTodos() {
  const { data: todos } = api.example.getAll.useQuery();
  if (!todos || todos.length === 0)
    return (
      <div className="my-4 flex flex-col items-center justify-center">
        no todos
      </div>
    );
  return (
    <div className="mb-4 overflow-hidden rounded-lg">
      {todos.map((t) => (
        <div
          className="flex gap-2 border-b-[1px] border-white/50 bg-gray-500/25 p-2"
          key={t.id}
        >
          <input
            type="checkbox"
            value={t.done}
            checked={t.done === 0 ? false : true}
            onChange={(e) => !e.target.value}
          />
          <p>{t.text}</p>
          <p>{t.userName}</p>
        </div>
      ))}
    </div>
  );
}
