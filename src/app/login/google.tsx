"use client";

import { createClient } from "@utils/supabase/client";
import Script from "next/script";
import { Fragment, useEffect } from "react";
import { type GoogleOAuthCredentialResponse } from "types/google";

async function handleSignInWithGoogle(response: GoogleOAuthCredentialResponse) {
  const supabase = createClient();

  const { data, error } = await supabase.auth.signInWithIdToken({
    provider: "google",
    token: response.credential,
  });

  if (error) {
    console.error("Errore autenticazione", error);
    throw error;
  }

  console.info("Login con Google avvenuto con successo", data);
  window.location.href = origin;
}

export default function GoogleAuth() {
  useEffect(() => {
    window.handleSignInWithGoogle = handleSignInWithGoogle;
  }, []);

  return (
    <Fragment>
      <Script src="https://accounts.google.com/gsi/client" async></Script>
      <div
        id="g_id_onload"
        data-client_id={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        data-context="signin"
        data-ux_mode="popup"
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
    </Fragment>
  );
}
