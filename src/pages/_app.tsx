import { type AppType } from "next/app";

import { api } from "@/utils/api";

import "@/styles/globals.css";
import { EdgeStoreProvider } from "@/lib/edgestore";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <EdgeStoreProvider>
      <Component {...pageProps} />;
    </EdgeStoreProvider>
  );
};

export default api.withTRPC(MyApp);
