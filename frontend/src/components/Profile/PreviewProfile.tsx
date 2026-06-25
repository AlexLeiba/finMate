import { useAuthStore } from "@/store/useAuthStore";

export function PreviewProfileSettings() {
  const userProfile = useAuthStore((state) => state.user);
  return (
    <section className="flex flex-col gap-4 w-full border p-4">
      <div>
        <p className="font-bold">Currency</p>
        <p>{userProfile?.currency || "USD"}</p>
      </div>
      <div>
        <p>Name</p>
        <p className="font-bold">{userProfile?.name}</p>
      </div>

      <div>
        <p>Email</p>
        <p className="font-bold">{userProfile?.email}</p>
      </div>

      <div>
        <p className="font-bold">Member since</p>
        <p>{userProfile?.createdAt.toLocaleString()}</p>
      </div>
      <div>
        <p className="font-bold">Password</p>
        <p>********</p>
      </div>
    </section>
  );
}
