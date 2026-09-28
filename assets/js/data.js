// Everything the page lists lives here. Add a project by adding an object.
// Palettes are copied from each theme's colors.toml.

const GH = "https://github.com/ninepointlabs/";
const IMG = "assets/img/";

window.NPL = {
  themes: [
    {
      id: "ninepoint", name: "Nine Point", note: "The house colours: teal star on midnight.",
      c: { bg: "#0B1419", bgDark: "#081015", bgLight: "#122129", fg: "#E4EEF0", fgDim: "#7F959C", accent: "#2AA4CF", selection: "#15394A", muted: "#4E6670", red: "#E0605A", yellow: "#E8B84A", green: "#6CC08B", magenta: "#B98ADB", cyan: "#4FC1C9" },
    },
    {
      id: "bahai", name: "Bahá'í", repo: "omarchy-bahai-theme", slug: "bahai", img: "theme-bahai",
      note: "Mount Carmel after dark. Dome gold on cypress black, with a gilded nine-pointed star.",
      c: { bg: "#0F1715", bgDark: "#0B1210", bgLight: "#18231F", fg: "#ECE4D0", fgDim: "#86958C", accent: "#D9AE5B", selection: "#26352F", muted: "#5E6F67", red: "#C9503F", yellow: "#D9AE5B", green: "#76A36B", magenta: "#B97AA9", cyan: "#4FA89A" },
    },
    {
      id: "horde", name: "Warcraft: Horde", repo: "omarchy-warcraft-horde-theme", slug: "warcraft-horde", img: "theme-horde",
      note: "Blood red on forge iron, from the Horde sigil and war crest.",
      c: { bg: "#1A1311", bgDark: "#130E0C", bgLight: "#2A1E1A", fg: "#E7DCCE", fgDim: "#8C7A6D", accent: "#C0352E", selection: "#4A2620", muted: "#7C6259", red: "#C0352E", yellow: "#D4A23C", green: "#7A9B45", magenta: "#9B5FAE", cyan: "#559C94" },
    },
    {
      id: "alliance", name: "Warcraft: Alliance", repo: "omarchy-warcraft-alliance-theme", slug: "warcraft-alliance", img: "theme-alliance",
      note: "Lion gold on Stormwind blue, from the Alliance crest and shield.",
      c: { bg: "#101828", bgDark: "#0B111E", bgLight: "#1B2740", fg: "#DDE5F3", fgDim: "#72809D", accent: "#E8B92E", selection: "#22314F", muted: "#5F6E8C", red: "#C0453A", yellow: "#E8B92E", green: "#4F9B6E", magenta: "#8A72D6", cyan: "#4FA5C6" },
    },
    {
      id: "army", name: "US Army", repo: "omarchy-us-army-theme", slug: "us-army", img: "theme-army",
      note: "Olive drab and Army gold, with authentic division insignia.",
      c: { bg: "#1E2419", bgDark: "#161B12", bgLight: "#2A3323", fg: "#EAE4D3", fgDim: "#8F9A80", accent: "#C9A227", selection: "#3D4A32", muted: "#6F7A62", red: "#C8312F", yellow: "#D9B33A", green: "#6E9E4F", magenta: "#8B5CC8", cyan: "#5FA8A0" },
    },
    {
      id: "ted-lasso", name: "Ted Lasso", repo: "omarchy-ted-lasso-theme", slug: "\"Ted Lasso\"", img: "theme-ted-lasso",
      note: "Richmond navy, biscuit cream and a yellow sign that says BELIEVE.",
      c: { bg: "#16283D", bgDark: "#101D2C", bgLight: "#22374D", fg: "#F5ECD9", fgDim: "#8A9BAE", accent: "#F2C230", selection: "#3A5068", muted: "#5C7086", red: "#D64545", yellow: "#F2C230", green: "#5FA85D", magenta: "#D98FC0", cyan: "#5FB6B0" },
    },
    {
      id: "tokyo-night", name: "Tokyo Night", note: "Omarchy's stock default, for comparison.",
      c: { bg: "#1A1B26", bgDark: "#13141C", bgLight: "#24283B", fg: "#A9B1D6", fgDim: "#565F89", accent: "#7AA2F7", selection: "#292E42", muted: "#414868", red: "#F7768E", yellow: "#E0AF68", green: "#9ECE6A", magenta: "#AD8EE6", cyan: "#449DAB" },
    },
  ],

  videos: [
    {
      id: "barkeep", title: "Barkeep", tag: "Barkeep tends your Omarchy bar.", len: "1:16",
      src: "assets/video/barkeep-demo.mp4", poster: "assets/video/barkeep-demo-poster.webp",
      blurb: "See the whole bar, filter it, arrange it live, and keep every plugin fresh from one overlay on Super+B.",
    },
    {
      id: "omaforge", title: "omaforge", tag: "WoW addons on Linux?", len: "0:30",
      src: "assets/video/omaforge-promo.mp4", poster: "assets/video/omaforge-promo-poster.webp",
      blurb: "Retail, Classic and Forever: found, installed and kept current, no Wine prefix spelunking.",
    },
    {
      id: "fm-cli", title: "fm-cli + omarchy-fastmail", tag: "Still checking email in a browser tab?", len: "0:36",
      src: "assets/video/fm-cli-promo.mp4", poster: "assets/video/fm-cli-promo-poster.webp",
      blurb: "Fastmail in the terminal, and unread mail from every folder live in the bar.",
    },
  ],

  // cat: productivity | media | games | system | nostr
  plugins: [
    {
      name: "Barkeep", repo: "barkeep", cat: "system", featured: true, glyph: "▥",
      line: "Tends your Omarchy bar.",
      desc: "One keyboard-driven overlay that shows every plugin the shell knows about. Arrange, pin, switch, update and remove them, and save whole bar layouts as profiles.",
      shots: ["barkeep", "barkeep-profiles", "barkeep-menu"],
      install: `omarchy plugin add ${GH}barkeep.git --enable`,
      video: "barkeep",
    },
    {
      name: "Spotify", repo: "omarchy-spotify", cat: "media", glyph: "♫",
      line: "Spotify, living in your bar.",
      desc: "A cover-art chip, a now-playing panel with transport and volume, search, playlists, audiobooks, podcasts, and a headless player.",
      shots: ["spotify", "spotify-2"],
      install: `omarchy plugin add ${GH}omarchy-spotify.git --enable`,
    },
    {
      name: "Fastmail", repo: "omarchy-fastmail", cat: "productivity", glyph: "✉\uFE0E",
      line: "Unread mail from every folder, live.",
      desc: "An envelope that changes colour when there is mail, and a panel that lists it — including what your rules filed away — over JMAP via fm-cli.",
      shots: ["fastmail"],
      install: `omarchy plugin add ${GH}omarchy-fastmail.git --enable`,
    },
    {
      name: "Fastmail Calendar", repo: "omarchy-fastmail-calendar", cat: "productivity", glyph: "▦",
      line: "A native calendar over CalDAV.",
      desc: "Today, Week, Month and Year views with day detail and quick add. Fastmail by default, any CalDAV server if you like.",
      shots: ["fastmail-calendar"],
      install: `omarchy plugin add ${GH}omarchy-fastmail-calendar.git --enable`,
    },
    {
      name: "HEY Calendar", repo: "omarchy-hey-calendar", cat: "productivity", glyph: "◷",
      line: "Your HEY calendar and journal.",
      desc: "Today through Year, plus a day panel with events and journal entries, backed by the HEY CLI.",
      shots: ["hey-calendar", "hey-calendar-year"],
      install: `omarchy plugin add ${GH}omarchy-hey-calendar.git --enable`,
    },
    {
      name: "Upcoming", repo: "omarchy-upcoming", cat: "media", glyph: "▶",
      line: "The shows you actually watch.",
      desc: "Search TVmaze for the right title (Silo on Apple TV, not Silo on meWATCH) and see next-episode dates at a glance.",
      shots: ["upcoming"],
      install: `omarchy plugin add ${GH}omarchy-upcoming.git --enable`,
    },
    {
      name: "Theme Rotate", repo: "omarchy-theme-rotate", cat: "system", glyph: "◐",
      line: "A new look on a schedule — or with the sun.",
      desc: "Randomise your theme on demand, auto-rotate hourly or daily, or follow sunrise and sunset. Press T on this page for a taste.",
      shots: ["theme-rotate"],
      install: `omarchy plugin add ${GH}omarchy-theme-rotate.git --enable`,
    },
    {
      name: "OmaSyncthing", repo: "omasync", cat: "system", glyph: "⇅",
      line: "Syncthing in the bar.",
      desc: "Folders, devices, transfer rates and share invites, with start/stop control of the syncthing user service.",
      shots: ["omasync"],
      install: `omarchy plugin add ${GH}omasync --enable`,
    },
    {
      name: "Webcam", repo: "omarchy-webcam", cat: "system", glyph: "◉",
      line: "Pick, preview and tune your webcam.",
      desc: "Choose the system camera, see it live, and adjust its image settings before the call starts.",
      shots: ["webcam"],
      install: `omarchy plugin add ${GH}omarchy-webcam.git --enable`,
    },
    {
      name: "Ring Cameras", repo: "omarchy-ring-cameras", cat: "system", glyph: "⌂",
      line: "Your front door, from the desktop.",
      desc: "Live view in mpv, snapshots, event history and motion notifications for every Ring camera on your account.",
      shots: ["ring"],
      install: `omarchy plugin add ${GH}omarchy-ring-cameras --enable`,
    },
    {
      name: "Hermes Chat", repo: "omarchy-hermes-chat", cat: "productivity", glyph: "☿",
      line: "A quick word with your local agent.",
      desc: "A bar icon and dropdown for messaging your local Hermes agent without opening the desktop app.",
      shots: ["hermes"],
      install: `git clone ${GH}omarchy-hermes-chat && cd omarchy-hermes-chat && ./install.sh`,
    },
    {
      name: "Omostrich", repo: "omostrich", cat: "nostr", glyph: "✦", site: "https://omostrich.com",
      line: "Your Nostr key, held at home.",
      desc: "A local signing daemon with an encrypted nsec, a bar chip to unlock it, a Super+N composer, and NIP-46 remote signing over relays.",
      shots: [],
      install: `git clone ${GH}omostrich && cd omostrich && ./install-daemon.sh && ./install-plugin.sh`,
    },
    {
      name: "WoW Weekly Reset", repo: "omarchy-wow-reset", cat: "games", glyph: "⚔",
      line: "Reset countdown, affixes and keys.",
      desc: "Time to the weekly reset, this week's Mythic+ affixes, and where each of your characters stands on keys and raid lockouts.",
      shots: ["wow-reset"],
      install: `omarchy plugin add ${GH}omarchy-wow-reset.git --enable`,
    },
    {
      name: "Zorkmachy", repo: "omarchy-zorkmachy", cat: "games", glyph: "⌘",
      line: "Zork I, II and III in the bar.",
      desc: "The original Infocom games on the real Z-machine interpreter, saved after every move. You are standing in an open field west of a white house.",
      shots: ["zork", "zork-play"],
      install: `omarchy plugin add ${GH}omarchy-zorkmachy --enable`,
    },
    {
      name: "Dopewars", repo: "omarchy-dopewars", cat: "games", glyph: "$",
      line: "The 1984 classic, one click away.",
      desc: "John E. Dell's Drug Wars, as kept alive by Ben Webb's dopewars. Single-player, saved between turns, entirely inside a bar panel.",
      shots: ["dopewars"],
      install: `git clone ${GH}omarchy-dopewars && cd omarchy-dopewars && ./install.sh`,
    },
  ],

  apps: [
    {
      name: "omaforge", repo: "omaforge", glyph: "⚒", kicker: "World of Warcraft addon manager",
      desc: "CurseForge, WoWInterface and GitHub addons for Retail, Classic and Forever, in one native Omarchy window that follows your theme. Search, install, update everything, and back up your settings before you break them.",
      shots: ["omaforge", "omaforge-installed", "omaforge-themes"],
      install: "sudo pacman -U omaforge-*-any.pkg.tar.zst",
      installNote: `from the <a href="${GH}omaforge/releases/latest">latest release</a>`,
      video: "omaforge",
    },
    {
      name: "fm-cli", repo: "fm-cli", glyph: "✉\uFE0E", kicker: "Fastmail from the terminal",
      desc: "A small Go client for Fastmail's JMAP API: a full-screen mail app, plus scriptable commands that print JSON. It's the engine behind the Fastmail bar plugin.",
      shots: ["fm-cli"],
      install: "omarchy-mise-install github:ninepointlabs/fm-cli fm-cli",
      video: "fm-cli",
    },
    {
      name: "Omarchy-DB", repo: "omarchy-db", glyph: "▤", kicker: "Microsoft Access, without the hard parts",
      desc: "One local file. Bring spreadsheets in, work in forms or a grid, filter, save views, print to PDF — and let your agents in through MCP.",
      shots: ["omarchy-db"],
      install: `git clone ${GH}omarchy-db.git && cd omarchy-db`,
      installNote: "then follow the README (needs pyside6, already on Omarchy)",
    },
    {
      name: "Bahá'í Reader", repo: "bahai-reader", glyph: "✧", kicker: "A quiet place for the Writings",
      desc: "An offline GTK 4 prayer book and reader. Ten collections, downloadable languages, and it follows your Omarchy colours live — custom themes included.",
      shots: ["bahai-reader"],
      install: "sudo pacman -U ./bahai-reader-*-any.pkg.tar.zst",
      installNote: `from the <a href="${GH}bahai-reader/releases/latest">latest release</a>`,
    },
  ],
};
