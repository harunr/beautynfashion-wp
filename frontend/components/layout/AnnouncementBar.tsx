"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/context";
import Link from "next/link";

export default function AnnouncementBar() {
  const { t } = useLanguage();

  return (
    <aside
      aria-label="Announcement"
      className="bg-plum-800 text-white h-10 px-4 flex items-center justify-center gap-4 md:gap-7 text-xs md:text-sm font-medium transition-colors"
    >
      <span>{t.announcement.freeShipping}</span>
      <span aria-hidden="true" className="opacity-40">
        •
      </span>
      <span>
        {t.announcement.promo}{" "}
        <Link
          href="/shop"
          className="text-white underline hover:text-rose-light transition-colors ml-1 font-semibold"
        >
          {t.announcement.promoLink}
        </Link>
      </span>
      <span aria-hidden="true" className="opacity-40 hidden sm:inline">
        •
      </span>
      <span className="hidden sm:inline">{t.announcement.returns}</span>
    </aside>
  );
}
