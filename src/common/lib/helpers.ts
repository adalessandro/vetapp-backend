export const joinDict = (dict: object) => {
  return Object.entries(dict)
    .map(([, v]) => {
      return v;
    })
    .filter((x) => x !== '')
    .join(' ');
};
