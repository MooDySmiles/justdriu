# Intro
Descrizione dei vari metodi studiati per l'autenticazione tramite Supabase hosted

## Configurazione Supabase Next
Creazione dei file di utility per l'autenticazione degli utenti con next ( i file presenti nella cartella `utils/supabase`).
In particolare viene gestita la creazione del client per la comunicazione con l'istanza di Supabase sia per la parte client che la parte server di Nextjs.

Documentazione ufficiale integrazione Supabase Nextjs [qui][integrazione-next]

## Autenticazione email e password
Si definisce il form di login 

```
<form>
  <label htmlFor="email">Email:</label>
  <input id="email" name="email" type="email" required />
  <label htmlFor="password">Password:</label>
  <input id="password" name="password" type="password" required />
  <button formAction={login}>Log in</button>
  <button formAction={signup}>Sign up</button>
</form>
```

Le funzioni `login` e `signup` sono [Actions][actions] che svolgono la relativa funzione di accesso e registrazione

```
export async function login(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signInWithPassword(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/account')
}
```
```
export async function signup(formData: FormData) {
  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const data = {
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    redirect('/error')
  }

  revalidatePath('/', 'layout')
  redirect('/account')
}
```

Supabase inoltre per default richiede la validazione tramite un `confirmation code` inviato all'email post registrazione che deve essere validato tramite una chiamata di callback che per default è `auth/confirmation`

```
// auth/confirmation/route.ts
import { createClient } from '@utils/supabase/server'

// Creating a handler to a GET request to route /auth/confirm
export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url)
  const token_hash = searchParams.get('token_hash')
  const type = searchParams.get('type') as EmailOtpType | null
  const next = '/account'

  // Create redirect link without the secret token
  const redirectTo = request.nextUrl.clone()
  redirectTo.pathname = next
  redirectTo.searchParams.delete('token_hash')
  redirectTo.searchParams.delete('type')

  if (token_hash && type) {
    const supabase = createClient()

    const { error } = await supabase.auth.verifyOtp({
      type,
      token_hash,
    })
    if (!error) {
      redirectTo.searchParams.delete('next')
      return NextResponse.redirect(redirectTo)
    }
  }

  // return the user to an error page with some instructions
  redirectTo.pathname = '/error'
  return NextResponse.redirect(redirectTo)
}
```

Guida ufficiale [qui][guida-email]


## Autenticazione OAuth Google
Per gestire l'autenticazione tramite google si possono usare principalmente due metodi
 - autenticazione "manuale" tramite codice
 - utilizzo del bottone pre-built di Google

### Preliminari
Creare un progetto GCP e le relative credenziali per applicazione Web

Creare lo schema pubblico degli utenti su Supabase, vedere [qui][utenti-supa]

Attivare il provider Google nella scheda `Auth` di Supabase con i relativi codici dell'applicazione GCP

### Autenticazione Manuale
Per l'autenticazione manuale si può personalizzare il bottone che permette l'accesso e gestirne l'authentication flow:

- creare il bottone personalizzato per l'accesso/iscrizione
- al click gestire l'autenticazione tramite SUpabase
```
// handler button click
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
```
- creare la callback all'autenticazione per gestire la sessione utente
```
/api/auth/callback/route.ts

export async function GET(request: Request) {
  console.log('auth')
  const { searchParams, origin } = new URL(request.url)
  const code = searchParams.get('code')
  // if "next" is in param, use it as the redirect URL
  const next = searchParams.get('next') ?? '/'

  if (code) {
    const supabase = createClient()
    const { error } = await supabase.auth.exchangeCodeForSession(code)
    if (!error) {
      const forwardedHost = request.headers.get('x-forwarded-host') // original origin before load balancer
      const isLocalEnv = process.env.NODE_ENV === 'development'
      if (isLocalEnv) {
        // we can be sure that there is no load balancer in between, so no need to watch for X-Forwarded-Host
        return NextResponse.redirect(`${origin}${next}`)
      } else if (forwardedHost) {
        return NextResponse.redirect(`https://${forwardedHost}${next}`)
      } else {
        return NextResponse.redirect(`${origin}${next}`)
      }
    }
  }

  // return the user to an error page with instructions
  return NextResponse.redirect(`${origin}/auth/auth-code-error`)
}
```

### Autenticazione pre-built
- Creazione del codice del bottone pre-built di google attraverso questa [pagina][button-code] inserendo i codici relativi al `clientID` dell'applicazione GCP. 
Scegliere come forma di gestione di risposta delle credenziali `callback`
Alla fine si ottiene il codice del bottone personalizzato da inserire nella pagina di login
```
<Script src="https://accounts.google.com/gsi/client" async></Script>
    <div
      id="g_id_onload"
      data-client_id="<client_id>"
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
```
- aggiungere la funzione callback `handleSignInWithGoogle`
```
function handleSignInWithGoogle(response): void {
  const supabase = createClient()
  supabase.auth.signInWithIdToken({
    provider: 'google',
    token: response.credential,
  }).then(({data, error}) => {
    if(error) {
      console.error('Errore autenticazione:', error)
    }
    if(data.user) {
      // user authenticated
      window.location.href = origin
    }
  }).catch(err => console.error(err))
}
```
questa funzione deve essere visibile allo script di Google quindi deve essere in global scope, per farlo definire la funzione all'interno di `window`
```
  useEffect(() => {
    window.handleSignInWithGoogle = handleSignInWithGoogle;
  },[])
```
Notare che è inserito dentro `useEffect` perché bisogna avere il riferimento DOM altrimenti `window` non è definito 

### Considerazioni e problemi noti
Il metodo tramite l'autenticazione manuale con Goolge risulta avere un comportamento non voluto, in particolare se si è già acceduti tramite il proprio account google al browser viene effettuata la login (e iscrizione se il primo accesso) senza alcuna possibilità di cambiare utente in fase di accesso.

Si è comunque scelto di utilizzare il bottone pre-built perché standard ed evita il problema descritto sopra

Per quanto riguarda il bottone è possibile scegliere due vie legate al gestione della risposta con le credenziali da parte di Google tramite 
 - `data-callback`
 - `data-login_uri`

la prima è quella utilizzata e descritta sopra, la seconda permette di inserire un url di validazione delle credenziali e Supabase mette a disposizione l'url di callback del tipo `https://<supabase_url>/auth/v1/callback` ma se si utilizza il secondo metodo supabase ritorna errore del tipo `Error: OAuth state parameter missing`

[utenti-supa]: https://supabase.com/docs/guides/auth/managing-user-data
[button-code]: https://developers.google.com/identity/gsi/web/tools/configurator
[integrazione-next]: https://supabase.com/docs/guides/auth/quickstarts/nextjs
[guida-email]: https://supabase.com/docs/guides/auth/server-side/nextjs
[actions]: https://nextjs.org/docs/app/building-your-application/data-fetching/server-actions-and-mutations