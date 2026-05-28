// External + internal link map for the Trader Area.
// One source of truth so the marketing site, the Raptor platform, and
// the support channels can be updated in a single place.

// This trader area is the "hub" between the GIO Raptor client portal and the
// actual chart-based trading terminal. RAPTOR_BASE points at this app for
// outbound referral URLs; TERMINAL_URL points at the live chart terminal
// hosted inside the Gioraptor portal.
export const RAPTOR_BASE = "https://zippy-piroshki-21aa30.netlify.app";
export const TERMINAL_URL = "https://dashing-hamster-0028ed.netlify.app/terminal";
export const PORTAL_URL = "https://dashing-hamster-0028ed.netlify.app";
export const WEBSITE_BASE = "https://lustrous-youtiao-52c8ea.netlify.app";

export const LINKS = {
  website: {
    home: WEBSITE_BASE,
    about: `${WEBSITE_BASE}/about`,
    markets: `${WEBSITE_BASE}/markets`,
    accountTypes: `${WEBSITE_BASE}/accounts`,
    funding: `${WEBSITE_BASE}/funding`,
    education: `${WEBSITE_BASE}/education`,
    blog: `${WEBSITE_BASE}/blog`,
    contact: `${WEBSITE_BASE}/contact`,
    legal: `${WEBSITE_BASE}/legal`,
    risk: `${WEBSITE_BASE}/legal/risk`,
    careers: `${WEBSITE_BASE}/careers`,
    faq: `${WEBSITE_BASE}/faq`,
  },
  raptor: {
    home: "/",
    terminal: "/",
    login: "/auth/login",
    register: "/auth/signup",
  },
  support: {
    email: "support@gio4x.com",
    phone: "+91 1111 1111 11111",
    hours: "24/7",
  },
  social: {
    twitter: "https://twitter.com/gio4x",
    telegram: "https://t.me/gio4x",
    linkedin: "https://linkedin.com/company/gio4x",
  },
  legal: {
    license: "Reg. No. 15807, Hamchako, Mutsamudu, Autonomous Island of Anjouan, Union of Comoros",
  },
} as const;

export type AccountType = "Classic" | "Premium" | "ECN" | "Cent" | "Swap-Free STP";

export const ACCOUNT_TYPES: Array<{
  name: AccountType;
  spreadFrom: string;
  commission: string;
  leverage: string;
  minDeposit: string;
  highlight?: boolean;
}> = [
  { name: "Classic", spreadFrom: "2.5 pips", commission: "None", leverage: "1:500", minDeposit: "$150" },
  { name: "Premium", spreadFrom: "1.5 pips", commission: "None", leverage: "1:500", minDeposit: "$500", highlight: true },
  { name: "ECN", spreadFrom: "0.2 pips", commission: "$3.50/lot", leverage: "1:500", minDeposit: "$2,000" },
  { name: "Cent", spreadFrom: "2.0 pips", commission: "None", leverage: "1:500", minDeposit: "$50" },
  { name: "Swap-Free STP", spreadFrom: "1.8 pips", commission: "None", leverage: "1:500", minDeposit: "$200" },
];

export const DEPOSIT_METHODS = [
  { id: "card", name: "Credit / Debit Card", fee: "0%", processing: "Instant", logos: ["VISA", "MC", "AMEX"] },
  { id: "bank", name: "Bank Transfer", fee: "0%", processing: "1–3 business days", logos: ["SWIFT", "SEPA"] },
  { id: "crypto", name: "Cryptocurrency", fee: "0%", processing: "10–30 min", logos: ["BTC", "ETH", "USDT"] },
  { id: "upi", name: "UPI / Local Methods", fee: "0%", processing: "Instant", logos: ["UPI", "IMPS", "Paytm"] },
  { id: "skrill", name: "Skrill / Neteller", fee: "0%", processing: "Instant", logos: ["SKL", "NTL"] },
] as const;
