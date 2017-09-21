import React, { PropTypes } from 'react';
import Fastlege from '../components/Fastlege';
import Side from '../sider/Side';
import { connect } from 'react-redux';
import * as fastlegeActions from '../actions/fastlege_actions';

export const FastlegeSide = ({ fastlege, hentFastlege }) => {
    return (<Side>
        <Fastlege fastlege={fastlege} hentFastlege={hentFastlege} />
    </Side>);
};

FastlegeSide.propTypes = {
    fastlege: PropTypes.object,
    hentFastlege: PropTypes.func,
};

export function mapStateToProps(state) {
    return {
        fastlege: state.fastlege,
    };
}

const FastlegeContainer = connect(mapStateToProps, Object.assign({}, fastlegeActions))(FastlegeSide);

export default FastlegeContainer;
