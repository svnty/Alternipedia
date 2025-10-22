"use client";

import React, { useEffect, useState } from "react";
import QRCode from "qrcode";

type Props = {
  size?: number;
  className?: string;
};

export default function CurrentUrlQRCode({ size = 180, className = "" }: Props) {
  const [dataUrl, setDataUrl] = useState<string | null>(null);

  useEffect(() => {
    // Only run in browser
    if (typeof window === "undefined") return;

    const url = window.location.href;

    let mounted = true;

    QRCode.toDataURL(url, {
      width: size,
      margin: 1,
      color: {
        dark: "#111827",
        light: "#ffffff",
      },
    })
      .then((durl: string) => {
        if (mounted) setDataUrl(durl);
      })
      .catch((err: unknown) => {
        // swallow for now; leave dataUrl null
        // eslint-disable-next-line no-console
        console.error("Failed to generate QR code", err);
      });

    return () => {
      mounted = false;
    };
  }, [size]);

  const handleDownload = () => {
    if (!dataUrl) return;

    const a = document.createElement("a");
    a.href = dataUrl;
    a.download = "alternipedia-url-qr.png";
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const currentHref = typeof window !== "undefined" ? window.location.href : "#";

  return (
    <div className={`w-full flex flex-col items-center gap-3 ${className}`}>
      {dataUrl ? (
        <img
          src={dataUrl}
          alt="QR code for current URL"
          width={size}
          height={size}
          className="bg-white p-1 rounded-sm"
        />
      ) : (
        <div className="w-full text-center text-sm text-gray-500">Generating QR code…</div>
      )}
    </div>
  );
}
