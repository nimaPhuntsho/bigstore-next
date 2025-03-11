import { Session } from "./schema";
import { UserSessionState } from "../../(main)/(auth)/register/registerSchema";
import { create } from "zustand";
import { persist } from "zustand/middleware";

export const useSession = create<UserSessionState>()(
  persist(
    (set) => ({
      session: undefined,
      updateSession: (session) => {
        set((state) => ({ ...state, session: session }));
      },
    }),
    { name: "session" }
  )
);
