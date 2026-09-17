# Kaj je še treba urediti

Edini veljaven seznam odprtih stvari za byurska.com. Urejeno po tem, kaj kaj blokira.
Zgodovina že opravljenega dela je v `OWNER_ACTION_REQUIRED.md` — tam ne iščem odprtih
nalog, tu so.

Zadnjič posodobljeno: 2026-09-17

---

## 1. Nujno — trgovina sprejema prava plačila

Stripe je v živo. Preizkusni nakup je ustvaril pravo sejo za 2.400 €. Okoli tega pa manjka
vse ostalo, kar bi kupec pričakoval.

- [ ] **Odloči: pustiti plačila vklopljena ali začasno izklopiti.** Dokler ni spodnjega,
      lahko nekdo plača 2.400 €, ti pa o tem ne izveš po nobeni poti na strani.
- [x] **Podatki podjetja** — vpisani 2026-09-17 (Urška Repušič s.p., Rače; ni zavezanka za DDV).
      E-naslov je na strani skrit pred roboti za spam. Pri vseh 5 slikah piše, da DDV ni obračunan.
- [ ] **Telefon** — kasneje. Pri branjih ga bo stranka dobila šele v emailu s potrditvijo termina,
      ne na strani. Za trgovino (prodaja na daljavo) EU pravila običajno zahtevajo telefon —
      lahko je ločena številka.
- [ ] **Pravni pregled šestih strani** (`/legal/*`) pri usposobljeni osebi. Vsaka stran
      ima trenutno na sebi napisano, da še ni pregledana.
- [ ] **Za vseh 5 slik** (`src/content/artworks.ts`): rok odpreme in navodila za nego
      (DDV je urejen).
- [ ] **Dostava** (`/legal/shipping`): način in material pakiranja, ali je pošiljka
      zavarovana in za koliko, ali kupec dobi sledilno številko in pri katerem prevozniku.
- [ ] Odloči, ali je posamezna slika običajen original, izdelan po naročilu ali osebno
      prilagojen — od tega je odvisno, kateri člen o pravici do odstopa velja.

## 2. ~~Nihče te ne more doseči~~ — urejeno 2026-09-17

Vsi trije obrazci pošiljajo prek **Resend** (brezplačno: 3.000 emailov/mesec, 100/dan;
domena byurska.com potrjena, nastavitve v Vercelu). Preizkušeno na živi strani — prišli so
vsi štirje emaili.

- [x] Kontakt → email na `OWNER_EMAIL`, odgovor gre neposredno obiskovalcu.
- [x] Branje v živo → email s priponko `.ics` (en dotik do iPhone koledarja) + potrdilo stranki.
- [x] Tedenski tarot → stik v Resend (Contacts) + pozdravni email s karto.

## 3. Čakam na tvoje vsebine

- [ ] **53 slovenskih besedil** — delovni list:
      https://claude.ai/code/artifact/1b268c88-61ce-4b80-93dc-8f969084a7c3
      Brez tega ni dvojezične strani.
- [ ] **Preostali citati za Poezijo** iz zapiska „trejderji 101“. Stran ima zdaj en sam
      citat in je zato videti prazna.
- [ ] **Povezava do Instagrama.** V nogi je gumb, ki ne vodi nikamor. Ali pošlji povezavo
      ali jo odstranim.
- [ ] **22 slik tarot kart** — obljubila si jih. Pokončne, razmerje ~1 : 1,7, vsaj
      600 × 1020 pik. Povej tudi, od kod so (tvoje / kupljena licenca / javna domena).
- [ ] **Preberi besedila, ki sem jih napisal jaz, in jih popravi ali potrdi.** Napisana so
      v prvi osebi, kot da govoriš ti, zato ne bi smela ostati nepregledana:
      zapisi umetnice, „Pomen“ in „Za zbiratelja“ pri vseh 5 slikah (`artworks.ts`),
      besedilo strani Spirituality, in branja vseh 22 tarot kart (`tarotData.ts`).
      Novo (2026-09-17): besedila petih poti, lune, minute tišine in „treh luči“
      (`src/components/spirituality/pathsData.ts`).

## 4. Nedokončano na strani

- [ ] **Climb** je še vedno stran „kmalu“. Ali napiši vsebino ali jo odstranim iz menuja.
- [ ] **Telefonska branja** so v obrazcu vidna, a onemogočena („kmalu“). Vklopi, ko boš
      pripravljena sprejemati klice.
- [ ] **Jezikovni gumb v nogi** je onemogočen in ponuja samo angleščino. Zaživi šele s
      točko 3.
- [ ] **Dvojezična stran** (angleško + slovensko na vseh straneh) — blokirano na točki 3.

## 5. Rezervacije in tedenski tarot — koda narejena 2026-09-17

Baza (Upstash Redis prek Vercela, brezplačno), opomniki in tedensko pošiljanje so napisani.
Začnejo delovati, ko je baza povezana s projektom v Vercelu — do takrat vse deluje kot prej.

- [ ] **Poveži bazo:** Vercel → Storage → Upstash for Redis (Free) → Connect to project.
- [ ] (priporočeno) V Vercelu dodaj `CRON_SECRET` (poljubno dolgo naključno besedilo).
- [ ] Preizkus: rezervacija → termin izgine iz izbirnika → email s povezavo „Potrdi / Zavrni“.

Kako deluje, ko je baza povezana:
- **Zasedeni termini** — izbrani termin se takoj zadrži in izgine iz izbirnika za vse.
  Urška ga potrdi ali zavrne na povezavi iz emaila; zavrnitev termin spet sprosti.
- **Opomnik** — vsak dan ob ~9h stranke s potrjenim branjem jutri dobijo opomnik,
  Urška pa povzetek jutrišnjih branj.
- **Tedenski tarot** — vsak ponedeljek ob ~8h vsak naročnik dobi karto tedna v svojem
  jeziku, s povezavo za odjavo. Brezplačni Resend dovoli 100 emailov na dan — nad ~100
  naročniki bo treba plačljiv paket.
- [ ] **SMS opomniki** — rekla si, da lahko počaka.
- [ ] **Analitika** — ali jo sploh hočeš in katero. Sistem za privolitev je že pripravljen.

## 5b. Zvezdni poslovni koledar (naročnina 5,99 €/mesec) — koda narejena 2026-09-17

Stran `/zvezdni-koledar`: osebni astrološki koledar po rojstni karti (🤝 pogodbe, 🚀 začetki,
⛔ ne začenjaj, 🧘 čas zase + 💞💰🌿), mesečni osebni horoskop, tedenski pregled, koledar v telefonu.
7 dni brezplačno, plačilo prek Stripa, odpoved z gumbom. Vsa besedila so samodejna (SL + EN).

- [ ] **Poveži bazo** (isto kot točka 5) — brez nje obrazec kaže „na voljo zelo kmalu“.
- [ ] **Računovodja: davčno potrjevanje računov.** Plačila s kartico v Sloveniji štejejo kot
      gotovinska, zato računi verjetno potrebujejo davčno potrjevanje (velja tudi za trgovino).
      Preveri, preden prvi naročnik plača (7 dni po prijavi).
- [ ] Pravni pregled točke 19 v Pogojih (naročnina, odstop od pogodbe).
- [ ] Prvi preizkus: prijava s svojim naslovom → Stripe → koledar → odpoved v 7 dneh (brez plačila).

## 6. Ob zagonu

- [ ] `NEXT_PUBLIC_SITE_URL` nastavi v Vercelu. (Koda zdaj tudi brez tega uporabi pravi
      naslov, a naj bo nastavljeno izrecno.)
- [ ] **Ponovno oddaj sitemap Googlu.** Prej je vsem stranem sporočal `localhost`.
- [ ] Klik skozi celoten nakup s pravim plačilom, ko je vse zgoraj urejeno.
