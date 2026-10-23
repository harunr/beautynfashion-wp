"use client";

import React from "react";
import { useLanguage } from "@/lib/i18n/context";
import { useStoreSettings } from "@/lib/wordpress/context";
import Link from "next/link";

export default function AnnouncementBar() {
  const { lang, t } = useLanguage();
  const settings = useStoreSettings();

  // If administrator turned off announcement bar in WordPress Store Customizer
  if (settings.announcement_active === "0") {
    return null;
  }

  const dynamicText =
    lang === "bn"
      ? settings.announcement_text_bn || t.announcement.promo
      : settings.announcement_text_en || t.announcement.promo;

  const dynamicLink = settings.announcement_link || "/sale";

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
        <Link
          href={dynamicLink}
          className="text-white hover:text-rose-light underline decoration-rose-light underline-offset-2 transition-colors font-semibold"
        >
          {dynamicText}
        </Link>
      </span>
      <span aria-hidden="true" className="opacity-40 hidden sm:inline">
        •
      </span>
      <span className="hidden sm:inline">{t.announcement.returns}</span>
    </aside>
  );
}
