/* eslint-disable @typescript-eslint/no-unsafe-argument */
"use client";
import { useCallback, useEffect, useState } from "react";
import { createClient } from "@utils/supabase/client";
import { type User } from "@supabase/supabase-js";
import { logout } from "../../server/logout";
import { updateUserProfile } from "@utils/supabase/api/user";

export default function AccountForm({ user }: Readonly<{ user: User | null }>) {
  const supabase = createClient();
  const [loading, setLoading] = useState(true);
  const [fullname, setFullname] = useState<string | null>(null);
  const [username, setUsername] = useState<string | null>(null);
  const [avatarUrl, setAvatarUrl] = useState<string | null>(null);

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      if(!user) {
        return (
          <div> No User</div>
        )
      }
      const { data, error, status } = await supabase
        .from("profile")
        .select(`full_name, username, avatar_url`)
        .eq("id", user?.id)
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw new Error(error.message);
      }

      if (data) {
        setFullname(data.full_name);
        setUsername(data.username);
        setAvatarUrl(data.avatar_url);
      }
    } catch (error) {
      console.log("Error loading user data!", error);
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    async function profile() {
      // You can await here
      return await getProfile();
      // ...
    }
    profile().catch((err) => {
      throw new Error(err as string);
    });
  }, [user, getProfile]);

  async function updateProfile({
    username,
    avatar_url,
  }: {
    username: string | null;
    fullname: string | null;
    avatar_url: string | null;
  }) {
    try {
      setLoading(true);

      const { error } = await updateUserProfile(supabase, {username, full_name: fullname, avatar_url})
      if (error) throw new Error(error.message);
      console.log("Profile updated!");
    } catch (error) {
      console.log("Error updating the data!", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="form-widget">
      <div>
        <label htmlFor="email">Email</label>
        <input id="email" type="text" value={user?.email} disabled />
      </div>
      <div>
        <label htmlFor="fullName">Full Name</label>
        <input
          id="fullName"
          type="text"
          value={fullname ?? ""}
          onChange={(e) => setFullname(e.target.value)}
        />
      </div>
      <div>
        <label htmlFor="username">Username</label>
        <input
          id="username"
          type="text"
          value={username ?? ""}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>

      <div>
        <button
          className="button primary block"
          onClick={() =>
            updateProfile({
              fullname,
              username,
              avatar_url: avatarUrl,
            })
          }
          disabled={loading}
        >
          {loading ? "Loading ..." : "Update"}
        </button>
      </div>

      <div>
        <form action={logout}>
          <button className="button block" type="submit">
            Sign out
          </button>
        </form>
      </div>
    </div>
  );
}
