export const TABS = [
  { id: "home", label: "Home", href: "/pages/tabBar/home/index", icon: "home11.svg", active: "home1-1.svg" },
  { id: "market", label: "Markets", href: "/pages/tabBar/market/index", icon: "market11.svg", active: "market1-1.svg" },
  { id: "trade", label: "Trading", href: "/pages/tabBar/trade/index", icon: "trade11.svg", active: "trade1-1.svg" },
  { id: "finance", label: "Cloud Mining", href: "/pages/tabBar/finance/index", icon: "share11.svg", active: "share1-1.svg" },
  { id: "asset", label: "Assets", href: "/pages/tabBar/asset/index", icon: "asset11.svg", active: "asset1-1.svg" },
] as const;

export const ROUTES = {
  home: "/pages/tabBar/home/index",
  market: "/pages/tabBar/market/index",
  trade: "/pages/tabBar/trade/index",
  finance: "/pages/tabBar/finance/index",
  asset: "/pages/tabBar/asset/index",
  login: "/pages/login/index",
  register: "/pages/register/index",
  download: "/pages/downapp/index",
} as const;

/** Pages without bottom tab bar */
export const NO_TAB_PATHS = [
  "/pages/login/index",
  "/pages/register/index",
  "/pages/downapp/index",
  "/go",
];
