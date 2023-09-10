import { api } from "~/utils/api";
import { useUser } from "@clerk/nextjs";

export default function UserTodos() {
  const { user } = useUser();
  const trpc = api.useContext();
  const { data: todos } = api.example.getUserTodo.useQuery({
    userId: user?.id ?? "",
  });
  const { mutate } = api.example.toggle.useMutation({
    onSettled: async () => {
      return trpc.example.getUserTodo.invalidate();
    },
  });
  const { mutate: deleteTodo } = api.example.delete.useMutation({
    onSettled: async () => {
      return trpc.example.getUserTodo.invalidate();
    },
  });
  if (!todos || todos.length === 0)
    return (
      <div className="my-4 flex flex-col items-center justify-center">
        no todos
      </div>
    );
  return (
    <div>
      <h4 className="mb-4 text-center text-2xl font-semibold">
        {user?.firstName}s Todos
      </h4>
      <div className=" overflow-hidden rounded-lg">
        {todos.map((t) => (
          <div
            className="flex items-center justify-between gap-2 border-b-[1px] border-white/50 bg-gray-500/25 p-2"
            key={t.id}
          >
            <input
              type="checkbox"
              checked={t.done === 0 ? false : true}
              onChange={(e) => {
                const toggle = e.target.checked;
                const update = toggle == false ? 0 : 1;
                mutate({ todoId: t.id ?? "", checked: update });
              }}
            />
            <p>{t.text}</p>
            <p>{t.userName}</p>
            <button
              className="rounded-lg bg-red-600 px-2 py-1 text-black"
              onClick={() => {
                deleteTodo({ todo: t.id ?? "" });
              }}
            >
              DELETE
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
