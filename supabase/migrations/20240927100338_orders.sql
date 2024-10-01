ALTER TABLE IF EXISTS "profiles"
  RENAME TO "profile";

ALTER TABLE IF EXISTS "profile"
  DROP "website",
  ADD "preferred_ship_address" text,
  ADD "preferred_ship_hour" time;

CREATE TABLE "command" (
  "id" integer PRIMARY KEY,
  "organizer" uuid,
  "food_provider_id" integer,
  "delivery_datetime" timestamp,
  "end_hour" time,
  "created_at" timestamp,
  "updated_at" timestamp,
  "delivery_address" text
);

CREATE TABLE "order" (
  "id" serial PRIMARY KEY,
  "profile_id" uuid,
  "command_id" integer,
  "updated_at" timestamp
);

CREATE TABLE "order_dish" (
  "order_id" integer NOT NULL,
  "dish_id" integer NOT NULL,
  "quantity" smallint,
  PRIMARY KEY ("order_id", "dish_id")
);

CREATE TABLE "dish_type" (
  "id" serial PRIMARY KEY,
  "type" text
);

CREATE TABLE "dish" (
  "id" serial PRIMARY KEY,
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
  "id" serial PRIMARY KEY,
  "name" text,
  "address" text,
  "open_hour_1" time,
  "close_hour_1" time,
  "open_hour_2" time,
  "close_hour_2" time
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
