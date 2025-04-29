"use client";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { CardContent, CardFooter } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Link from "next/link";
import { Building2, CreditCard, Calendar, ArrowLeft } from "lucide-react";
import React from "react";

export default function SubscriptionPage() {
  interface SubscriptionPlan {
    plan_name: string;
    price: string;
    duration: string;
  }
  const [subscriptionPlans, setSubscriptionPlans] = useState<
    SubscriptionPlan[]
  >([]);
  const [loading, setLoading] = useState(true);

  const fetchSubscriptionPlans = async () => {
    try {
      const response = await fetch("/api/subscriptionPlans", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
      if (!response.ok) {
        throw new Error("Failed to fetch subscription plans");
      }
      const data = await response.json();
      setSubscriptionPlans(data);
    } catch (error) {
      console.error("Error fetching subscription plans:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubscriptionPlans();
  }, []);

  return (
    <>
      <CardContent className="space-y-6">
        <div className="space-y-4">
          <Button
            variant="ghost"
            className="flex items-center text-sm font-medium text-muted-foreground hover:text-foreground p-0 mb-4"
            
          >
            <ArrowLeft className="mr-1 h-4 w-4" />
            Back to Business Information
          </Button>

          <div className="space-y-2">
                  <Label>Subscription Plan</Label>
                  {loading ? (
                    <p className="text-sm text-muted-foreground">
                      Loading subscription plans...
                    </p>
                  ) : subscriptionPlans.length > 0 ? (
                    <RadioGroup defaultValue={subscriptionPlans[0].plan_name}>
                      <div className="flex flex-col space-y-4 md:flex-row md:space-x-4 md:space-y-0">
                        {subscriptionPlans.map((plan) => (
                          <div
                            key={plan.plan_name}
                            className="flex items-start space-x-2 rounded-md border p-4  w-full"
                          >
                            <RadioGroupItem
                              value={plan.plan_name}
                              id={plan.plan_name}
                            />
                            <div className="flex flex-col space-y-1">
                              <Label
                                htmlFor={plan.plan_name}
                                className="font-medium text-2xl"
                              >
                                {plan.plan_name}
                              </Label>
                              {`₵ ${plan.price} /${plan.duration}`}
                            </div>
                          </div>
                        ))}
                      </div>
                    </RadioGroup>
                  ) : (
                    <p className="text-sm text-muted-foreground">
                      No subscription plans available.
                    </p>
                  )}
                </div>

                <div className="space-y-2">
                  <Label>QR Code</Label>
                  <div className="rounded-md border border-dashed p-8 text-center">
                    <div className="mx-auto flex max-w-[420px] flex-col items-center justify-center text-center">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                        <Building2 className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <h3 className="mt-4 text-lg font-semibold">
                        QR Code Generation
                      </h3>
                      <p className="mt-2 text-sm text-muted-foreground">
                        Your unique QR code will be generated automatically
                        after registration.
                      </p>
                    </div>
                  </div>
                </div>

          <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
            <div className="flex items-center space-x-2 rounded-md border p-4">
              <CreditCard className="h-5 w-5 text-muted-foreground" />
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Billing Information</p>
                <p className="text-xs text-muted-foreground">
                  Youll be prompted to enter payment details after
                  registration.
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2 rounded-md border p-4">
              <Calendar className="h-5 w-5 text-muted-foreground" />
              <div className="space-y-0.5">
                <p className="text-sm font-medium">Last Updated</p>
                <p className="text-xs text-muted-foreground">
                  The updatedAt timestamp will be set automatically.
                </p>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col space-y-4">
        <Button
          className="w-full bg-primary hover:bg-primary/90"
          
        >
          Complete Registration
        </Button>
        <p className="text-center text-sm text-muted-foreground">
          By registering, you agree to our{" "}
          <Link href="/terms" className="text-primary hover:underline">
            Terms of Service
          </Link>{" "}
          and{" "}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
          .
        </p>
      </CardFooter>
    </>
  );
}
