// // app/confirm/page.tsx
// "use client";

// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
// import { EmailOtpType } from "@supabase/supabase-js";

// export default function ConfirmPage() {
//   const supabase = createClientComponentClient();
//   const router = useRouter();
//   const [message, setMessage] = useState("Verifying...");

//   useEffect(() => {
//     const verifyEmail = async () => {
//       const params = new URLSearchParams(window.location.search);
//       const token_hash = params.get("token_hash");
//       const type: EmailOtpType = params.get("type") as EmailOtpType;

//       if (!token_hash || !type) {
//         setMessage("Invalid confirmation link.");
//         return;
//       }

//       const { error } = await supabase.auth.verifyOtp({
//         token_hash,
//         type,
//       });

//       if (error) {
//         setMessage("Verification failed: " + error.message);
//       } else {
//         setMessage("Email confirmed! Redirecting...");
//         setTimeout(() => {
//           router.push("/");
//         }, 1500);
//       }
//     };

//     verifyEmail();

//   }, [supabase,router]);

//   return <p>{message}</p>;
// }

"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { EmailOtpType } from "@supabase/supabase-js";

export default function ConfirmPage() {
  const supabase = createClientComponentClient();
  const router = useRouter();
  const [message, setMessage] = useState("Verifying...");

  useEffect(() => {
    const verifyEmail = async () => {
      const params = new URLSearchParams(window.location.search);
      const token_hash = params.get("token_hash");
      const type: EmailOtpType = params.get("type") as EmailOtpType;

      if (!token_hash || !type) {
        setMessage("Invalid confirmation link.");
        return;
      }

      // 1. Verify the email
      const { error: verifyError } = await supabase.auth.verifyOtp({
        token_hash,
        type,
      });

      if (verifyError) {
        setMessage("Verification failed: " + verifyError.message);
        return;
      }

      // 2. Get the current user
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();
      if (userError || !user) {
        setMessage("Failed to retrieve user after verification.");
        return;
      }

      // 3. Insert the user into the "User" table if not already there
      const { data: existingUser } = await supabase
        .from("User")
        .select("id")
        .eq("id", user.id)
        .maybeSingle();

      if (!existingUser) {
        const { error: insertError } = await supabase.from("User").insert([
          {
            id: user.id,
            email: user.email,
            created_at: new Date().toISOString(),
            updated_at: new Date().toISOString(),
          },
        ]);
        if (insertError) {
          setMessage("User saved failed: " + insertError.message);
          return;
        }
      }

      // 4. Redirect after success
      setMessage("Email confirmed and user saved! Redirecting...");
      setTimeout(() => {
        router.push("/protected");
      }, 2000);
    };

    verifyEmail();
  }, [supabase, router]);

  return <p className="text-center mt-20 text-lg">{message}</p>;
}
