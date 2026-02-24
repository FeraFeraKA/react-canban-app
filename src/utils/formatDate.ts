export const formatDate = (createdAt: number): string => {
  const date = new Date(createdAt);
  const year = String(date.getFullYear());
  let month = String(date.getMonth() + 1);
  let day = String(date.getDate());
  let hours = String(date.getHours());
  let minutes = String(date.getMinutes());

  if (+month < 10) month = '0' + month;
  if (+day < 10) day = '0' + day;
  if (+hours < 10) hours = '0' + hours;
  if (+minutes < 10) minutes = '0' + minutes;

  return `${hours}:${minutes} ${day}.${month}.${year}`;
};
