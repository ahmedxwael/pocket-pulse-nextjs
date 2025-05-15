import { toastError } from "@/design-system/components";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../actions";
import { User } from "../types";

type UseUserProps = {
  init?: boolean;
};

export function useUser({ init = false }: UseUserProps = {}) {
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<User | null>(null);

  const load = async () => {
    try {
      setLoading(true);
      const data = await getCurrentUser();
      setUser(data);
    } catch (e) {
      console.log(e);
      toastError("Couldn't get the user");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (init && !user) load();
  }, [init, user]);

  return {
    user,
    loading,
    load,
  };
}
