# Kaj je še treba urediti

Edini veljaven seznam odprtih stvari za byurska.com. Urejeno po tem, kaj kaj blokira.
Zgodovina že opravljenega dela je v `OWNER_ACTION_REQUIRED.md` — tam ne iščem odprtih
nalog, tu so.

Zadnjič posodobljeno: 2026-09-18

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
      Ni več ovira: slovenščino sem medtem napisal sam, tvoj vpis jo bo popravil.
- [ ] **Preostali citati za Poezijo** iz zapiska „trejderji 101“. Stran ni več prazna
      (glej 5e), a razdelek „Njene besede“ ima še vedno samo en tvoj citat.
- [ ] **Potrdi ali prepiši tri pisma iz ateljeja** (`src/content/poetry.ts`, označena
      `approvedByUrska: false`). Napisana so v tvojem imenu in jih naročniki dobijo po emailu —
      prvo je že vidno na strani. Nato dopisuj eno pismo na teden.
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
- [ ] **Tehnično opozorilo v konzoli** (React #418, neujemanje pri hidraciji) se izpiše na
      vsaki strani. Nič ni vidno pokvarjeno, obstajalo je že prej — a naj se odpravi.
- [ ] **Telefonska branja** so v obrazcu vidna, a onemogočena („kmalu“). Vklopi, ko boš
      pripravljena sprejemati klice.
- [x] **Jezik strani** — celoten vmesnik je v petih jezikih (slovensko, angleško, hrvaško,
      nemško, italijansko); gumb je v glavi in v nogi. Prevodi so moji, ne prevajalčevi.
      Preverjeno stran za stranjo: domača, zbirka, slika, košarica, plačilo, potrditev
      naročila, 404, o meni, kontakt, poezija, climb, glava in noga.
- [x] **Spirituality in tarot v vseh petih jezikih** (2026-09-18, na Teovo željo). Vseh 22
      kart — ime, ključne besede, kratko sporočilo in celotno branje — plus pet poti, luna,
      minuta tišine, tri luči, praskanica in obrazec za rezervacijo. Tudi tedenski tarot
      email in pozdravni email ob prijavi. Stran nima več svojega stikala SL/EN; sledi
      gumbu v glavi. **Branje v živo ostaja v slovenščini ali angleščini** — Urška ga vodi
      sama in govori ta dva jezika; obrazec zdaj posebej vpraša, v katerem jeziku naj bo.
- [ ] **Kaj je še vedno samo v angleščini — tvoja odločitev (vprašanje za Tea):**
      1. **Zgodbe ob slikah** (`artworks.ts`: „Her words“, „Meaning“, „For the collector“,
         zapis umetnice) — to je vsebina, ne vmesnik, in je še nepregledana (točka 3).
      2. **Zvezdni koledar** — dnevna branja in besedila koledarja so v SL in EN. Isti
         razlog kot prej pri tarotu; če hočeta pet jezikov tudi tam, povejta.
      3. **Pravne strani** — namenoma v angleščini, z opombo, da velja angleška različica.

## 5. Rezervacije in tedenski tarot — koda narejena 2026-09-17

Baza (Upstash Redis prek Vercela, brezplačno), opomniki in tedensko pošiljanje so napisani.
Začnejo delovati, ko je baza povezana s projektom v Vercelu — do takrat vse deluje kot prej.

- [x] **Baza povezana** 2026-09-17 (Upstash Redis `byurska-db`, Frankfurt, Free).
- [ ] **V Vercelu dodaj `CRON_SECRET`** (poljubno dolgo naključno besedilo). Brez njega lahko
      kdorkoli sproži naše dnevne posle (opomniki, tarot, pisma). Vsak posel si zapomni, kaj je
      že poslal, zato dvojnih emailov ni — a naj bo vseeno zaklenjeno.
- [x] Preizkus v živo: termin se zadrži in drugi ga ne more več rezervirati (409).

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

- [x] **Baza povezana** — obrazec za naročnino je odprt.
- [ ] **Računovodja: davčno potrjevanje računov.** Plačila s kartico v Sloveniji štejejo kot
      gotovinska, zato računi verjetno potrebujejo davčno potrjevanje (velja tudi za trgovino).
      Preveri, preden prvi naročnik plača (7 dni po prijavi).
- [ ] Pravni pregled točke 19 v Pogojih (naročnina, odstop od pogodbe).
- [ ] Prvi preizkus: prijava s svojim naslovom → Stripe → koledar → odpoved v 7 dneh (brez plačila).

## 5b2. Računi uporabnikov (Zvezdni koledar) — narejeno 2026-09-17

Naročnik si ob prijavi izbere geslo; prijava je z e-naslovom in geslom, geslo lahko kadarkoli
spremeni, ob pozabljenem geslu pa dobi povezavo za novo (velja eno uro in samo enkrat).
Stari računi brez gesla se lahko prijavijo s povezavo po emailu in si geslo nastavijo.

## 5c. Računi in DDV

- [ ] **Moj Račun** (moj-racun.si): Urška naredi račun sama in vnese podatke s.p., digitalno
      potrdilo za davčne blagajne (eDavki) in poslovni prostor. Nato vklopi dodatek Stripe
      (4,99 €/mesec) in poveže Stripe. Potem v Stripu izklopim njegova potrdila o plačilu.
- [x] **Opozorilo za prag OSS (10.000 €)** — vsak dan se iz Stripa sešteje prodaja kupcem v drugih
      državah EU. Od 9.000 € naprej Urška in Teo vsak dan dobita email, ko sta prijavljena na
      strani, pa na vrhu vsake strani vidita opozorilo. Stripe zdaj pri plačilu zahteva naslov
      (država kupca).

## 5d. Aplikacija za telefon

- [x] Stran se lahko doda na domači zaslon (iPhone in Android) in se odpre kot aplikacija z
      ikono UR. Ob prvem obisku na telefonu se pokaže animiran prikaz, kako jo dodaš.

## 5e. Poezija — „Pisma iz ateljeja“ (naročnina 4,99 €/mesec) — narejeno 2026-09-17

Stran `/poetry` je bila prej en citat in povezava naprej — obiskovalec ni imel kaj početi, ti pa
nisi imela od nje nič. Zdaj je pred njim pismo tega tedna v celoti in brezplačno, pod njim pa
naročnina: **4,99 € na mesec, prvih 7 dni brezplačno**.

- Vsak četrtek eno pismo po emailu (pesem ali kratko besedilo + ena tvoja slika ob njem).
- Arhiv vseh pisem na `/poetry/moj`, odpoved z enim klikom.
- **Isti račun kot Zvezdni koledar** — en e-naslov, eno geslo, naročnini sta ločeni.
- Če kakšen teden pisma ni, se ne pošlje nič (arhiv ostane odprt). Tako je zapisano tudi
  v Pogojih, točka 20.
- Tvoj in Teov naslov imata pisma zastonj.

- [ ] **Pisma** — glej točko 3: potrdi tri že napisana in dopiši naslednja.
- [ ] Pravni pregled točke 20 v Pogojih.
- [ ] Prvi preizkus: prijava → Stripe → arhiv → odpoved v 7 dneh (brez plačila).
- [ ] **Dva testna računa v bazi** (moja, ob preverjanju v živo): `teo.simonic7+poetrytest@`
      in `teo.simonic7+pismatest2@gmail.com`, geslo `LetterTest2026!`. Nista plačala in
      nimata dostopa — z njima se lahko prijaviš in preizkusiš, ali pa ju pusti pri miru.

## 6. Ob zagonu

- [ ] `NEXT_PUBLIC_SITE_URL` nastavi v Vercelu. (Koda zdaj tudi brez tega uporabi pravi
      naslov, a naj bo nastavljeno izrecno.)
- [ ] **Ponovno oddaj sitemap Googlu.** Prej je vsem stranem sporočal `localhost`.
- [ ] Klik skozi celoten nakup s pravim plačilom, ko je vse zgoraj urejeno.
