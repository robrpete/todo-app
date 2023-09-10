import { api } from "~/utils/api";
import { useState } from "react";
import { useUser } from "@clerk/nextjs";

export default function CreateTodo() {
  const { user } = useUser();
  const trpc = api.useContext();
  const [text, setText] = useState("");

  const { mutate } = api.example.create.useMutation({
    onSettled: async () => {
      await trpc.example.getUserTodo.invalidate();
    },
  });
  return (
    <div>
      <form
        action="submit"
        onSubmit={(e) => {
          e.preventDefault();
          mutate({
            user: user?.id ?? "",
            text,
            userName: user?.firstName ?? "",
          });
        }}
      >
        <input
          className="rounded-l-lg px-1 py-1 text-black outline-none focus:bg-gray-200"
          type="text"
          value={text}
          placeholder="new todo"
          onChange={(e) => {
            setText(e.target.value);
          }}
        />
        <button className="rounded-r-lg bg-blue-800 py-1 text-white">
          create
        </button>
      </form>
    </div>
  );
}
