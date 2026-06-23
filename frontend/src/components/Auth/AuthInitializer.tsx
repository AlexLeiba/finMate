import { apiFactory } from "@/api/services/apiFactory";
import { useAuthStore } from "@/store/useAuthStore";
import { useEffect } from "react";
import { toast } from "react-toastify";

export function AuthInitializer({ children }: React.PropsWithChildren) {
  const setUser = useAuthStore((s) => s.setUser);
  const setLoading = useAuthStore((s) => s.setLoading);

  useEffect(() => {
    async function fetchProfile() {
      setLoading(true);
      try {
        const response = await apiFactory().getProfile();

        setUser(response);
      } catch (error: any) {
        toast.error(error?.response?.data?.message || "Something went wrong");
        setUser(null);
      } finally {
        setLoading(false);
      }
    }

    fetchProfile();
  }, [setUser, setLoading]);

  return <>{children}</>;
}
