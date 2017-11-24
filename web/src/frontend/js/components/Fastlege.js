import React, {PropTypes} from 'react';
import Feilmelding from './Feilmelding';
import AppSpinner from './AppSpinner';
import FastlegeInfo from './FastlegeInfo';
import Sokeboks from './Sokeboks';

const ikkeTilgangFeilmelding = (ikkeTilgangGrunn) => {
    if (ikkeTilgangGrunn === 'KODE6') {
        return 'Bruker har diskresjonskode 6, du har ikke tilgang til å se informasjon om bruker';
    } else if (ikkeTilgangGrunn === 'KODE7') {
        return 'Bruker har diskresjonskode 7, du har ikke tilgang til å se informasjon om bruker';
    } else if (ikkeTilgangGrunn === 'EGEN_ANSATT') {
        return 'Bruker er egen ansatt, du har ikke tilgang til å se informasjon om bruker';
    } else if (ikkeTilgangGrunn === 'SYFO') {
        return 'Du har ikke tilgang til sykefraværsoppfølgingen';
    }
    return '';
};

const Fastlege = ({ fastlege, hentFastlege }) => {
    return (<div>
        <h1>Finn fastlegen</h1>
        <p>Søk opp fastlegen ved å skrive brukerens fødselsnummer</p>
        <Sokeboks hentFastlege={hentFastlege} />
        {
            (() => {
                if (fastlege.hentingFeilet) {
                    return (<Feilmelding />);
                } else if (fastlege.henter) {
                    return (<AppSpinner />);
                } else if (!fastlege.harSoktBruker) {
                    return null;
                } else if (fastlege.ikkeTilgang) {
                    return (<Feilmelding tittel="Ingen tilgang"
                                         melding={{ __html: `<p>${ikkeTilgangFeilmelding(fastlege.ikkeTilgangGrunn)}</p>` }} />);
                } else if (fastlege.ikkeFunnet) {
                    return (<Feilmelding tittel="Finner ikke fastlegen"
                                         melding={{ __html: '<p>Det kan hende brukeren ikke har en registrert fastlege. Ta kontakt med brukeren for å få behandlers kontaktopplysninger.</p>' }} />);
                }
                return <FastlegeInfo fastlege={fastlege.data} />
            })()
        }
    </div>);
};

Fastlege.propTypes = {
    fastlege: PropTypes.object,
};

export default Fastlege;
