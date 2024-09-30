--
-- PostgreSQL database dump
--

-- Dumped from database version 15.1 (Ubuntu 15.1-1.pgdg20.04+1)
-- Dumped by pg_dump version 16.3

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

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: pg_database_owner
--

CREATE SCHEMA public;


ALTER SCHEMA public OWNER TO pg_database_owner;

--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: pg_database_owner
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: handle_new_user(); Type: FUNCTION; Schema: public; Owner: postgres
--

CREATE FUNCTION public.handle_new_user() RETURNS trigger
    LANGUAGE plpgsql SECURITY DEFINER
    SET search_path TO ''
    AS $$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$$;


ALTER FUNCTION public.handle_new_user() OWNER TO postgres;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: dish; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dish (
    id integer NOT NULL,
    name text,
    description text
);


ALTER TABLE public.dish OWNER TO postgres;

--
-- Name: COLUMN dish.description; Type: COMMENT; Schema: public; Owner: postgres
--

COMMENT ON COLUMN public.dish.description IS 'Description of the dish';


--
-- Name: dish_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dish_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.dish_id_seq OWNER TO postgres;

--
-- Name: dish_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dish_id_seq OWNED BY public.dish.id;


--
-- Name: dish_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.dish_type (
    id integer NOT NULL,
    type text
);


ALTER TABLE public.dish_type OWNER TO postgres;

--
-- Name: dish_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.dish_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.dish_type_id_seq OWNER TO postgres;

--
-- Name: dish_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.dish_type_id_seq OWNED BY public.dish_type.id;


--
-- Name: food_provider; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.food_provider (
    id integer NOT NULL,
    name text,
    address text,
    open_hour_1 time without time zone,
    close_hour_1 time without time zone,
    open_hour_2 time without time zone,
    close_hour_2 time without time zone
);


ALTER TABLE public.food_provider OWNER TO postgres;

--
-- Name: food_provider_dish; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.food_provider_dish (
    dish_id integer NOT NULL,
    food_provider_id integer NOT NULL,
    price double precision
);


ALTER TABLE public.food_provider_dish OWNER TO postgres;

--
-- Name: food_provider_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.food_provider_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.food_provider_id_seq OWNER TO postgres;

--
-- Name: food_provider_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.food_provider_id_seq OWNED BY public.food_provider.id;


--
-- Name: order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."order" (
    id integer NOT NULL,
    organizer uuid,
    day timestamp without time zone,
    end_hour time without time zone
);


ALTER TABLE public."order" OWNER TO postgres;

--
-- Name: order_dish; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_dish (
    order_id integer NOT NULL,
    dish_id integer NOT NULL,
    quantity smallint
);


ALTER TABLE public.order_dish OWNER TO postgres;

--
-- Name: order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_id_seq OWNER TO postgres;

--
-- Name: order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_id_seq OWNED BY public."order".id;


--
-- Name: profiles; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profiles (
    id uuid NOT NULL,
    updated_at timestamp with time zone,
    username text,
    full_name text,
    avatar_url text,
    preferred_ship_address text,
    preferred_ship_hour time without time zone,
    CONSTRAINT username_length CHECK ((char_length(username) >= 3))
);


ALTER TABLE public.profiles OWNER TO postgres;

--
-- Name: profiles_order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.profiles_order (
    profiles_id uuid NOT NULL,
    order_id integer NOT NULL
);


ALTER TABLE public.profiles_order OWNER TO postgres;

--
-- Name: dish id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dish ALTER COLUMN id SET DEFAULT nextval('public.dish_id_seq'::regclass);


--
-- Name: dish_type id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dish_type ALTER COLUMN id SET DEFAULT nextval('public.dish_type_id_seq'::regclass);


--
-- Name: food_provider id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food_provider ALTER COLUMN id SET DEFAULT nextval('public.food_provider_id_seq'::regclass);


--
-- Name: order id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order" ALTER COLUMN id SET DEFAULT nextval('public.order_id_seq'::regclass);


--
-- Name: dish dish_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dish
    ADD CONSTRAINT dish_pkey PRIMARY KEY (id);


--
-- Name: dish_type dish_type_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dish_type
    ADD CONSTRAINT dish_type_pkey PRIMARY KEY (id);


--
-- Name: food_provider_dish food_provider_dish_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food_provider_dish
    ADD CONSTRAINT food_provider_dish_pkey PRIMARY KEY (dish_id, food_provider_id);


--
-- Name: food_provider food_provider_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food_provider
    ADD CONSTRAINT food_provider_pkey PRIMARY KEY (id);


--
-- Name: order_dish order_dish_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_dish
    ADD CONSTRAINT order_dish_pkey PRIMARY KEY (order_id, dish_id);


--
-- Name: order order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_pkey PRIMARY KEY (id);


--
-- Name: profiles_order profiles_order_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles_order
    ADD CONSTRAINT profiles_order_pkey PRIMARY KEY (profiles_id, order_id);


--
-- Name: profiles profiles_pkey; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_pkey PRIMARY KEY (id);


--
-- Name: profiles profiles_username_key; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_username_key UNIQUE (username);


--
-- Name: dish dish_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.dish
    ADD CONSTRAINT dish_id_fkey FOREIGN KEY (id) REFERENCES public.dish_type(id);


--
-- Name: food_provider_dish food_provider_dish_dish_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food_provider_dish
    ADD CONSTRAINT food_provider_dish_dish_id_fkey FOREIGN KEY (dish_id) REFERENCES public.dish(id);


--
-- Name: food_provider_dish food_provider_dish_food_provider_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.food_provider_dish
    ADD CONSTRAINT food_provider_dish_food_provider_id_fkey FOREIGN KEY (food_provider_id) REFERENCES public.food_provider(id);


--
-- Name: order_dish order_dish_dish_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_dish
    ADD CONSTRAINT order_dish_dish_id_fkey FOREIGN KEY (dish_id) REFERENCES public.dish(id);


--
-- Name: order_dish order_dish_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_dish
    ADD CONSTRAINT order_dish_order_id_fkey FOREIGN KEY (order_id) REFERENCES public."order"(id);


--
-- Name: order order_organizer_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT order_organizer_fkey FOREIGN KEY (organizer) REFERENCES public.profiles(id);


--
-- Name: profiles profiles_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles
    ADD CONSTRAINT profiles_id_fkey FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE;


--
-- Name: profiles_order profiles_order_order_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles_order
    ADD CONSTRAINT profiles_order_order_id_fkey FOREIGN KEY (order_id) REFERENCES public."order"(id);


--
-- Name: profiles_order profiles_order_profiles_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.profiles_order
    ADD CONSTRAINT profiles_order_profiles_id_fkey FOREIGN KEY (profiles_id) REFERENCES public.profiles(id);


--
-- Name: profiles Public profiles are viewable by everyone.; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Public profiles are viewable by everyone." ON public.profiles FOR SELECT USING (true);


--
-- Name: profiles Users can insert their own profile.; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can insert their own profile." ON public.profiles FOR INSERT WITH CHECK ((( SELECT auth.uid() AS uid) = id));


--
-- Name: profiles Users can update own profile.; Type: POLICY; Schema: public; Owner: postgres
--

CREATE POLICY "Users can update own profile." ON public.profiles FOR UPDATE USING ((( SELECT auth.uid() AS uid) = id));


--
-- Name: profiles; Type: ROW SECURITY; Schema: public; Owner: postgres
--

ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: pg_database_owner
--

GRANT USAGE ON SCHEMA public TO postgres;
GRANT USAGE ON SCHEMA public TO anon;
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT USAGE ON SCHEMA public TO service_role;


--
-- Name: FUNCTION handle_new_user(); Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON FUNCTION public.handle_new_user() TO anon;
GRANT ALL ON FUNCTION public.handle_new_user() TO authenticated;
GRANT ALL ON FUNCTION public.handle_new_user() TO service_role;


--
-- Name: TABLE dish; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.dish TO anon;
GRANT ALL ON TABLE public.dish TO authenticated;
GRANT ALL ON TABLE public.dish TO service_role;


--
-- Name: SEQUENCE dish_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.dish_id_seq TO anon;
GRANT ALL ON SEQUENCE public.dish_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.dish_id_seq TO service_role;


--
-- Name: TABLE dish_type; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.dish_type TO anon;
GRANT ALL ON TABLE public.dish_type TO authenticated;
GRANT ALL ON TABLE public.dish_type TO service_role;


--
-- Name: SEQUENCE dish_type_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.dish_type_id_seq TO anon;
GRANT ALL ON SEQUENCE public.dish_type_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.dish_type_id_seq TO service_role;


--
-- Name: TABLE food_provider; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.food_provider TO anon;
GRANT ALL ON TABLE public.food_provider TO authenticated;
GRANT ALL ON TABLE public.food_provider TO service_role;


--
-- Name: TABLE food_provider_dish; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.food_provider_dish TO anon;
GRANT ALL ON TABLE public.food_provider_dish TO authenticated;
GRANT ALL ON TABLE public.food_provider_dish TO service_role;


--
-- Name: SEQUENCE food_provider_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.food_provider_id_seq TO anon;
GRANT ALL ON SEQUENCE public.food_provider_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.food_provider_id_seq TO service_role;


--
-- Name: TABLE "order"; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public."order" TO anon;
GRANT ALL ON TABLE public."order" TO authenticated;
GRANT ALL ON TABLE public."order" TO service_role;


--
-- Name: TABLE order_dish; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.order_dish TO anon;
GRANT ALL ON TABLE public.order_dish TO authenticated;
GRANT ALL ON TABLE public.order_dish TO service_role;


--
-- Name: SEQUENCE order_id_seq; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON SEQUENCE public.order_id_seq TO anon;
GRANT ALL ON SEQUENCE public.order_id_seq TO authenticated;
GRANT ALL ON SEQUENCE public.order_id_seq TO service_role;


--
-- Name: TABLE profiles; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.profiles TO anon;
GRANT ALL ON TABLE public.profiles TO authenticated;
GRANT ALL ON TABLE public.profiles TO service_role;


--
-- Name: TABLE profiles_order; Type: ACL; Schema: public; Owner: postgres
--

GRANT ALL ON TABLE public.profiles_order TO anon;
GRANT ALL ON TABLE public.profiles_order TO authenticated;
GRANT ALL ON TABLE public.profiles_order TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR SEQUENCES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON SEQUENCES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR FUNCTIONS; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON FUNCTIONS TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: postgres
--

ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE postgres IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- Name: DEFAULT PRIVILEGES FOR TABLES; Type: DEFAULT ACL; Schema: public; Owner: supabase_admin
--

ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO postgres;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO anon;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO authenticated;
ALTER DEFAULT PRIVILEGES FOR ROLE supabase_admin IN SCHEMA public GRANT ALL ON TABLES TO service_role;


--
-- PostgreSQL database dump complete
--

