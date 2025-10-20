"use client";

import { useState } from "react";
import { Button } from "@/app/(components)/ui/button";
import { useParams } from "next/navigation";

export default function DonatePage() {
  const [loading, setLoading] = useState(false);
  const params = useParams();
  const lang = params?.lang as string;

  const handleDonate = async (price_id: string) => {
    setLoading(true);
    let res: any = {};
    try {
      res = await fetch("/api/donate", { method: "POST", body: JSON.stringify({ lang, price_id }) });
    } catch (err) {
      console.log(err);
      res.json = () => ({ error: "Network error" });
     }
    const data = await res.json();
    window.location.href = data.url;
  };

  return (
    <div className="flex flex-col items-center mt-10 mb-10">
      <h1 className="text-3xl font-bold mb-6">Support Our Mission 💚</h1>
      <p className="max-w-xl text-center mb-8">
        Your donation helps us continue providing free resources and education.
      </p>
      <div className="flex gap-4">
        {[{ amount: 5, price_id: 'price_1SK5eG4HdUbnAvC55fBpI47p' }, { amount: 10, price_id: 'price_1SK5fM4HdUbnAvC5Tw99tR5P' }, { amount: 50, price_id: 'price_1SK5fM4HdUbnAvC5dKVmn0Cp' }, { amount: 100, price_id: 'price_1SK5fM4HdUbnAvC5K28Ntg1B'  }].map((item) => (
          <Button key={item.amount} onClick={() => handleDonate(item.price_id)} disabled={loading} className="cursor-pointer">
            Donate ${item.amount}
          </Button>
        ))}
      </div>
    </div>
  );
}
