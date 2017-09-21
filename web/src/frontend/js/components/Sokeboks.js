import React, { PropTypes, Component } from 'react';

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
        if (input.match(new RegExp('[0-9]{11}'))) {
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
    };

    render() {
        return (<div>
            { this.state.valideringsfeil && <p className="skjema__feilmelding">Du må skrive inn et gyldig fødselsnummer (11 siffer)</p>}
            <form onSubmit={this.onSubmit} className="blokk--l" >
                <div className="flexbox">
                    <input type="search"
                           onChange={this.sokefeltEndret}
                           placeholder="Søk"
                           className={`${this.state.valideringsfeil ? 'input--feil' : ''} sokefelt`}
                           value={this.state.value} />
                    <button type="submit" className="knapp">Søk</button>
                </div>
            </form>
        </div>);
    }
}

Sokeboks.propTypes = {
    hentFastlege: PropTypes.func,
};

export default Sokeboks;
