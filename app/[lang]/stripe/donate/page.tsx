"use client";

import { useState } from "react";
import { Button } from "@/app/(components)/ui/button";
import { Input } from "@/app/(components)/ui/input";
import { useParams } from "next/navigation";

export default function DonatePage() {
  const [loading, setLoading] = useState(false);
  const [amount, setAmount] = useState<string>(""); // dollars as string, e.g. "10.00"
  const params = useParams();
  const lang = params?.lang as string;

  const presets = [
    { amount: 5, price_id: 'price_1SK5eG4HdUbnAvC55fBpI47p' },
    { amount: 10, price_id: 'price_1SK5fM4HdUbnAvC5Tw99tR5P' },
    { amount: 50, price_id: 'price_1SK5fM4HdUbnAvC5dKVmn0Cp' },
    { amount: 100, price_id: 'price_1SK5fM4HdUbnAvC5K28Ntg1B' },
  ];

  const handleDonate = async (price_id?: string, customAmountCents?: number) => {
    setLoading(true);
    let res: any = {};
    try {
      res = await fetch("/api/donate", {
        method: "POST",
        body: JSON.stringify({ lang, price_id, amount: customAmountCents }),
        headers: { 'Content-Type': 'application/json' },
      });
    } catch (err) {
      console.log(err);
      res = { json: async () => ({ error: "Network error" }) };
    }

    try {
      const data = await res.json();
      if (data?.url) {
        window.location.href = data.url;
      } else {
        console.error('Failed to create session', data);
        setLoading(false);
      }
    } catch (e) {
      console.error('Invalid JSON response', e);
      setLoading(false);
    }
  };

  const handleCustomDonate = () => {
    // parse amount in dollars and convert to cents
    const parsed = parseFloat(amount.replace(/[^0-9.]/g, ""));
    if (Number.isNaN(parsed) || parsed <= 0) {
      alert('Please enter a valid amount');
      return;
    }

    const cents = Math.round(parsed * 100);
    // enforce a small minimum (50 cents)
    if (cents < 50) {
      alert('Minimum donation is $0.50');
      return;
    }

    handleDonate(undefined, cents);
  };

  return (
    <div className="flex flex-col items-center mt-10 mb-10">
      <h1 className="text-3xl font-bold mb-6">Support Our Mission 💚</h1>
      <p className="max-w-xl text-center mb-8">
        Your donation helps us continue providing free resources and education.
      </p>

      <div className="flex flex-col items-center gap-4">
        <div className="flex gap-4">
          {presets.map((item) => (
            <Button
              key={item.amount}
              onClick={() => handleDonate(item.price_id)}
              disabled={loading}
              className="cursor-pointer"
            >
              Donate ${item.amount}
            </Button>
          ))}
        </div>

        <div className="flex items-center gap-2 mt-4">
          <Input
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="Other amount (USD)"
            className="w-40"
            inputMode="decimal"
          />
          <Button onClick={handleCustomDonate} disabled={loading}>
            Donate custom
          </Button>
        </div>
      </div>
    </div>
  );
}
