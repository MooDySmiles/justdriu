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

const main = async () => {
  const seed = await createSeedClient();

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

  // Seed the database with 3 auth_users
  // await seed.auth_users((x) => x(3));
  // await seed.profile(x => x(3));

  // utente di test test@test.it pass: test DO NOT CHANGE
  //   console.log(`
  // insert into auth.users (instance_id, id, aud, role, email, encrypted_password, raw_app_meta_data, raw_user_meta_data, email_confirmed_at, created_at)
  // values ('00000000-0000-0000-0000-000000000000', '6ab4b401-d9ee-4c96-a972-c44d542cd32c', 'authenticated', 'authenticated', 'test@test.it', '$2a$10$OctB9kNcQUy2W4vofoFjKOYtq4beq31dujrTWkIIZuZFje/2LEWX6', '{"provider":"email","providers":["email"]}', '{}', timezone('utc'::text, now()), timezone('utc'::text, now()));

  // insert into auth.identities (id, user_id, provider_id, identity_data, provider, created_at)
  // values ('6ab4b401-d9ee-4c96-a972-c44d542cd32c', '6ab4b401-d9ee-4c96-a972-c44d542cd32c', '6ab4b401-d9ee-4c96-a972-c44d542cd32c',	'{"sub": "6ab4b401-d9ee-4c96-a972-c44d542cd32c"}', 'email', timezone('utc'::text, now()));
  // `)
  // await seed.profile((x) => x(profile.length), {connect: {profile}})
  const { food_provider } = await seed.food_provider((x) => x(2));
  const { dish_type } = await seed.dish_type((x) => x(5));
  const { dish } = await seed.dish((x) => x(10), {
    connect: { dish_type },
  });

  await seed.food_provider_dish((x) => x(4), {
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

void main();
