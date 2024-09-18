export {};

declare global {
  interface Window {
    handleSignInWithGoogle: (response: GoogleOAuthCredentialResponse) => void;
  }
}