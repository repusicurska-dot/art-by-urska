import { appIcon } from "@/lib/appIcon";

// iPhone / iPad "Add to Home Screen" icon.
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return appIcon(180, { padding: 0.14 });
}
