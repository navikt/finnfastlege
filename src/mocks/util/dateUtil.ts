const MILLISEKUNDER_PER_DAG = 86400000;

export const leggTilDagerPaDato = (dato: Date, dager: number) => {
  const nyDato = new Date(dato);
  nyDato.setTime(nyDato.getTime() + dager * MILLISEKUNDER_PER_DAG);
  return new Date(nyDato);
};
