// eslint-disable-next-line @typescript-eslint/no-var-requires
const pgParse = require('postgres-interval');

export const joinDict = (dict: object) => {
  return Object.entries(dict)
    .map(([, v]) => {
      return v;
    })
    .filter((x) => x !== '')
    .join(' ');
};

export const parseInterval = (value: string | number, unit: string) => {
  const ret = pgParse();
  switch (unit) {
    case 'yr':
      ret.years = +value;
      break;
    case 'mo':
      ret.months = +value;
      break;
    case 'd':
      ret.days = +value;
      break;
    case 'w':
      ret.days = +value * 7;
      break;
    case 'hr':
      ret.hours = +value;
      break;
  }
  return ret;
};

export const intervalDateToString = (obj: any) => {
  if (obj.years) return `${obj.years} años`;
  if (obj.months) return `${obj.months} meses`;
  if (obj.days) return `${obj.days} días`;
  if (obj.hours) return `${obj.hours} horas`;
  return `-----`;
};
