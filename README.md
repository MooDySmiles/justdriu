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
  --dbname "$LOCAL_DB_URL"

// se si vuole importare anche i dati eseguire
psql \
  --single-transaction \
  --variable ON_ERROR_STOP=1 \
  --file roles.sql \
  --file schema.sql \
  --command 'SET session_replication_role = replica' \
  --file data.sql \
  --dbname "$LOCAL_DB_URL"
```

Nota: LOCAL_DB_URL viene notificato allo start di supabase e dovrebbe coincidere con `postgresql://postgres:postgres@127.0.0.1:54322/postgres`

## Autenticazione

L'autenticazione degli utenti è gestita tramite Supabase che offre la possibilità di effettuare la login attraverso:
  - Email
  - Telefono
  - OAuth
  - SAML

Per il caso d'uso di questo progetto viene utilizzato esclusivamente il sistema di autenticazione SSO OAuth2.0 di Google utilizzando il [bottone pre-built](https://developers.google.com/identity/gsi/web/guides/display-button).
