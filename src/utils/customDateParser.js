export const getParsedDateInput = (state, value) => {
  const valueLength = state.length;
  const currentInput = value
    .split('')
    .filter(el => !isNaN(el))
    .join('');

  if (!isNaN(currentInput)) {
    if (valueLength === 0) {
      if (parseInt(currentInput) > 3) return '0' + value + '-';
      else return value;
    } else if (valueLength === 1) {
      const dateFirst = state[0];
      const dateSecond = parseInt(currentInput[1]);
      if (dateFirst === '1' || dateFirst === '2') return value + '-';
      else if (dateFirst === '0') {
        if (dateSecond === 0) {
          return value.slice(0, -1) + 1 + '-';
        } else return value + '-';
      } else if (dateFirst === '3') {
        if (dateSecond > 1) return value.slice(0, -1) + 1 + '-';
        else return value + '-';
      }
    } else if (valueLength === 3) {
      const monthFirst = parseInt(currentInput[2]);
      if (monthFirst > 1) return value.slice(0, -1) + 0 + monthFirst + '-';
      else return value;
    } else if (valueLength === 4) {
      const monthFirst = state[3];
      const monthSecond = parseInt(currentInput[3]);
      if (monthFirst === '0') {
        if (monthSecond === 0) {
          return value.slice(0, -1) + 1 + '-';
        } else return value + '-';
      } else if (monthFirst === '1') {
        if (monthSecond > 2) return value.slice(0, -1) + 2 + '-';
        else return value + '-';
      }
    } else if (valueLength === 6) {
      const yearFirst = parseInt(currentInput[4]);
      if (yearFirst === 1) return value + 9;
      else if (yearFirst === 2) return value + 0;
      else return value.slice(0, -1) + 19 + yearFirst;
    } else if (valueLength === 8) {
      const yearSecond = state[7];
      if (yearSecond === '9') return value;
      else if (yearSecond === '0') return value.slice(0, -1) + 0;
    } else if (valueLength === 9) {
      const yearSecond = state[7];
      const yearForth = parseInt(currentInput[7]);
      if (yearSecond === '9') return value;
      else if (yearSecond === '0') {
        if (yearForth > 8) return value.slice(0, -1) + 8;
        else return value;
      }
    }
  }
};
