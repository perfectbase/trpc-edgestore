import Head from "next/head";
import { api } from "@/utils/api";
import { useEdgeStore } from "../lib/edgestore";
import { useState } from "react";

export default function Home() {
  const [file, setFile] = useState<File>();
  const { edgestore } = useEdgeStore();

  const hello = api.example.hello.useQuery({ text: "from tRPC" });

  async function upload() {
    if (file) {
      const res = await edgestore.publicFiles.upload({
        file,
        onProgressChange: (progress) => {
          console.log(progress);
        },
      });
      console.log(res);
    }
  }

  return (
    <>
      <Head>
        <title>tRPC + Edge Store</title>
        <meta name="description" content="Edge Store Example" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex min-h-screen flex-col items-center justify-center">
        <p className="text-2xl">
          {hello.data ? hello.data.greeting : "Loading tRPC query..."}
        </p>
        <input
          type="file"
          onChange={(e) => {
            setFile(e.target.files?.[0]);
          }}
        />
        <button
          onClick={() => {
            void upload();
          }}
        >
          Upload
        </button>
      </main>
    </>
  );
}
