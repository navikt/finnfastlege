/* eslint-disable import/prefer-default-export */
const finnMiljoStreng = () => {
    const { host } = window.location;
    const bindestrekIndex = host.indexOf('-');
    if (bindestrekIndex === -1) {
        return '';
    }
    const dotIndex = host.indexOf('.');
    return host.substring(bindestrekIndex, dotIndex);
};

export { finnMiljoStreng };
