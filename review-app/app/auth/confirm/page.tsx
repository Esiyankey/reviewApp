// app/confirm/page.tsx
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

      const { error } = await supabase.auth.verifyOtp({
        token_hash,
        type,
      });

      if (error) {
        setMessage("Verification failed: " + error.message);
      } else {
        setMessage("Email confirmed! Redirecting...");
        setTimeout(() => {
          router.push("/"); 
        }, 1500);
      }
    };

    verifyEmail();
    
  }, [supabase,router]);


  
  return <p>{message}</p>;
}
