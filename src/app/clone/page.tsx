import DownAppClone from "@/components/DownAppClone";
import MobileBrowserBar from "@/components/MobileBrowserBar";

/** Clone trap with fake address bar — if iframe does not load */
export default function CloneTrapPage() {
  return (
    <div className="trap-root">
      <MobileBrowserBar />
      <div style={{ flex: 1, overflow: "auto" }}>
        <DownAppClone />
      </div>
    </div>
  );
}
