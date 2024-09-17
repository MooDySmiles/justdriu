https://developers.google.com/identity/gsi/web/reference/js-reference#CredentialResponse
export interface GoogleOAuthCredentialResponse {
  credential: string,
  select_by: string,
  state?: string,
}