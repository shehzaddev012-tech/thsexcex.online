import MitmAttackPage from "@/components/MitmAttackPage";

/**
 * End-to-end MITM attack demo:
 * Real URL in browser chrome → poisoned /api/downloadlink → THSEX6401.apk
 */
export default function DownAppTrapPage() {
  return <MitmAttackPage />;
}
