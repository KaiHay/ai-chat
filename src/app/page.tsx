// import Link from "next/link";
// import { LatestPost } from "~/app/_components/post";
// import { api, HydrateClient } from "~/trpc/server";
import { redirect } from "next/navigation";

export default async function Home() {
  // const hello = await api.post.hello({ text: "from tRPC" });

  // void api.post.getLatest.prefetch();
  redirect(`/chat`)
  return (
      <main className="flex min-h-screen flex-col items-center justify-center bg-gradient-to-b from-[#7d1630] to-[#a4a91b] text-white">
        <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        </div>
      </main>
  );
}
