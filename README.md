# JustDriu

## Supabase

Per lo sviluppo locale la prima volta eseguire i seguenti passaggi

- avvio supabase
```
npx supabase start // La prima volta richiede un po' di tempo
```

- export dello schema dal db attualmente in uso (può essere interno o esterno a supabase)
```
npx supabase db dump --db-url "$REMOTE_DB_URL" -f roles.sql --role-only
npx supabase db dump --db-url "$REMOTE_DB_URL" -f schema.sql
npx supabase db dump --db-url "$REMOTE_DB_URL" -f auth.sql --schema auth

// aggiungere la seguente riga se si vuole importare anche i dati
npx supabase db dump --db-url "$REMOTE_DB_URL" -f data.sql --use-copy --data-only
```

- import dello schema nel db locale
```
psql \
  --single-transaction \
  --variable ON_ERROR_STOP=1 \
  --file roles.sql \
  --file schema.sql \
  --file auth.sql \
  --dbname "$LOCAL_DB_URL"

// se si vuole importare anche i dati eseguire
psql \
  --single-transaction \
  --variable ON_ERROR_STOP=1 \
  --file roles.sql \
  --file schema.sql \
  --file auth.sql \
  --command 'SET session_replication_role = replica' \
  --file data.sql \
  --dbname "$LOCAL_DB_URL"
```

Nota: LOCAL_DB_URL viene notificato allo start di supabase e dovrebbe coincidere con `postgresql://postgres:postgres@127.0.0.1:54322/postgres`

- settare le seguenti variabili nel file `.env` che non viene versionato
 ```
NEXT_PUBLIC_SUPABASE_URL=http://localhost:54321
NEXT_PUBLIC_SUPABASE_ANON_KEY=<anon_key_local_supabase>
// per l'autenticazione google
NEXT_PUBLIC_GOOGLE_CLIENT_ID=<google_client_id>
SUPABASE_AUTH_GOOGLE_SECRET=<google_secret>
 ```

Nota: anon_key_local_supabase viene fornito dopo l'avvio di supabase

- per rendere effettive le modifiche delle variabili riavviare supabase

```
npx supabase stop
npx supabase start
```

## Migrazione Database
Per modificare il db eseguire:

```
npx supabase migration new <nome_migrazione>
```
Questo creerà un file `<datetime>_<nome_migrazione>.sql` nella cartella `supabase/migrations` in cui si definiscono le modifiche al db per esempio

```
ALTER TABLE "table"
  ADD "column" text
```

Per applicare le modifiche del file inserito con 
```
npx supabase migration up --local
```

Generazione types post migrazione
```
npx supabase gen types typescript --local > types/database.d.ts
```

## Seed data
È possibile riempire con dati dummy il db tramite il comando

```
npm run supa.seed
```
Questo comando utilizza [Snaplet][snaplet] per generare i dati definiti nel file `seed.ts`, in particolare crea gli utenti tramite autenticazione per email (abilitata solo per supabase locale) e riempie di conseguenza tutte le altre tabelle

ATTENZIONE: Elimina tutti i dati presenti nel db prima di generarne di nuovi
## Autenticazione

L'autenticazione degli utenti è gestita tramite Supabase che offre la possibilità di effettuare la login attraverso:
  - Email
  - Telefono
  - OAuth
  - SAML

Per il caso d'uso di questo progetto viene utilizzato esclusivamente il sistema di autenticazione SSO OAuth2.0 di Google utilizzando il [bottone pre-built](https://developers.google.com/identity/gsi/web/guides/display-button).


[snaplet]:https://snaplet-seed.netlify.app/seed/getting-started/overview