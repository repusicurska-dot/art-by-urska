import type { Locale } from "@/i18n/locales";

/**
 * The messages the subscription APIs send back to a form — the ones a visitor actually reads
 * when something goes wrong. Shared between the Star Business Calendar and the Poetry letters,
 * because both forms ask for the same things and fail in the same ways.
 */
export interface ApiMessages {
  invalidEmail: string;
  tooManyToday: string;
  tooManyTodayShort: string;
  tooManySignIn: string;
  notAvailable: string;
  subscriptionsSoon: string;
  checkoutFailed: string;
  acceptTerms: string;
  checkBirth: string;
  linkInvalid: string;
  linkExpired: string;
  wrongCurrentPassword: string;
  wrongEmailOrPassword: string;
  notSignedIn: string;
  alreadyActive: string;
  alreadySubscribed: string;
  genericRetry: string;
  accountExistsSignIn: string;
  accountExistsAddOnPage: string;
}

export const API_MESSAGES: Record<Locale, ApiMessages> = {
  sl: {
    invalidEmail: "Vpiši veljaven e-naslov.",
    tooManyToday: "Preveč poskusov danes. Poskusi jutri.",
    tooManyTodayShort: "Preveč poskusov danes.",
    tooManySignIn: "Preveč poskusov prijave danes. Poskusi jutri.",
    notAvailable: "Trenutno ni na voljo.",
    subscriptionsSoon: "Naročnina bo na voljo zelo kmalu.",
    checkoutFailed: "Plačila ni bilo mogoče začeti. Poskusi znova čez nekaj minut.",
    acceptTerms: "Za nadaljevanje potrdi pogoje naročnine.",
    checkBirth: "Preveri datum, uro in kraj rojstva.",
    linkInvalid: "Povezava ni veljavna.",
    linkExpired: "Povezava je potekla ali je bila že uporabljena. Zahtevaj novo.",
    wrongCurrentPassword: "Trenutno geslo ni pravilno.",
    wrongEmailOrPassword: "Napačen e-naslov ali geslo. Če računa še nimaš, se najprej naroči.",
    notSignedIn: "Nisi prijavljen.",
    alreadyActive: "Naročnina je že aktivna.",
    alreadySubscribed: "Ta naslov je že naročen. Prijavi se.",
    genericRetry: "Ni uspelo. Poskusi znova.",
    accountExistsSignIn: "Račun s tem e-naslovom že obstaja. Prijavi se s svojim geslom.",
    accountExistsAddOnPage: "Račun s tem e-naslovom že obstaja. Prijavi se in naročnino dodaj na svoji strani.",
  },
  en: {
    invalidEmail: "Please enter a valid email.",
    tooManyToday: "Too many attempts today. Please try tomorrow.",
    tooManyTodayShort: "Too many attempts today.",
    tooManySignIn: "Too many sign-in attempts today. Please try tomorrow.",
    notAvailable: "Not available right now.",
    subscriptionsSoon: "Subscriptions open very soon.",
    checkoutFailed: "Couldn't start checkout. Please try again in a few minutes.",
    acceptTerms: "Please accept the subscription terms to continue.",
    checkBirth: "Please check your birth date, time and place.",
    linkInvalid: "That link isn't valid.",
    linkExpired: "That link has expired or was already used. Please request a new one.",
    wrongCurrentPassword: "That current password isn't right.",
    wrongEmailOrPassword: "Wrong email or password. If you don't have an account yet, subscribe first.",
    notSignedIn: "You're not signed in.",
    alreadyActive: "Your subscription is already active.",
    alreadySubscribed: "This address is already subscribed. Please sign in.",
    genericRetry: "That didn't work. Please try again.",
    accountExistsSignIn: "An account with this email already exists. Please sign in with your password.",
    accountExistsAddOnPage: "An account with this email already exists. Sign in and add the subscription from your account page.",
  },
  hr: {
    invalidEmail: "Upiši valjanu e-adresu.",
    tooManyToday: "Previše pokušaja danas. Pokušaj sutra.",
    tooManyTodayShort: "Previše pokušaja danas.",
    tooManySignIn: "Previše pokušaja prijave danas. Pokušaj sutra.",
    notAvailable: "Trenutno nije dostupno.",
    subscriptionsSoon: "Pretplata će biti dostupna vrlo brzo.",
    checkoutFailed: "Plaćanje nije bilo moguće pokrenuti. Pokušaj ponovno za nekoliko minuta.",
    acceptTerms: "Za nastavak potvrdi uvjete pretplate.",
    checkBirth: "Provjeri datum, sat i mjesto rođenja.",
    linkInvalid: "Poveznica nije valjana.",
    linkExpired: "Poveznica je istekla ili je već iskorištena. Zatraži novu.",
    wrongCurrentPassword: "Trenutna lozinka nije točna.",
    wrongEmailOrPassword: "Pogrešna e-adresa ili lozinka. Ako još nemaš račun, prvo se pretplati.",
    notSignedIn: "Nisi prijavljen.",
    alreadyActive: "Pretplata je već aktivna.",
    alreadySubscribed: "Ova je adresa već pretplaćena. Prijavi se.",
    genericRetry: "Nije uspjelo. Pokušaj ponovno.",
    accountExistsSignIn: "Račun s ovom e-adresom već postoji. Prijavi se svojom lozinkom.",
    accountExistsAddOnPage: "Račun s ovom e-adresom već postoji. Prijavi se i dodaj pretplatu na svojoj stranici.",
  },
  de: {
    invalidEmail: "Bitte gib eine gültige E-Mail-Adresse ein.",
    tooManyToday: "Heute zu viele Versuche. Versuch es morgen wieder.",
    tooManyTodayShort: "Heute zu viele Versuche.",
    tooManySignIn: "Heute zu viele Anmeldeversuche. Versuch es morgen wieder.",
    notAvailable: "Gerade nicht verfügbar.",
    subscriptionsSoon: "Das Abo öffnet sehr bald.",
    checkoutFailed: "Die Zahlung konnte nicht gestartet werden. Versuch es in ein paar Minuten noch einmal.",
    acceptTerms: "Bitte stimm den Abo-Bedingungen zu, um fortzufahren.",
    checkBirth: "Bitte prüf Datum, Uhrzeit und Ort deiner Geburt.",
    linkInvalid: "Dieser Link ist ungültig.",
    linkExpired: "Dieser Link ist abgelaufen oder wurde schon verwendet. Fordere einen neuen an.",
    wrongCurrentPassword: "Das aktuelle Passwort stimmt nicht.",
    wrongEmailOrPassword: "Falsche E-Mail oder falsches Passwort. Wenn du noch kein Konto hast, abonnier zuerst.",
    notSignedIn: "Du bist nicht angemeldet.",
    alreadyActive: "Dein Abo ist bereits aktiv.",
    alreadySubscribed: "Diese Adresse ist bereits angemeldet. Bitte melde dich an.",
    genericRetry: "Das hat nicht geklappt. Versuch es erneut.",
    accountExistsSignIn: "Ein Konto mit dieser E-Mail existiert bereits. Bitte melde dich mit deinem Passwort an.",
    accountExistsAddOnPage: "Ein Konto mit dieser E-Mail existiert bereits. Melde dich an und füge das Abo auf deiner Seite hinzu.",
  },
  it: {
    invalidEmail: "Inserisci un'email valida.",
    tooManyToday: "Troppi tentativi oggi. Riprova domani.",
    tooManyTodayShort: "Troppi tentativi oggi.",
    tooManySignIn: "Troppi tentativi di accesso oggi. Riprova domani.",
    notAvailable: "Non disponibile al momento.",
    subscriptionsSoon: "L'abbonamento apre molto presto.",
    checkoutFailed: "Non è stato possibile avviare il pagamento. Riprova tra qualche minuto.",
    acceptTerms: "Per continuare accetta le condizioni dell'abbonamento.",
    checkBirth: "Controlla data, ora e luogo di nascita.",
    linkInvalid: "Questo link non è valido.",
    linkExpired: "Questo link è scaduto o è già stato usato. Richiedine uno nuovo.",
    wrongCurrentPassword: "La password attuale non è corretta.",
    wrongEmailOrPassword: "Email o password errate. Se non hai ancora un account, abbonati prima.",
    notSignedIn: "Non hai effettuato l'accesso.",
    alreadyActive: "Il tuo abbonamento è già attivo.",
    alreadySubscribed: "Questo indirizzo è già iscritto. Accedi.",
    genericRetry: "Non ha funzionato. Riprova.",
    accountExistsSignIn: "Esiste già un account con questa email. Accedi con la tua password.",
    accountExistsAddOnPage: "Esiste già un account con questa email. Accedi e aggiungi l'abbonamento dalla tua pagina.",
  },
};
