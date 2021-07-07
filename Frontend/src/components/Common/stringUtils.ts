export function FormatDateAsString(dateString: string) {
  if (!dateString) return "Not specified";
  let date = new Date(dateString);
  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return day + " " + monthNames[monthIndex] + " " + year;
}

export function FormatDateAsFullString(dateString: string) {
  if (!dateString) return "Not specified";
  let date = new Date(dateString);
  var monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  var day = date.getDate();
  var monthIndex = date.getMonth();
  var year = date.getFullYear();

  return `${day} ${monthNames[monthIndex]} ${year}, ${date.toLocaleTimeString(
    "en-US"
  )}`;
}

export function CompareElementsById(first: any, second: any) {
  if (first.id < second.id) {
    return -1;
  }
  if (first.id > second.id) {
    return 1;
  }
  return 0;
}
