import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Hovedknapp } from 'nav-frontend-knapper';
import { Input } from 'nav-frontend-skjema';
import { erGyldigFodselsnummer } from '../utils/fnrValideringUtil';

class Sokeboks extends Component {
    constructor(props) {
        super(props);
        this.state = {
            value: '',
            valideringsfeil: false,
        };
        this.sokefeltEndret = this.sokefeltEndret.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    onSubmit(event) {
        event.preventDefault();
        const input = this.state.value.replace(/\s/g, '');
        if (erGyldigFodselsnummer(input)) {
            this.props.hentFastlege(input);
        } else {
            this.setState({
                valideringsfeil: true,
            });
        }
    }

    sokefeltEndret(event) {
        this.setState({
            value: event.target.value,
            valideringsfeil: false,
        });
    }

    render() {
        return (<div className="sokeboks blokk">
            <form onSubmit={this.onSubmit} >
                <Input
                    feil={this.state.valideringsfeil && {
                        feilmelding: 'Du må skrive inn et gyldig fødselsnummer (11 siffer)',
                    }}
                    type="search"
                    onChange={this.sokefeltEndret}
                    placeholder="Søk"
                    value={this.state.value} />
                <Hovedknapp>Søk</Hovedknapp>
            </form>
        </div>);
    }
}

Sokeboks.propTypes = {
    hentFastlege: PropTypes.func,
};

export default Sokeboks;
