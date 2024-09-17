'use client';

import { createClient } from "@utils/supabase/client";
import { useRouter } from "next/navigation";
import Script from "next/script";
import { Fragment, useEffect } from "react";

export default function GoogleAuth() {

  useEffect(() => {
    window.handleSignInWithGoogle = handleSignInWithGoogle;
  },[])

  const router = useRouter()
    async function signInWithGoogle() {
      const supabase = createClient();
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${origin}/api/auth/callback`,
        },
      });
      if (error) {
        console.error(error);
        // Handle error appropriately
        return;
      }
      if (data?.url) {
        return router.push(data.url);
      }
    }
  return (
    <Fragment>
    <Script src="https://accounts.google.com/gsi/client" async></Script>
    <div
      id="g_id_onload"
      data-client_id="860156113416-1modms9v74p4hcrck6rtadofad329p2b.apps.googleusercontent.com"
      data-context="signin"
      data-ux_mode="popup"
      // data-login_uri="https://ejwhngenrurroedqfeji.supabase.co/auth/v1/callback"
      data-callback="handleSignInWithGoogle"
      data-nonce=""
    ></div>
    <div
      className="g_id_signin"
      data-type="standard"
      data-shape="pill"
      data-theme="outline"
      data-text="signin_with"
      data-size="large"
      data-logo_alignment="left"
    ></div>
    <button onClick={signInWithGoogle}>Accedi con google</button>
  </Fragment>
  )
}


export async function handleSignInWithGoogle(response: { credential: string; }): Promise<void> {
  console.log('pippo')
  console.log(response)
  const supabase = createClient()
  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: 'google',
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    token: response.credential,
  })
}