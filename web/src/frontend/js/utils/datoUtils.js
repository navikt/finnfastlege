const kortManeder = ['januar', 'februar', 'mars', 'april', 'mai', 'juni', 'juli', 'august', 'september', 'oktober', 'november', 'desember'];

export const tilLangtDatoFormat = (dato) => {
    const newDato = new Date(dato);
    const maned = kortManeder[newDato.getMonth() - 1];
    return `${newDato.getDate()}. ${maned} ${newDato.getFullYear()}`;
};
