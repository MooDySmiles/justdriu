
ALTER TABLE IF EXISTS "order" 
  ADD "food_provider_id" integer,
  ADD "created_at" timestamp,
  ADD "updated_at" timestamp;

ALTER TABLE IF EXISTS "order"
  RENAME "day" TO "delivery_datetime";

ALTER TABLE "order" ADD FOREIGN KEY ("food_provider_id") REFERENCES "food_provider" ("id");