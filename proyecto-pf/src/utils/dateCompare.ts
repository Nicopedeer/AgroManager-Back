export function isWithinSevenDays(date1, date2) {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  // Normaliza las fechas al inicio del día (sin la hora)
  const startOfDay1 = new Date(d1.getFullYear(), d1.getMonth(), d1.getDate());
  const startOfDay2 = new Date(d2.getFullYear(), d2.getMonth(), d2.getDate());

  // Calcular la diferencia en milisegundos
  const differenceInMilliseconds = Math.abs(startOfDay1.getTime() - startOfDay2.getTime());

  // Convertir la diferencia en días
  const differenceInDays = differenceInMilliseconds / (1000 * 60 * 60 * 24);

  // Verificar si la diferencia es exactamente 7 días
  return differenceInDays === 7;
}

