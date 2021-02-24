const kortManeder = [
  "januar",
  "februar",
  "mars",
  "april",
  "mai",
  "juni",
  "juli",
  "august",
  "september",
  "oktober",
  "november",
  "desember",
];

export const tilLangtDatoFormat = (dato: Date) => {
  const newDato = new Date(dato);
  const maned = kortManeder[newDato.getMonth()];
  return `${newDato.getDate()}. ${maned} ${newDato.getFullYear()}`;
};
