import React, { PropTypes } from 'react';
import PersonIkon from '../svg/PersonIkon';
import LegeIkon from '../svg/LegeIkon';
import OrangeInfoLabel from './OrangeInfoLabel';
import { tilLangtDatoFormat } from '../utils/datoUtils';

const FastlegeInfo = ({ fastlege }) => {
    return (<div>
        <div className="panel" style={{ marginBottom: '.25em' }}>
            <div className="flexbox">
                <div style={{ marginRight: '2em' }}>
                    <PersonIkon />
                </div>
                <div>
                    <label className="typo-undertittel">{fastlege.pasient.navn}</label>
                    <label>{fastlege.pasient.fnr}</label>
                </div>
            </div>
            { fastlege.pasient.egenansatt && <OrangeInfoLabel tekst="Egen ansatt" /> }
            { fastlege.pasient.diskresjonskode && fastlege.pasient.diskresjonskode === '6' && <OrangeInfoLabel tekst="Kode 6" /> }
            { fastlege.pasient.diskresjonskode && fastlege.pasient.diskresjonskode === '7' && <OrangeInfoLabel tekst="Kode 7" /> }
        </div>

        <div className="panel blokk--s">
            <div className="flexbox">
                <div style={{ marginRight: '2em' }}>
                    <LegeIkon />
                </div>
                <div className="blokk--xs">
                    <div className="blokk--xs">
                        <label className="typo-undertittel">{fastlege.navn}</label>
                        <label>{`Fastlege: ${tilLangtDatoFormat(fastlege.pasientforhold.fom)} - nå`}</label>
                    </div>
                    <div className="statusopplysninger js-rad">
                        <div className="nokkelopplysning">
                            <label className="nokkelopplysning__tittel">Legekontor</label>
                            <label className="js-status">{fastlege.fastlegekontor.navn}</label>
                        </div>
                        <div className="nokkelopplysning nokkelopplysning--statusopplysning">
                            <label className="nokkelopplysning__tittel">Besøksadresse</label>
                            <label className="js-status">{fastlege.fastlegekontor.besoeksadresse}</label>
                        </div>
                    </div>

                    <div className="statusopplysninger js-rad">
                        <div className="nokkelopplysning">
                            <label className="nokkelopplysning__tittel">Telefon</label>
                            <label className="js-status">{fastlege.fastlegekontor.telefon}</label>
                        </div>
                        <div className="nokkelopplysning nokkelopplysning--statusopplysning">
                            <label className="nokkelopplysning__tittel">Postadresse</label>
                            <label className="js-status">{fastlege.fastlegekontor.postadresse}</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>);
};

FastlegeInfo.propTypes = {
    fastlege: PropTypes.object,
};

export default FastlegeInfo;
