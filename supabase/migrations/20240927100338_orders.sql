ALTER TABLE IF EXISTS "profile"
  DROP "website",
  ADD "preferred_ship_address" text,
  ADD "preferred_ship_hour" time with time zone;

CREATE TABLE "command" (
  "id" bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "organizer" uuid,
  "food_provider_id" integer,
  "delivery_datetime" timestamp with time zone,
  "end_hour" time with time zone,
  "created_at" timestamp with time zone,
  "updated_at" timestamp with time zone,
  "delivery_address" text
);

CREATE TABLE "order" (
  "id" bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "profile_id" uuid,
  "command_id" integer,
  "updated_at" timestamp with time zone
);

CREATE TABLE "order_dish" (
  "order_id" integer NOT NULL,
  "dish_id" integer NOT NULL,
  "quantity" smallint,
  PRIMARY KEY ("order_id", "dish_id")
);

CREATE TABLE "dish_type" (
  "id" bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "type" text
);

CREATE TABLE "dish" (
  "id" bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "type" integer,
  "name" text,
  "description" text
);

CREATE TABLE "food_provider_dish" (
  "dish_id" integer,
  "food_provider_id" integer,
  "price" float,
  PRIMARY KEY ("dish_id", "food_provider_id")
);

CREATE TABLE "food_provider" (
  "id" bigint GENERATED ALWAYS AS IDENTITY PRIMARY KEY,
  "name" text,
  "address" text,
  "open_hour_1" time with time zone,
  "close_hour_1" time with time zone,
  "open_hour_2" time with time zone,
  "close_hour_2" time with time zone
);

COMMENT ON COLUMN "dish"."description" IS 'Description of the dish';

ALTER TABLE "order" ADD FOREIGN KEY ("profile_id") REFERENCES "profile" ("id");

ALTER TABLE "order" ADD FOREIGN KEY ("command_id") REFERENCES "command" ("id");

ALTER TABLE "order_dish" ADD CONSTRAINT "order_dish_dish_id_fkey" FOREIGN KEY ("dish_id") REFERENCES "dish" ("id");

ALTER TABLE "order_dish" ADD CONSTRAINT "order_dish_order_id_fkey" FOREIGN KEY ("order_id") REFERENCES "order" ("id");

ALTER TABLE "dish" ADD CONSTRAINT "dish_id_fkey" FOREIGN KEY ("type") REFERENCES "dish_type" ("id");

ALTER TABLE "food_provider_dish" ADD CONSTRAINT "food_provider_dish_dish_id_fkey" FOREIGN KEY ("dish_id") REFERENCES "dish" ("id");

ALTER TABLE "food_provider_dish" ADD CONSTRAINT "food_provider_dish_food_provider_id_fkey" FOREIGN KEY ("food_provider_id") REFERENCES "food_provider" ("id");

ALTER TABLE "command" ADD CONSTRAINT "order_organizer_fkey" FOREIGN KEY ("organizer") REFERENCES "profile" ("id");

ALTER TABLE "command" ADD FOREIGN KEY ("food_provider_id") REFERENCES "food_provider" ("id");

-- funzione che ritorna le comande dati i partecipanti alla comanda
create or replace function public.command_by_participant (participants_id uuid)
returns table (
  "id" bigint,
  "organizer" uuid,
  "food_provider_id" integer,
  "delivery_datetime" timestamp with time zone,
  "end_hour" time with time zone,
  "created_at" timestamp with time zone,
  "updated_at" timestamp with time zone,
  "delivery_address" text
)
as $$
SELECT c.*
FROM
  command as c
  inner JOIN "order" as o ON c.id = o.command_id
where o.profile_id = $1
group by c.id
$$ language sql RETURNS NULL ON NULL INPUT;
