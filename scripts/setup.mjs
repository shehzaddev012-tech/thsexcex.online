import { copyFileSync, existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import { createInflateRaw } from "zlib";

const root = dirname(fileURLToPath(import.meta.url));
const project = join(root, "..");
const publicDir = join(project, "public");
const assetsDir = join(publicDir, "assets");

const apkSrc = join(project, "..", "THSEX6401.apk");
const apkDst = join(publicDir, "THSEX6401.apk");
const wgtPath = join(project, "..", "..", "new_Apk", "THSEX-1.0.9.wgt");

const assetPaths = [
  "static/set/down11.png",
  "static/set/down22.png",
  "static/set/down33.png",
];

mkdirSync(assetsDir, { recursive: true });

async function extractFromWgt() {
  if (!existsSync(wgtPath)) {
    console.warn("WGT not found — skip asset extract:", wgtPath);
    return;
  }

  const buf = readFileSync(wgtPath);
  let offset = 0;
  const extracted = new Set();

  while (offset < buf.length - 30) {
    if (buf[offset] !== 0x50 || buf[offset + 1] !== 0x4b) {
      offset++;
      continue;
    }

    const compMethod = buf.readUInt16LE(offset + 8);
    const compSize = buf.readUInt32LE(offset + 18);
    const nameLen = buf.readUInt16LE(offset + 26);
    const extraLen = buf.readUInt16LE(offset + 28);
    const name = buf.slice(offset + 30, offset + 30 + nameLen).toString("utf8");
    const dataStart = offset + 30 + nameLen + extraLen;
    const dataEnd = dataStart + compSize;

    for (const assetPath of assetPaths) {
      if (name === assetPath || name.endsWith("/" + assetPath.split("/").pop())) {
        const outName = assetPath.split("/").pop();
        const outPath = join(assetsDir, outName);
        try {
          let raw;
          if (compMethod === 0) {
            raw = buf.slice(dataStart, dataEnd);
          } else if (compMethod === 8) {
            raw = await inflate(buf.slice(dataStart, dataEnd));
          } else {
            continue;
          }
          writeFileSync(outPath, raw);
          extracted.add(outName);
          console.log("extracted", outName);
        } catch (e) {
          console.warn("failed", outName, e.message);
        }
      }
    }

    offset = dataEnd;
  }

  if (!extracted.size) {
    const fallback = join(project, "..", "download_phish_proof", "fake-site", "assets");
    if (existsSync(fallback)) {
      for (const name of ["down11.png", "down22.png", "down33.png"]) {
        const src = join(fallback, name);
        if (existsSync(src)) {
          copyFileSync(src, join(assetsDir, name));
          console.log("copied fallback asset", name);
        }
      }
    } else {
      console.warn("No assets extracted — page uses CSS fallback buttons");
    }
  }
}

function inflate(data) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    const inf = createInflateRaw();
    inf.on("data", (c) => chunks.push(c));
    inf.on("end", () => resolve(Buffer.concat(chunks)));
    inf.on("error", reject);
    inf.end(data);
  });
}

if (!existsSync(apkSrc)) {
  console.error("Missing", apkSrc, "— run: python build_both_apks.py");
  process.exit(1);
}

copyFileSync(apkSrc, apkDst);
console.log("OK copied APK -> public/THSEX6401.apk");

await extractFromWgt();
console.log("Setup complete");
