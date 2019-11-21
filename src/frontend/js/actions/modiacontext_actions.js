import {
    PUSH_MODIACONTEXT_FORESPURT,
    PUSH_MODIACONTEXT_FEILET,
    MODIACONTEXT_PUSHET,
    PUSHER_MODIACONTEXT,
    HENT_AKTIVENHET_FORESPURT,
    HENT_AKTIVENHET_FEILET,
    AKTIVENHET_HENTET,
    HENTER_AKTIVENHET,
} from './actiontyper';

export function hentAktivEnhet(data) {
    return {
        type: HENT_AKTIVENHET_FORESPURT,
        data,
    };
}

export function hentAktivEnhetFeilet() {
    return {
        type: HENT_AKTIVENHET_FEILET,
    };
}

export function henterAktivEnhet() {
    return {
        type: HENTER_AKTIVENHET,
    };
}

export function aktivEnhetHentet(data) {
    return {
        type: AKTIVENHET_HENTET,
        data,
    };
}

export function pushModiaContextFeilet() {
    return {
        type: PUSH_MODIACONTEXT_FEILET,
    };
}

export function pusherModiaContext() {
    return {
        type: PUSHER_MODIACONTEXT,
    };
}

export function pushModiaContext(data) {
    return {
        type: PUSH_MODIACONTEXT_FORESPURT,
        data,
    };
}

export function modiaContextPushet() {
    return {
        type: MODIACONTEXT_PUSHET,
    };
}

