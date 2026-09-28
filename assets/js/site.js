(() => {
  const { themes, videos, plugins, apps } = window.NPL;
  const GH = "https://github.com/ninepointlabs/";
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const img = (name) => `assets/img/${name}.webp`;
  const store = {
    get(k) { try { return localStorage.getItem(k); } catch { return null; } },
    set(k, v) { try { localStorage.setItem(k, v); } catch {} },
  };
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;

  const installRow = (cmd) =>
    `<div class="install"><code>${esc(cmd)}</code><button type="button" data-copy="${esc(cmd)}">copy</button></div>`;

  /* ── Theme ─────────────────────────────────────────── */
  const VARS = { bg: "--bg", bgDark: "--bg-dark", bgLight: "--bg-light", fg: "--fg", fgDim: "--fg-dim", accent: "--accent", selection: "--sel", muted: "--muted", red: "--red", yellow: "--yellow", green: "--green", magenta: "--magenta", cyan: "--cyan" };
  let themeIdx = 0;

  function applyTheme(id, origin) {
    const i = Math.max(0, themes.findIndex((t) => t.id === id));
    const t = themes[i];
    themeIdx = i;
    if (origin && !reduced) {
      const s = document.createElement("div");
      s.className = "sweep";
      s.style.setProperty("--x", `${origin.x}px`);
      s.style.setProperty("--y", `${origin.y}px`);
      document.body.append(s);
      s.addEventListener("animationend", () => s.remove());
    }
    const root = document.documentElement.style;
    for (const [k, v] of Object.entries(VARS)) root.setProperty(v, t.c[k]);
    $('meta[name="theme-color"]').content = t.c.bg;
    $("#theme-name").textContent = t.name;
    $$(".theme-card").forEach((c) => c.classList.toggle("current", c.dataset.theme === t.id));
    store.set("npl-theme", t.id);
  }

  function rotateTheme(origin) {
    applyTheme(themes[(themeIdx + 1) % themes.length].id, origin);
    toast(`theme → ${themes[themeIdx].name}`);
  }

  /* ── Clock ─────────────────────────────────────────── */
  const clock = $("#clock");
  const tick = () => {
    clock.textContent = new Date().toLocaleString(undefined, { weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit" });
  };
  tick();
  setInterval(tick, 15000);
  $("#year").textContent = new Date().getFullYear();

  /* ── Hero terminal ─────────────────────────────────── */
  const script = [
    ["cmd", "omarchy plugin add github.com/ninepointlabs/omarchy-spotify --enable"],
    ["out", "→ cloning ninepointlabs.spotify … done"],
    ["out", "✓ enabled in bar · right section"],
    ["cmd", "omarchy theme install github.com/ninepointlabs/omarchy-bahai-theme"],
    ["out", "✓ theme 'bahai' installed and applied"],
    ["cmd", "fm-cli unread --json | jq length"],
    ["acc", "3"],
    ["cmd", "zork"],
    ["out", "West of House"],
    ["out", "You are standing in an open field west of a white house."],
  ];
  const term = $("#term");
  async function runTerm() {
    const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
    for (;;) {
      let html = "";
      for (const [kind, text] of script) {
        if (kind === "cmd") {
          let typed = "";
          for (const ch of text) {
            typed += ch;
            term.innerHTML = `${html}<span class="p">❯</span> ${esc(typed)}<span class="cur"></span>`;
            await sleep(reduced ? 0 : 22 + Math.random() * 40);
          }
          html += `<span class="p">❯</span> ${esc(text)}\n`;
          await sleep(350);
        } else {
          html += `<span class="${kind === "acc" ? "a" : "d"}">${esc(text)}</span>\n`;
          term.innerHTML = `${html}<span class="cur"></span>`;
          await sleep(260);
        }
        // Keep the last lines in view, like a real scrollback.
        const lines = html.split("\n");
        if (lines.length > 10) html = lines.slice(-10).join("\n");
      }
      await sleep(3200);
    }
  }
  runTerm();

  /* ── Counts + marquee ──────────────────────────────── */
  const themeRepos = themes.filter((t) => t.repo);
  $("#count-plugins").textContent = plugins.length;
  $("#count-apps").textContent = apps.length;
  $("#count-themes").textContent = themeRepos.length;
  const names = [...apps.map((a) => a.name), ...plugins.map((p) => p.name), ...themeRepos.map((t) => `${t.name} theme`)];
  const marq = names.map((n) => `<span>${esc(n)}<b>✦</b></span>`).join("");
  $("#marquee").innerHTML = marq + marq;

  /* ── Reel ──────────────────────────────────────────── */
  const video = $("#reel-video");
  function loadVideo(id, play) {
    const v = videos.find((x) => x.id === id) || videos[0];
    video.poster = v.poster;
    video.src = v.src;
    $("#reel-title").textContent = `mpv — ${v.title}`;
    $("#reel-len").textContent = v.len;
    const more = (v.more || []).map(([label, id]) => `<a href="#${id}" data-goto="${id}">more about ${esc(label)} →</a>`).join("");
    $("#reel-blurb").innerHTML = `<strong style="color:var(--fg)">${esc(v.tag)}</strong> ${esc(v.blurb)}${more ? `<span class="reel-more">${more}</span>` : ""}`;
    $$(".reel-item").forEach((b) => b.classList.toggle("active", b.dataset.video === v.id));
    if (play) video.play().catch(() => {});
  }
  $("#reel-list").innerHTML = videos.map((v) => `
    <button class="reel-item win" data-video="${v.id}" role="listitem">
      <div class="thumb"><img src="${v.poster}" alt="" loading="lazy"><div class="play"><i>▶</i></div></div>
      <div class="meta"><strong>${esc(v.title)}</strong><span>${esc(v.tag)} · ${v.len}</span></div>
    </button>`).join("");
  $("#reel-list").addEventListener("click", (e) => {
    const b = e.target.closest(".reel-item");
    if (b) loadVideo(b.dataset.video, true);
  });
  loadVideo(videos[0].id, false);
  function playVideo(id) {
    loadVideo(id, true);
    $("#reel").scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  }

  /* ── Plugins ───────────────────────────────────────── */
  $("#plugin-grid").innerHTML = plugins.map((p, i) => {
    const shot = p.shots.length
      ? `<button class="tile-shot" data-lb="${i}" aria-label="View ${esc(p.name)} screenshots"><img src="${img(p.shots[0])}" alt="${esc(p.name)} screenshot" loading="lazy">${p.shots.length > 1 ? `<span class="more">+${p.shots.length - 1}</span>` : ""}</button>`
      : `<div class="tile-shot glyph" aria-hidden="true">${esc(p.glyph)}</div>`;
    return `
    <article class="tile win reveal${p.featured ? " featured" : ""}" data-cat="${p.cat}" id="p-${p.repo}">
      <div class="win-title"><span>${esc(p.repo)}</span><span class="cat">${p.cat}</span></div>
      ${shot}
      <div class="tile-body">
        <h3><span class="g">${esc(p.glyph)}</span>${esc(p.name)}</h3>
        <p class="line">${esc(p.line)}</p>
        <p class="desc">${esc(p.desc)}</p>
        ${installRow(p.install)}
        <div class="tile-links"><a href="${GH}${p.repo}">source ↗</a>${p.video ? `<a href="#reel" data-play="${p.video}">▶ watch the demo</a>` : ""}${p.site ? `<a href="${p.site}">${esc(p.site.replace("https://", ""))} ↗</a>` : ""}</div>
      </div>
    </article>`;
  }).join("");

  const filters = $("#filters");
  $$("button", filters).forEach((b) => {
    const c = b.dataset.cat;
    const n = c === "all" ? plugins.length : plugins.filter((p) => p.cat === c).length;
    b.insertAdjacentHTML("beforeend", `<sup>${n}</sup>`);
  });
  filters.addEventListener("click", (e) => {
    const b = e.target.closest("button");
    if (!b) return;
    $$("button", filters).forEach((x) => x.classList.toggle("on", x === b));
    $$(".tile").forEach((t) => t.classList.toggle("hide", b.dataset.cat !== "all" && t.dataset.cat !== b.dataset.cat));
  });

  /* ── Apps ──────────────────────────────────────────── */
  $("#app-list").innerHTML = apps.map((a, i) => `
    <article class="app reveal" id="a-${a.repo}">
      <div class="app-media win">
        <div class="win-title"><span>${esc(a.name)}</span><span class="wt-dim">${a.shots.length} screenshot${a.shots.length > 1 ? "s" : ""}</span></div>
        <div class="stage" data-app="${i}" data-shot="0"><img src="${img(a.shots[0])}" alt="${esc(a.name)} screenshot" loading="lazy"></div>
        ${a.shots.length > 1 ? `<div class="thumbs">${a.shots.map((s, j) => `<button class="${j ? "" : "on"}" data-app="${i}" data-shot="${j}" aria-label="Screenshot ${j + 1}"><img src="${img(s)}" alt="" loading="lazy"></button>`).join("")}</div>` : ""}
      </div>
      <div class="app-copy">
        <p class="kicker">${esc(a.kicker)}</p>
        <h3><span class="g">${esc(a.glyph)}</span>${esc(a.name)}</h3>
        <p class="desc">${esc(a.desc)}</p>
        <div class="app-actions">
          <a class="btn primary" href="${GH}${a.repo}/releases/latest">Download the latest release ↗</a>
          <a class="btn" href="${GH}${a.repo}">View on GitHub ↗</a>
          ${a.video ? `<button class="btn" data-play="${a.video}">▶ Watch the promo</button>` : ""}
        </div>
      </div>
    </article>`).join("");

  $("#app-list").addEventListener("click", (e) => {
    const t = e.target.closest(".thumbs button");
    if (t) {
      const a = apps[t.dataset.app];
      const stage = $(`.stage[data-app="${t.dataset.app}"]`);
      stage.dataset.shot = t.dataset.shot;
      $("img", stage).src = img(a.shots[t.dataset.shot]);
      $$("button", t.parentElement).forEach((b) => b.classList.toggle("on", b === t));
      return;
    }
    const s = e.target.closest(".stage");
    if (s) {
      const a = apps[s.dataset.app];
      openLightbox(a.name, a.shots, +s.dataset.shot);
      return;
    }
  });

  /* ── Themes ────────────────────────────────────────── */
  $("#theme-grid").innerHTML = themeRepos.map((t) => `
    <article class="theme-card win reveal" data-theme="${t.id}" id="t-${t.id}">
      <div class="wall"><img src="${img(t.img)}" alt="${esc(t.name)} wallpaper" loading="lazy"><span class="now">applied</span></div>
      <div class="swatches">${["bg", "bgLight", "accent", "red", "yellow", "green", "cyan", "magenta", "fg"].map((k) => `<i style="background:${t.c[k]}"></i>`).join("")}</div>
      <div class="theme-body">
        <h3>${esc(t.name)}</h3>
        <p>${esc(t.note)}</p>
        <div class="row">
          ${installRow(`omarchy theme install ${GH}${t.repo}`)}
          <button class="try" data-try="${t.id}">try it here</button>
        </div>
        <div class="tile-links"><a href="${GH}${t.repo}">source ↗</a></div>
      </div>
    </article>`).join("");

  /* ── Copy + toast ──────────────────────────────────── */
  const toastEl = $("#toast");
  let toastTimer;
  function toast(msg) {
    toastEl.textContent = msg;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 1800);
  }
  document.addEventListener("click", async (e) => {
    const c = e.target.closest("[data-copy]");
    if (c) {
      try {
        await navigator.clipboard.writeText(c.dataset.copy);
        c.textContent = "copied";
        toast("Copied. Paste it into a terminal.");
      } catch {
        toast("Couldn't reach the clipboard. Select the command instead.");
      }
      setTimeout(() => (c.textContent = "copy"), 1600);
      return;
    }
    const t = e.target.closest("[data-try]");
    if (t) {
      const r = t.getBoundingClientRect();
      applyTheme(t.dataset.try, { x: r.left + r.width / 2, y: r.top + r.height / 2 });
      toast(`Now wearing ${themes[themeIdx].name}. Press T to keep rotating.`);
      return;
    }
    const go = e.target.closest("[data-goto]");
    if (go) {
      e.preventDefault();
      goTo(go.dataset.goto);
      return;
    }
    const pl = e.target.closest("[data-play]");
    if (pl) {
      e.preventDefault();
      playVideo(pl.dataset.play);
      return;
    }
    const lb = e.target.closest("[data-lb]");
    if (lb) {
      const p = plugins[lb.dataset.lb];
      openLightbox(p.name, p.shots, 0);
    }
  });

  /* ── Lightbox ──────────────────────────────────────── */
  const lbEl = $("#lightbox");
  let lbState = null;
  function openLightbox(title, shots, i) {
    lbState = { title, shots, i };
    showShot();
    lbEl.hidden = false;
    $("#lb-close").focus();
  }
  function showShot() {
    const { title, shots, i } = lbState;
    $("#lb-img").src = img(shots[i]);
    $("#lb-img").alt = `${title} screenshot ${i + 1}`;
    $("#lb-title").textContent = shots.length > 1 ? `${title} · ${i + 1}/${shots.length}  (← →)` : title;
  }
  const closeLightbox = () => { lbEl.hidden = true; lbState = null; };
  $("#lb-close").addEventListener("click", closeLightbox);
  lbEl.addEventListener("click", (e) => { if (e.target === lbEl) closeLightbox(); });

  /* ── Launcher ──────────────────────────────────────── */
  const entries = [
    ...[["home", "Home", "1"], ["reel", "The reel · promo videos", "2"], ["apps", "Apps", "3"], ["plugins", "Bar plugins", "4"], ["themes", "Themes", "5"], ["about", "About Nine Point Labs", "6"]]
      .map(([id, name, k]) => ({ kind: "workspace", glyph: k, name, sub: `jump to workspace ${k}`, go: () => location.assign(`#${id}`) })),
    ...apps.map((a) => ({ kind: "app", glyph: a.glyph, name: a.name, sub: a.kicker, go: () => goTo(`a-${a.repo}`) })),
    ...plugins.map((p) => ({ kind: "plugin", glyph: p.glyph, name: p.name, sub: p.line, go: () => goTo(`p-${p.repo}`) })),
    ...themes.map((t) => ({ kind: "theme", glyph: "◐", name: `${t.name}`, sub: `apply to this page · ${t.note}`, go: () => { applyTheme(t.id); toast(`theme → ${t.name}`); } })),
    ...videos.map((v) => ({ kind: "video", glyph: "▶", name: v.title, sub: v.tag, go: () => playVideo(v.id) })),
  ];
  const launcher = $("#launcher");
  const input = $("#launcher-input");
  const results = $("#launcher-results");
  let matches = [], sel = 0;

  function resetFilter() { $('#filters [data-cat="all"]').click(); }
  // Scroll a plugin tile or app into view and highlight it, un-hiding it if a filter is on.
  function goTo(id) {
    const el = document.getElementById(id);
    if (!el) return;
    if (el.classList.contains("hide")) resetFilter();
    el.classList.add("in");
    el.scrollIntoView({ behavior: reduced ? "auto" : "smooth", block: "center" });
    flash(`#${id}`);
  }
  function flash(sel) {
    // Apps aren't windows themselves; light up their screenshot window instead.
    const el = $(sel).classList.contains("win") ? $(sel) : $(".win", $(sel));
    el.classList.add("active");
    setTimeout(() => el.classList.remove("active"), 1600);
  }
  function score(e, q) {
    if (!q) return 1;
    const hay = `${e.name} ${e.sub} ${e.kind}`.toLowerCase();
    if (e.name.toLowerCase().startsWith(q)) return 3;
    if (hay.includes(q)) return 2;
    // Loose subsequence match, so "hycal" finds HEY Calendar.
    let i = 0;
    for (const ch of e.name.toLowerCase()) if (ch === q[i]) i++;
    return i === q.length ? 1 : 0;
  }
  function renderResults() {
    const q = input.value.trim().toLowerCase();
    matches = entries.map((e) => [score(e, q), e]).filter(([s]) => s).sort((a, b) => b[0] - a[0]).map(([, e]) => e).slice(0, 12);
    sel = Math.min(sel, Math.max(0, matches.length - 1));
    results.innerHTML = matches.length
      ? matches.map((e, i) => `<li role="option" data-i="${i}" class="${i === sel ? "sel" : ""}" aria-selected="${i === sel}"><span class="g">${esc(e.glyph)}</span><span class="t">${esc(e.name)}<small>${esc(e.sub)}</small></span><span class="kind">${e.kind}</span></li>`).join("")
      : `<li class="empty">Nothing matches. Try "calendar", "zork" or "horde".</li>`;
    $(".sel", results)?.scrollIntoView({ block: "nearest" });
  }
  function openLauncher() {
    launcher.hidden = false;
    input.value = "";
    sel = 0;
    renderResults();
    input.focus();
  }
  const closeLauncher = () => { launcher.hidden = true; };
  function choose(i) {
    const e = matches[i];
    if (!e) return;
    closeLauncher();
    e.go();
  }
  input.addEventListener("input", () => { sel = 0; renderResults(); });
  input.addEventListener("keydown", (e) => {
    if (e.key === "ArrowDown") { sel = Math.min(sel + 1, matches.length - 1); renderResults(); e.preventDefault(); }
    else if (e.key === "ArrowUp") { sel = Math.max(sel - 1, 0); renderResults(); e.preventDefault(); }
    else if (e.key === "Enter") { choose(sel); e.preventDefault(); }
  });
  results.addEventListener("click", (e) => { const li = e.target.closest("li[data-i]"); if (li) choose(+li.dataset.i); });
  results.addEventListener("mousemove", (e) => {
    const li = e.target.closest("li[data-i]");
    if (li && +li.dataset.i !== sel) { sel = +li.dataset.i; renderResults(); }
  });
  launcher.addEventListener("click", (e) => { if (e.target === launcher) closeLauncher(); });
  $("#launcher-btn").addEventListener("click", openLauncher);
  $("#theme-btn").addEventListener("click", (e) => rotateTheme({ x: e.clientX, y: e.clientY }));

  /* ── Keyboard ──────────────────────────────────────── */
  const wsIds = ["home", "reel", "apps", "plugins", "themes", "about"];
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") { closeLauncher(); closeLightbox(); return; }
    if (lbState && (e.key === "ArrowRight" || e.key === "ArrowLeft")) {
      const n = lbState.shots.length;
      lbState.i = (lbState.i + (e.key === "ArrowRight" ? 1 : n - 1)) % n;
      showShot();
      return;
    }
    const typing = /^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement?.tagName) || document.activeElement?.isContentEditable;
    if (typing || e.metaKey || e.ctrlKey || e.altKey || !launcher.hidden || lbState) return;
    if (e.key === "/" || (e.key === " " && e.shiftKey)) { e.preventDefault(); openLauncher(); }
    else if (e.key.toLowerCase() === "t") rotateTheme({ x: innerWidth - 120, y: 18 });
    else if (/^[1-6]$/.test(e.key)) $(`#${wsIds[+e.key - 1]}`).scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  });

  /* ── Workspace indicator + reveal ──────────────────── */
  const wsLinks = Object.fromEntries($$(".workspaces a").map((a) => [a.dataset.ws, a]));
  const spy = new IntersectionObserver((ents) => {
    for (const en of ents) {
      if (en.isIntersecting) {
        Object.values(wsLinks).forEach((a) => a.classList.remove("on"));
        wsLinks[en.target.id]?.classList.add("on");
      }
    }
  }, { rootMargin: "-45% 0px -50% 0px" });
  wsIds.forEach((id) => spy.observe($(`#${id}`)));

  const rev = new IntersectionObserver((ents) => {
    for (const en of ents) if (en.isIntersecting) { en.target.classList.add("in"); rev.unobserve(en.target); }
  }, { rootMargin: "0px 0px -8% 0px" });
  $$(".sec-head, .reel, .filters").forEach((el) => el.classList.add("reveal"));
  $$(".reveal").forEach((el) => rev.observe(el));

  // Hero terminal takes focus colour for a moment, like a freshly focused window.
  setTimeout(() => $(".term").classList.add("active"), 600);

  applyTheme(store.get("npl-theme") || "ninepoint");
})();
