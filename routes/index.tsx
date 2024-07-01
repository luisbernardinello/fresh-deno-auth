import { PageProps } from "$fresh/server.ts";

export default function Home({state}:PageProps) {
  console.log(state, "getting the middleware data from the user here as example");
  return (
    <div class='text-2xl font-medium p-4 text-gray-400 text-center'>
      Welcome Back, Frodo Baggins.

    </div>

  );
}
