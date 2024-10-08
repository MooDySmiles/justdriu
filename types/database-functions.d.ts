/**
 * Supabase non supporta per adesso i tipi delle funzioni come le tabelle quindi non si può scrivere per esempio:
 * Functions<'menu'> // non accettato
 * Database['public']['Functions']['menu'] // corretto
 *
 * Di seguito verranno inseriti i tipi custom per i dati restituiti dalle funzioni postgrest in modo da poter usare la dicitura
 * Funtctions<'nome_funzione'> come tipo di oggetti restituiti dalle funzioni
 */
import { type Database } from "./database";

type PublicSchema = Database[Extract<keyof Database, "public">];

export type Functions<
  PublicFunctionNameOrOptions extends
    | keyof PublicSchema["Functions"]
    | { schema: keyof Database },
  FunctionName extends PublicFunctionNameOrOptions extends {
    schema: keyof Database;
  }
    ? keyof Database[PublicFunctionNameOrOptions["schema"]]["Functions"]
    : never = never,
> = PublicFunctionNameOrOptions extends { schema: keyof Database }
  ? Database[PublicFunctionNameOrOptions["schema"]]["Functions"][FunctionName] extends {
      Returns: infer F;
    }
    ? F
    : never
  : PublicFunctionNameOrOptions extends keyof PublicSchema["Functions"]
    ? PublicSchema["Functions"][PublicFunctionNameOrOptions] extends {
        Returns: infer F;
      }
      ? F
      : never
    : never;
