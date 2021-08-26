function convertDateToReadableString(dateVal) {
    var date = new Date(dateVal);
    return date.toLocaleDateString();
  }
  
  export { convertDateToReadableString };