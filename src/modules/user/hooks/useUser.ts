import { toastError } from "@/design-system/components";
import { useEffect, useState } from "react";
import { getCurrentUser } from "../actions";
import { User } from "../types";

export function useUser() {
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
    load();
  }, []);

  return {
    user,
    loading,
    load,
  };
}
