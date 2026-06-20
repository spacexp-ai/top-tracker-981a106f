import { createClient } from "@supabase/supabase-js";
import fs from "fs";
import path from "path";

const SUPABASE_URL = process.env.SUPABASE_URL || process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

console.log("Supabase URL:", SUPABASE_URL);
console.log("Service Role Key Exists:", !!SUPABASE_SERVICE_ROLE_KEY);

if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
  console.error("Missing SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY in .env");
  process.exit(1);
}

const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

async function run() {
  console.log("\n=== Checking auth.users ===");
  // Note: auth.users is in auth schema, we can try querying via RPC or SQL, or using supabase.auth.admin
  const { data: users, error: usersErr } = await supabase.auth.admin.listUsers();
  if (usersErr) {
    console.error("Error listing users:", usersErr);
  } else {
    console.log("Found users:");
    users.users.forEach((u) => {
      console.log(`- ID: ${u.id}, Email: ${u.email}, Metadata:`, u.user_metadata);
    });
  }

  console.log("\n=== Checking public.profiles ===");
  const { data: profiles, error: profErr } = await supabase.from("profiles").select("*");
  if (profErr) {
    console.error("Error fetching profiles:", profErr);
  } else {
    console.log("Found profiles:");
    profiles.forEach((p) => {
      console.log(`- ID: ${p.id}, Display Name: ${p.display_name}, Tier: ${p.tier}`);
    });
  }

  console.log("\n=== Checking public.user_roles ===");
  const { data: roles, error: rolesErr } = await supabase.from("user_roles").select("*");
  if (rolesErr) {
    console.error("Error fetching user_roles:", rolesErr);
  } else {
    console.log("Found user_roles:");
    roles.forEach((r) => {
      console.log(`- ID: ${r.id}, User ID: ${r.user_id}, Role: ${r.role}`);
    });
  }
}

run().catch(console.error);
