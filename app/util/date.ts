export function readibleDate(date: string) {
  const tempDate = new Date(date);
  const formattedDate = tempDate.toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return formattedDate;
}
