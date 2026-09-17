# Kaj je še treba urediti

Edini veljaven seznam odprtih stvari za byurska.com. Urejeno po tem, kaj kaj blokira.
Zgodovina že opravljenega dela je v `OWNER_ACTION_REQUIRED.md` — tam ne iščem odprtih
nalog, tu so.

Zadnjič posodobljeno: 2026-09-12

---

## 1. Nujno — trgovina sprejema prava plačila

Stripe je v živo. Preizkusni nakup je ustvaril pravo sejo za 2.400 €. Okoli tega pa manjka
vse ostalo, kar bi kupec pričakoval.

- [ ] **Odloči: pustiti plačila vklopljena ali začasno izklopiti.** Dokler ni spodnjega,
      lahko nekdo plača 2.400 €, ti pa o tem ne izveš po nobeni poti na strani.
- [ ] **Podatki podjetja** (`src/content/business.ts`) — vseh 10 polj je še v oglatih
      oklepajih in **vidnih obiskovalcem** na pravnih straneh in v podatkih za Google:
      pravno ime, pravna oblika (s.p. / d.o.o.), sedež, matična številka, davčna številka,
      kontaktni e-naslov, telefon, naslov za vračila, bančni podatki, organ za reševanje
      sporov.
- [ ] **Pravni pregled šestih strani** (`/legal/*`) pri usposobljeni osebi. Vsaka stran
      ima trenutno na sebi napisano, da še ni pregledana.
- [ ] **Za vseh 5 slik** (`src/content/artworks.ts`): obravnava DDV, rok odpreme, navodila
      za nego. Vsako se pojavi petkrat, skupaj 15 oznak v oklepajih.
- [ ] **Dostava** (`/legal/shipping`): način in material pakiranja, ali je pošiljka
      zavarovana in za koliko, ali kupec dobi sledilno številko in pri katerem prevozniku.
- [ ] Odloči, ali je posamezna slika običajen original, izdelan po naročilu ali osebno
      prilagojen — od tega je odvisno, kateri člen o pravici do odstopa velja.

## 2. Nihče te ne more doseči

Izbran je **Resend** (brezplačno: 3.000 emailov na mesec, 100 na dan). Koda je napisana
(`src/lib/email.ts`) — obrazci začnejo pošiljati, ko so v Vercelu nastavljene tri
spremenljivke. Do takrat se obnašajo kot prej.

- [ ] Račun na resend.com in potrditev domene byurska.com (DNS zapisi).
- [ ] V Vercelu nastavi `RESEND_API_KEY`, `EMAIL_FROM` (npr.
      `Art by Urška <obvestila@byurska.com>`) in `OWNER_EMAIL` (Urškin inbox).
- [ ] Preizkus vseh treh obrazcev na testnem naslovu:
      kontakt → email Urški; branje v živo → email Urški s priponko za koledar + potrdilo
      stranki; tedenski tarot → stik v Resend + pozdravni email.

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

## 5. Zaledje, ki ga je treba zgraditi — rabim tvoje odločitve

Trenutno v projektu ni baze podatkov. Zato:

- [ ] **Baza podatkov**, da zaseden termin izgine iz izbirnika. Zdaj lahko dva obiskovalca
      rezervirata isti termin in to rešuješ ročno.
- [ ] **Opomnik dan pred terminom** po e-pošti — rabi ponudnika iz točke 2 in časovnik.
- [ ] **SMS opomniki** — rekla si, da lahko počaka.
- [ ] **Termini v tvoj iPhone koledar** — realna pot je priponka `.ics` v obvestilu, ki ga
      dobiš po e-pošti; generator je že napisan.
- [ ] **Tedenski tarot e-mail** — vsebina obstaja, manjka le pošiljanje.
- [ ] **Analitika** — ali jo sploh hočeš in katero. Sistem za privolitev je že pripravljen.

## 6. Ob zagonu

- [ ] `NEXT_PUBLIC_SITE_URL` nastavi v Vercelu. (Koda zdaj tudi brez tega uporabi pravi
      naslov, a naj bo nastavljeno izrecno.)
- [ ] **Ponovno oddaj sitemap Googlu.** Prej je vsem stranem sporočal `localhost`.
- [ ] Klik skozi celoten nakup s pravim plačilom, ko je vse zgoraj urejeno.
