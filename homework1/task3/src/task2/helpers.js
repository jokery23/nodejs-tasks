export {
  handleError,
  toCamelCase,
};

function handleError(error) {
  console.error(error.message || error);
}

function toCamelCase(str) {
  let newStr = '';
  if (str) {
    str = str.charAt(0).toLowerCase() + str.slice(1);
    let wordArr = str.split(/[-_ ]/g);
    for (let i in wordArr) {
      if (i > 0) {
        newStr += wordArr[i].charAt(0).toUpperCase() + wordArr[i].slice(1);
      } else {
        newStr += wordArr[i];
      }
    }
  } else {
    return newStr;
  }
  return newStr;
}
