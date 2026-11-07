import { DownloadCsv } from "@/components/Profile/DownloadCsv";
import { DeleteAccount } from "@/components/Profile/DeleteAccount";

import { PreviewProfileSettings } from "@/components/Profile/PreviewProfile";
import { lazy, Suspense, useState } from "react";
import { Button } from "@/components/ui/button";
import { Spacer } from "@/components/ui/spacer";
import { UploadCsv } from "@/components/Profile/UploadCsv/UploadCsv";

const ProfileForm = lazy(() =>
  import("@/components/Profile/ProfileForm").then((module) => ({
    default: module.ProfileForm,
  }))
);

function ProfilePage() {
  const [editProfile, setEditProfile] = useState(false);
  return (
    <div className="flex min-h-full min-w-0 flex-col">
      <h3>Settings</h3>
      <Spacer size={4} />
      <div className="grid min-w-0 grid-cols-1 gap-4 lg:grid-cols-2">
        <div className="flex min-w-0 flex-col items-center gap-8 border p-4">
          {editProfile ? (
            <Suspense>
              <ProfileForm onCloseEditProfile={() => setEditProfile(false)} />
            </Suspense>
          ) : (
            <>
              <PreviewProfileSettings />
              <Button className="self-stretch" onClick={() => setEditProfile(!editProfile)}>
                Edit
              </Button>
            </>
          )}
        </div>

        <div className="flex min-w-0 flex-col gap-8 border p-4 lg:h-full lg:justify-between">
          <div className="flex min-w-0 flex-col gap-4">
            <DownloadCsv />
            <UploadCsv />
          </div>

          <DeleteAccount />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
