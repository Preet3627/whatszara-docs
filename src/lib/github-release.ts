export interface GitHubReleaseAsset {
  name: string;
  browser_download_url: string;
}

export interface GitHubRelease {
  tag_name: string;
  assets: GitHubReleaseAsset[];
}

export interface ReleaseDownloadLink {
  key: string;
  label: string;
  arch: string;
  file: string;
  link: string;
  platform: "windows" | "macos" | "linux" | "android";
}

const isDmg = (name: string) => /\.dmg$/i.test(name);
const isWindowsInstaller = (name: string) => /\.exe$|\.msi$/i.test(name);
const isLinuxInstaller = (name: string) => /\.AppImage$|\.deb$/i.test(name);

function getMacDownloads(assets: GitHubReleaseAsset[]): ReleaseDownloadLink[] {
  const dmgAssets = assets.filter((asset) => isDmg(asset.name));
  const arm64Asset = dmgAssets.find((asset) => /arm64|aarch64|apple.*silicon/i.test(asset.name));
  const x64Asset = dmgAssets.find((asset) => /x64|x86_64|intel/i.test(asset.name));
  const universalAsset = dmgAssets.find((asset) => /universal/i.test(asset.name));
  const genericAsset = dmgAssets.find((asset) => asset !== arm64Asset && asset !== x64Asset && asset !== universalAsset);

  const downloads: ReleaseDownloadLink[] = [];
  if (arm64Asset) downloads.push({ key: "macos-arm64", label: "macOS Apple Silicon", arch: "ARM64", file: arm64Asset.name, link: arm64Asset.browser_download_url, platform: "macos" });
  if (x64Asset) downloads.push({ key: "macos-x64", label: "macOS Intel", arch: "x64", file: x64Asset.name, link: x64Asset.browser_download_url, platform: "macos" });
  if (downloads.length === 0 && universalAsset) downloads.push({ key: "macos-universal", label: "macOS Universal", arch: "Intel + ARM64", file: universalAsset.name, link: universalAsset.browser_download_url, platform: "macos" });
  if (downloads.length === 0 && genericAsset) downloads.push({ key: "macos", label: "macOS", arch: "DMG", file: genericAsset.name, link: genericAsset.browser_download_url, platform: "macos" });
  return downloads;
}

export function getReleaseDownloadLinks(release: GitHubRelease | null): ReleaseDownloadLink[] {
  if (!release?.assets?.length) return [];
  const windowsAsset = release.assets.find((asset) => isWindowsInstaller(asset.name));
  const linuxAsset = release.assets.find((asset) => isLinuxInstaller(asset.name));
  const downloads: ReleaseDownloadLink[] = [];
  if (windowsAsset) downloads.push({ key: "windows", label: "Windows 10/11", arch: "x64", file: windowsAsset.name, link: windowsAsset.browser_download_url, platform: "windows" });
  downloads.push(...getMacDownloads(release.assets));
  if (linuxAsset) downloads.push({ key: "linux", label: "Linux AppImage", arch: "x64", file: linuxAsset.name, link: linuxAsset.browser_download_url, platform: "linux" });
  return downloads;
}
