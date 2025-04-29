import supabase from "./lib/supabaseServerClient.js";

const subscriptionPlan = [
  { plan_name: "Basic", price: "50", duration: "month" },
  { plan_name: "Premium", price: "150", duration: "month" },
];

export default async function seed() {
  const seedSubscriptionPlans = async () => {
    const { data, error } = await supabase
      .from("subscriptionPlanTable")
      .insert(subscriptionPlan)
      .select("*");

    if (error) {
      console.error("Error inserting subscription plans:", error);
    } else {
      console.log("Inserted subscription plans:", data);
    }
  };

  await seedSubscriptionPlans();
  console.log("Seeding completed.");
}

seed().catch((err) => {
  console.error("Seeding failed:", err);
});
