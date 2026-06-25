import { Avatar } from "@/components/Profile/Avatar";
import { DownloadCsv } from "@/components/Profile/DownloadCsv";
import { DeleteAccount } from "@/components/Profile/DeleteAccount";

import { PreviewProfileSettings } from "@/components/Profile/PreviewProfile";
import { lazy, useState } from "react";
import { Button } from "@/components/ui/button";
import { Spacer } from "@/components/ui/spacer";

const ProfileForm = lazy(() =>
  import("@/components/Profile/ProfileForm").then((module) => ({
    default: module.ProfileForm,
  })),
);

function ProfilePage() {
  const [editProfile, setEditProfile] = useState(false);
  return (
    <div>
      <h3>Settings</h3>
      <Spacer size={4} />
      <div className="grid grid-cols-2 gap-4">
        <div className="flex flex-col gap-8 p-4 border items-center ">
          <Avatar />

          {editProfile ? (
            <ProfileForm onCloseEditProfile={() => setEditProfile(false)} />
          ) : (
            <>
              <PreviewProfileSettings />
              <Button
                className="self-stretch"
                onClick={() => setEditProfile(!editProfile)}
              >
                Edit
              </Button>
            </>
          )}
        </div>

        <div className="p-4 border flex flex-col justify-between">
          <DownloadCsv />

          <DeleteAccount />
        </div>
      </div>
    </div>
  );
}

export default ProfilePage;
