ALTER TABLE IF EXISTS "profiles" 
  DROP "website",
  ADD "preferred_ship_address" text,
  ADD "preferred_ship_hour" time;

CREATE TABLE "order" (
  "id" serial PRIMARY KEY,
  "organizer" uuid,
  "day" timestamp,
  "end_hour" time
);

CREATE TABLE "order_dish" (
  "order_id" integer,
  "dish_id" integer,
  "quantity" smallint,
  PRIMARY KEY ("order_id", "dish_id")
);

CREATE TABLE "dish_type" (
  "id" serial PRIMARY KEY,
  "type" text
);

CREATE TABLE "dish" (
  "id" serial PRIMARY KEY,
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

CREATE TABLE "profiles_order" (
  "profiles_id" uuid,
  "order_id" integer,
  PRIMARY KEY ("profiles_id", "order_id")
);

ALTER TABLE "profiles_order" ADD FOREIGN KEY ("profiles_id") REFERENCES "profiles" ("id");

ALTER TABLE "profiles_order" ADD FOREIGN KEY ("order_id") REFERENCES "order" ("id");


ALTER TABLE "order" ADD FOREIGN KEY ("organizer") REFERENCES "profiles" ("id");

ALTER TABLE "order_dish" ADD FOREIGN KEY ("order_id") REFERENCES "order" ("id");

ALTER TABLE "order_dish" ADD FOREIGN KEY ("dish_id") REFERENCES "dish" ("id");

ALTER TABLE "dish" ADD FOREIGN KEY ("id") REFERENCES "dish_type" ("id");

ALTER TABLE "food_provider_dish" ADD FOREIGN KEY ("dish_id") REFERENCES "dish" ("id");

ALTER TABLE "food_provider_dish" ADD FOREIGN KEY ("food_provider_id") REFERENCES "food_provider" ("id");
