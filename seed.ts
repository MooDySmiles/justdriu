/**
 * ! Executing this script will delete all data in your database and seed it with 2 auth_users.
 * ! Make sure to adjust the script to your needs.
 * Use any TypeScript runner to run this script, for example: `npx tsx seed.ts`
 * Learn more about the Seed Client by following our guide: https://docs.snaplet.dev/seed/getting-started
 */
import { createSeedClient } from "@snaplet/seed";
import { createClient } from "@supabase/supabase-js";
import { copycat } from "@snaplet/copycat";
import { type Tables } from "./types/database";

// workaround per il problema che vengono generati timestamp se il tipo di dato nel db è timetz
const time = (ctx) =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
  new Date(copycat.dateString(ctx.seed)).toLocaleTimeString();

const main = async () => {
  // sovrascrivo le funzioni di default per la generazione delle colonne dove il tipo è timetz
  const seed = await createSeedClient({
    models: {
      profile: {
        data: { preferred_ship_hour: time },
      },
      command: {
        data: { end_hour: time },
      },
      food_provider: {
        data: {
          open_hour_1: time,
          close_hour_1: time,
          open_hour_2: time,
          close_hour_2: time,
        },
      },
    },
  });

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
  );

  const PASSWORD = "testuser";
  // Reset our database to start from a clean state
  await seed.$resetDatabase();

  // Creating a pool of users with common attributes
  for (let i = 0; i < 5; i++) {
    const fullName = copycat.fullName(i);
    await supabase.auth.signUp({
      email: `user${i}@test.com`,
      password: PASSWORD,
      options: {
        data: { username: `user${i}`, full_name: fullName },
      },
    });
  }

  // Retrieving profiles for linking with new data
  const { data: databaseProfiles } = await supabase.from("profile").select();
  const profile =
    databaseProfiles?.map((profile: Tables<"profile">) => ({
      avatarUrl: profile.avatar_url,
      id: profile.id,
      full_name: profile.full_name,
      user_name: profile.username,
    })) ?? [];

  const { food_provider } = await seed.food_provider((x) => x(2));
  const { dish_type } = await seed.dish_type((x) => x(5));
  const { dish } = await seed.dish((x) => x(10), {
    connect: { dish_type },
  });

  await seed.food_provider_dish((x) => x(14), {
    connect: {
      dish,
      food_provider,
    },
  });
  const { command } = await seed.command((x) => x(3), {
    connect: {
      profile,
      food_provider,
    },
  });
  const { order } = await seed.order((x) => x(10), {
    connect: {
      profile,
      command,
    },
  });
  await seed.order_dish((x) => x(10), {
    connect: {
      order,
      dish,
    },
  });

  process.exit();
};

main();
