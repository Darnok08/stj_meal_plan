// ═══════════════════════════════════════════════════════════
//  SYNC — konfiguracja + logowanie + wspólna baza (Supabase)
//  Nie musisz tu nic zmieniać.
//  Klucze możesz wpisać w config.js ALBO wprost w aplikacji
//  (pojawi się ekran konfiguracji).
// ═══════════════════════════════════════════════════════════
(function () {
  const LS_URL = "kk_supabase_url";
  const LS_KEY = "kk_supabase_key";

  const authEl = document.getElementById("auth");
  const appEl = document.getElementById("app-wrap");
  const cardEl = document.querySelector(".au-card");
  const emailEl = document.getElementById("au-email");
  const passEl = document.getElementById("au-pass");
  const msgEl = document.getElementById("au-msg");
  const whoEl = document.getElementById("who");

  function msg(text, kind) {
    msgEl.innerHTML = text || "";
    msgEl.className = "au-msg " + (kind || "");
  }

  // ---------- Czyszczenie adresu z częstych błędów ----------
  function cleanUrl(u) {
    return (u || "")
      .trim()
      .replace(/\/(rest|auth|storage|realtime|functions)\/v\d+\/?$/i, "") // ucina /rest/v1 itp.
      .replace(/\/+$/, ""); // ucina ukośnik na końcu
  }
  function urlProblem(u) {
    if (!u || /^TUTAJ_WKLEJ/i.test(u)) return "Wklej adres projektu (Project URL).";
    if (/supabase\.com\/dashboard/i.test(u) || /\/project\//i.test(u))
      return "To adres panelu Supabase. Potrzebny jest Project URL, np. https://twojprojekt.supabase.co";
    if (!/^https:\/\/[a-z0-9-]+\.supabase\.(co|in)$/i.test(u))
      return "Adres powinien wyglądać tak: https://twojprojekt.supabase.co";
    return null;
  }
  function keyProblem(k) {
    if (!k || /^TUTAJ_WKLEJ/i.test(k)) return "Wklej klucz anon public.";
    if (k.length < 30) return "Klucz wygląda na niekompletny — skopiuj go w całości.";
    return null;
  }

  // ---------- Skąd bierzemy konfigurację ----------
  // 1) z przeglądarki (jeśli wpisałeś w aplikacji)   2) z pliku config.js
  let url = cleanUrl(localStorage.getItem(LS_URL) || (typeof SUPABASE_URL === "string" ? SUPABASE_URL : ""));
  let key = (localStorage.getItem(LS_KEY) || (typeof SUPABASE_ANON_KEY === "string" ? SUPABASE_ANON_KEY : "")).trim();

  function escapeAttr(s) {
    return (s || "").replace(/"/g, "&quot;");
  }

  // ---------- Ekran konfiguracji (gdy klucze złe/puste) ----------
  function showSetup(problemText) {
    cardEl.innerHTML =
      '<div class="au-eyebrow">Konfiguracja</div>' +
      '<h1 class="au-title">Połącz z bazą</h1>' +
      '<div class="au-sub">Jednorazowo wklej dwie wartości z Supabase.<br>Znajdziesz je w: <b>Project Settings → Data API</b>.</div>' +
      (problemText ? '<div class="au-msg err" style="margin-bottom:6px;">' + problemText + "</div>" : "") +
      "<label>Project URL</label>" +
      '<input id="cf-url" type="text" placeholder="https://twojprojekt.supabase.co" value="' + escapeAttr(url) + '">' +
      '<div class="au-hint" style="margin-top:4px;">Możesz wkleić razem z końcówką <b>/rest/v1/</b> — sam ją obetnę.</div>' +
      "<label>Klucz anon public</label>" +
      '<input id="cf-key" type="text" placeholder="eyJhbGciOi..." value="' + escapeAttr(key) + '">' +
      '<div class="au-btns"><button id="cf-save">Zapisz i połącz</button></div>' +
      '<div id="cf-msg" class="au-msg"></div>' +
      '<div class="au-hint">Zapisuje się w tej przeglądarce. Magda wpisze to samo raz u siebie.</div>';

    document.getElementById("cf-save").addEventListener("click", () => {
      const u = cleanUrl(document.getElementById("cf-url").value);
      const k = document.getElementById("cf-key").value.trim();
      const pu = urlProblem(u);
      const pk = keyProblem(k);
      const m = document.getElementById("cf-msg");
      if (pu || pk) {
        m.className = "au-msg err";
        m.innerHTML = pu || pk;
        return;
      }
      localStorage.setItem(LS_URL, u);
      localStorage.setItem(LS_KEY, k);
      m.className = "au-msg ok";
      m.textContent = "Zapisano. Uruchamiam…";
      setTimeout(() => location.reload(), 400);
    });
  }

  const pu0 = urlProblem(url);
  const pk0 = keyProblem(key);
  if (pu0 || pk0) {
    showSetup(pu0 || pk0);
    return; // nie łączymy się ze złą konfiguracją
  }

  // ---------- Połączenie ----------
  const sb = window.supabase.createClient(url, key);
  const CLIENT_ID = Math.random().toString(36).slice(2);
  const HH = typeof HOUSEHOLD_ID === "string" ? HOUSEHOLD_ID : "dom-1";
  let started = false;
  let channel = null;

  document.getElementById("au-login").addEventListener("click", async () => {
    msg("Logowanie…");
    const { error } = await sb.auth.signInWithPassword({
      email: emailEl.value.trim(),
      password: passEl.value,
    });
    if (error) msg(translateErr(error.message), "err");
  });

  document.getElementById("au-signup").addEventListener("click", async () => {
    msg("Zakładanie konta…");
    const { error } = await sb.auth.signUp({
      email: emailEl.value.trim(),
      password: passEl.value,
    });
    if (error) msg(translateErr(error.message), "err");
    else msg("Konto założone. Teraz kliknij <b>Zaloguj</b>.", "ok");
  });

  passEl.addEventListener("keydown", (e) => {
    if (e.key === "Enter") document.getElementById("au-login").click();
  });

  function translateErr(m) {
    if (/Invalid path/i.test(m) || /Failed to fetch/i.test(m) || /NetworkError/i.test(m))
      return 'Nie mogę połączyć się z bazą — sprawdź adres. <a href="#" id="fixcfg">Popraw konfigurację</a>';
    if (/Invalid API key/i.test(m) || /JWT/i.test(m))
      return 'Nieprawidłowy klucz. <a href="#" id="fixcfg">Popraw konfigurację</a>';
    if (/Invalid login/i.test(m)) return "Błędny e-mail lub hasło.";
    if (/already registered/i.test(m)) return "To konto już istnieje — kliknij Zaloguj.";
    if (/at least 6/i.test(m)) return "Hasło musi mieć min. 6 znaków.";
    if (/Email not confirmed/i.test(m))
      return 'Wyłącz „Confirm email" w Supabase → Authentication → Sign In / Providers → Email, potem zaloguj się ponownie.';
    return m;
  }

  msgEl.addEventListener("click", (e) => {
    if (e.target && e.target.id === "fixcfg") {
      e.preventDefault();
      showSetup(null);
    }
  });

  document.getElementById("logout").addEventListener("click", async () => {
    await sb.auth.signOut();
    location.reload();
  });

  // ---------- Most: window.storage → Supabase ----------
  window.storage = {
    async get(k) {
      const { data, error } = await sb
        .from("kitchen_state")
        .select("data")
        .eq("household", HH)
        .eq("key", k)
        .maybeSingle();
      if (error) throw error;
      if (!data) throw new Error("empty");
      return { key: k, value: data.data, shared: true };
    },
    async set(k, value) {
      const { error } = await sb.from("kitchen_state").upsert(
        {
          household: HH,
          key: k,
          data: value,
          client_id: CLIENT_ID,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "household,key" }
      );
      if (error) throw error;
      flash("Zapisano");
      return { key: k, value, shared: true };
    },
    async delete() { return null; },
    async list() { return { keys: [], shared: true }; },
  };

  let flashTimer = null;
  function flash(text) {
    const el = document.getElementById("saveflag");
    if (!el) return;
    el.textContent = "● " + text;
    el.style.opacity = "1";
    clearTimeout(flashTimer);
    flashTimer = setTimeout(() => {
      el.style.opacity = "0";
    }, 1200);
  }

  // ---------- Synchronizacja na żywo ----------
  function watchChanges() {
    if (channel) return;
    channel = sb
      .channel("kitchen-live")
      .on("postgres_changes", { event: "*", schema: "public", table: "kitchen_state" }, (payload) => {
        const row = payload.new || {};
        if (row.household !== HH) return;
        if (row.client_id === CLIENT_ID) return;
        const a = document.activeElement;
        const typing = a && (a.tagName === "INPUT" || a.tagName === "TEXTAREA" || a.tagName === "SELECT");
        if (typing) return;
        flash("Zaktualizowano przez drugą osobę");
        if (window.__KK_RELOAD) window.__KK_RELOAD();
      })
      .subscribe();
  }

  // ---------- Start po zalogowaniu ----------
  sb.auth.onAuthStateChange((_event, session) => {
    if (session && session.user) {
      authEl.style.display = "none";
      appEl.style.display = "block";
      whoEl.textContent = session.user.email;
      if (!started) {
        started = true;
        watchChanges();
        if (window.__KK_START) window.__KK_START();
      }
    } else {
      authEl.style.display = "flex";
      appEl.style.display = "none";
    }
  });

  sb.auth.getSession();
})();
