

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;


CREATE SCHEMA IF NOT EXISTS "public";


ALTER SCHEMA "public" OWNER TO "pg_database_owner";


COMMENT ON SCHEMA "public" IS 'standard public schema';



CREATE OR REPLACE FUNCTION "public"."handle_new_user"() RETURNS "trigger"
    LANGUAGE "plpgsql" SECURITY DEFINER
    SET "search_path" TO ''
    AS $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$;


ALTER FUNCTION "public"."handle_new_user"() OWNER TO "postgres";

SET default_tablespace = '';

SET default_table_access_method = "heap";


CREATE TABLE IF NOT EXISTS "public"."dish" (
    "id" integer NOT NULL,
    "name" "text",
    "description" "text"
);


ALTER TABLE "public"."dish" OWNER TO "postgres";


COMMENT ON COLUMN "public"."dish"."description" IS 'Description of the dish';



CREATE SEQUENCE IF NOT EXISTS "public"."dish_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."dish_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."dish_id_seq" OWNED BY "public"."dish"."id";



CREATE TABLE IF NOT EXISTS "public"."dish_type" (
    "id" integer NOT NULL,
    "type" "text"
);


ALTER TABLE "public"."dish_type" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."dish_type_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."dish_type_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."dish_type_id_seq" OWNED BY "public"."dish_type"."id";



CREATE TABLE IF NOT EXISTS "public"."food_provider" (
    "id" integer NOT NULL,
    "name" "text",
    "address" "text",
    "open_hour_1" time without time zone,
    "close_hour_1" time without time zone,
    "open_hour_2" time without time zone,
    "close_hour_2" time without time zone
);


ALTER TABLE "public"."food_provider" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."food_provider_dish" (
    "dish_id" integer NOT NULL,
    "food_provider_id" integer NOT NULL,
    "price" double precision
);


ALTER TABLE "public"."food_provider_dish" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."food_provider_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."food_provider_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."food_provider_id_seq" OWNED BY "public"."food_provider"."id";



CREATE TABLE IF NOT EXISTS "public"."order" (
    "id" integer NOT NULL,
    "organizer" "uuid",
    "day" timestamp without time zone,
    "end_hour" time without time zone
);


ALTER TABLE "public"."order" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."order_dish" (
    "order_id" integer NOT NULL,
    "dish_id" integer NOT NULL,
    "quantity" smallint
);


ALTER TABLE "public"."order_dish" OWNER TO "postgres";


CREATE SEQUENCE IF NOT EXISTS "public"."order_id_seq"
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE "public"."order_id_seq" OWNER TO "postgres";


ALTER SEQUENCE "public"."order_id_seq" OWNED BY "public"."order"."id";



CREATE TABLE IF NOT EXISTS "public"."profiles" (
    "id" "uuid" NOT NULL,
    "updated_at" timestamp with time zone,
    "username" "text",
    "full_name" "text",
    "avatar_url" "text",
    "preferred_ship_address" "text",
    "preferred_ship_hour" time without time zone,
    CONSTRAINT "username_length" CHECK (("char_length"("username") >= 3))
);


ALTER TABLE "public"."profiles" OWNER TO "postgres";


CREATE TABLE IF NOT EXISTS "public"."profiles_order" (
    "profiles_id" "uuid" NOT NULL,
    "order_id" integer NOT NULL
);


ALTER TABLE "public"."profiles_order" OWNER TO "postgres";


ALTER TABLE ONLY "public"."dish" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."dish_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."dish_type" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."dish_type_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."food_provider" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."food_provider_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."order" ALTER COLUMN "id" SET DEFAULT "nextval"('"public"."order_id_seq"'::"regclass");



ALTER TABLE ONLY "public"."dish"
    ADD CONSTRAINT "dish_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."dish_type"
    ADD CONSTRAINT "dish_type_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."food_provider_dish"
    ADD CONSTRAINT "food_provider_dish_pkey" PRIMARY KEY ("dish_id", "food_provider_id");



ALTER TABLE ONLY "public"."food_provider"
    ADD CONSTRAINT "food_provider_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."order_dish"
    ADD CONSTRAINT "order_dish_pkey" PRIMARY KEY ("order_id", "dish_id");



ALTER TABLE ONLY "public"."order"
    ADD CONSTRAINT "order_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles_order"
    ADD CONSTRAINT "profiles_order_pkey" PRIMARY KEY ("profiles_id", "order_id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_pkey" PRIMARY KEY ("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_username_key" UNIQUE ("username");



ALTER TABLE ONLY "public"."dish"
    ADD CONSTRAINT "dish_id_fkey" FOREIGN KEY ("id") REFERENCES "public"."dish_type"("id");



ALTER TABLE ONLY "public"."food_provider_dish"
    ADD CONSTRAINT "food_provider_dish_dish_id_fkey" FOREIGN KEY ("dish_id") REFERENCES "public"."dish"("id");



ALTER TABLE ONLY "public"."food_provider_dish"
    ADD CONSTRAINT "food_provider_dish_food_provider_id_fkey" FOREIGN KEY ("food_provider_id") REFERENCES "public"."food_provider"("id");



ALTER TABLE ONLY "public"."order_dish"
    ADD CONSTRAINT "order_dish_dish_id_fkey" FOREIGN KEY ("dish_id") REFERENCES "public"."dish"("id");



ALTER TABLE ONLY "public"."order_dish"
    ADD CONSTRAINT "order_dish_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."order"("id");



ALTER TABLE ONLY "public"."order"
    ADD CONSTRAINT "order_organizer_fkey" FOREIGN KEY ("organizer") REFERENCES "public"."profiles"("id");



ALTER TABLE ONLY "public"."profiles"
    ADD CONSTRAINT "profiles_id_fkey" FOREIGN KEY ("id") REFERENCES "auth"."users"("id") ON DELETE CASCADE;



ALTER TABLE ONLY "public"."profiles_order"
    ADD CONSTRAINT "profiles_order_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "public"."order"("id");



ALTER TABLE ONLY "public"."profiles_order"
    ADD CONSTRAINT "profiles_order_profiles_id_fkey" FOREIGN KEY ("profiles_id") REFERENCES "public"."profiles"("id");



CREATE POLICY "Public profiles are viewable by everyone." ON "public"."profiles" FOR SELECT USING (true);



CREATE POLICY "Users can insert their own profile." ON "public"."profiles" FOR INSERT WITH CHECK ((( SELECT "auth"."uid"() AS "uid") = "id"));



CREATE POLICY "Users can update own profile." ON "public"."profiles" FOR UPDATE USING ((( SELECT "auth"."uid"() AS "uid") = "id"));



ALTER TABLE "public"."profiles" ENABLE ROW LEVEL SECURITY;


GRANT USAGE ON SCHEMA "public" TO "postgres";
GRANT USAGE ON SCHEMA "public" TO "anon";
GRANT USAGE ON SCHEMA "public" TO "authenticated";
GRANT USAGE ON SCHEMA "public" TO "service_role";



GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "anon";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "authenticated";
GRANT ALL ON FUNCTION "public"."handle_new_user"() TO "service_role";



GRANT ALL ON TABLE "public"."dish" TO "anon";
GRANT ALL ON TABLE "public"."dish" TO "authenticated";
GRANT ALL ON TABLE "public"."dish" TO "service_role";



GRANT ALL ON SEQUENCE "public"."dish_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."dish_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."dish_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."dish_type" TO "anon";
GRANT ALL ON TABLE "public"."dish_type" TO "authenticated";
GRANT ALL ON TABLE "public"."dish_type" TO "service_role";



GRANT ALL ON SEQUENCE "public"."dish_type_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."dish_type_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."dish_type_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."food_provider" TO "anon";
GRANT ALL ON TABLE "public"."food_provider" TO "authenticated";
GRANT ALL ON TABLE "public"."food_provider" TO "service_role";



GRANT ALL ON TABLE "public"."food_provider_dish" TO "anon";
GRANT ALL ON TABLE "public"."food_provider_dish" TO "authenticated";
GRANT ALL ON TABLE "public"."food_provider_dish" TO "service_role";



GRANT ALL ON SEQUENCE "public"."food_provider_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."food_provider_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."food_provider_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."order" TO "anon";
GRANT ALL ON TABLE "public"."order" TO "authenticated";
GRANT ALL ON TABLE "public"."order" TO "service_role";



GRANT ALL ON TABLE "public"."order_dish" TO "anon";
GRANT ALL ON TABLE "public"."order_dish" TO "authenticated";
GRANT ALL ON TABLE "public"."order_dish" TO "service_role";



GRANT ALL ON SEQUENCE "public"."order_id_seq" TO "anon";
GRANT ALL ON SEQUENCE "public"."order_id_seq" TO "authenticated";
GRANT ALL ON SEQUENCE "public"."order_id_seq" TO "service_role";



GRANT ALL ON TABLE "public"."profiles" TO "anon";
GRANT ALL ON TABLE "public"."profiles" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles" TO "service_role";



GRANT ALL ON TABLE "public"."profiles_order" TO "anon";
GRANT ALL ON TABLE "public"."profiles_order" TO "authenticated";
GRANT ALL ON TABLE "public"."profiles_order" TO "service_role";



ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON SEQUENCES  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON FUNCTIONS  TO "service_role";






ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "postgres";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "anon";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "authenticated";
ALTER DEFAULT PRIVILEGES FOR ROLE "postgres" IN SCHEMA "public" GRANT ALL ON TABLES  TO "service_role";






RESET ALL;
