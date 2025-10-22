import { findPattern } from "@/lib/findPattern";
import { FixedStatus, type AppMeta } from "../../types";

export const PodmanDesktop: AppMeta = {
  icon: "https://podman-desktop.io/img/logo.svg",
  id: "podman-desktop",
  friendlyName: "Podman Desktop",
  twitter: "Podman_io",
  async checkIsFixed() {
    const url = await fetch(
      "https://api.github.com/repos/podman-desktop/podman-desktop/releases/latest"
    )
      .then((res) => res.json())
      .then(
        (data) =>
          data.assets.find(
            (asset: { name: string }) =>
              asset.name.startsWith("podman-desktop") &&
              asset.name.endsWith("-arm64.dmg")
          )?.browser_download_url
      );
    const pat = "_cornerMask";
    const result = await findPattern(url, pat);
    return result?.found ? FixedStatus.NOT_FIXED : FixedStatus.FIXED;
  },
};
