export function getTimeDifferenceInFullWords(timestamp: string) {
  const currentTimestamp = new Date();
  const diff = currentTimestamp.getTime() - new Date(timestamp).getTime();

  const msInSecond = 1000;
  const msInMinute = msInSecond * 60;
  const msInHour = msInMinute * 60;
  const msInDay = msInHour * 24;

  const elapsedDays = Math.floor(diff / msInDay);
  const elapsedHours = Math.floor((diff % msInDay) / msInHour);
  const elapsedMinutes = Math.floor((diff % msInHour) / msInMinute);
  const elapsedSeconds = Math.floor((diff % msInMinute) / msInSecond);

  if (elapsedDays > 0) {
    return `${elapsedDays === 1 ? elapsedDays + " day" : elapsedDays + " days"}`;
  } else if (elapsedHours > 0) {
    return `${elapsedHours === 1 ? elapsedHours + " hour" : elapsedHours + " hours"}`;
  } else if (elapsedMinutes > 0) {
    return `${elapsedMinutes === 1 ? elapsedMinutes + " minute" : elapsedMinutes + " minutes"}`;
  } else {
    return `${elapsedSeconds === 1 ? elapsedSeconds + " second" : elapsedSeconds + " seconds"}`;
  }
}
export function getTimeDifferenceInShortWords(timestamp: string) {
  const currentTimestamp = new Date();
  const diff = currentTimestamp.getTime() - new Date(timestamp).getTime();

  const msInSecond = 1000;
  const msInMinute = msInSecond * 60;
  const msInHour = msInMinute * 60;
  const msInDay = msInHour * 24;

  const elapsedDays = Math.floor(diff / msInDay);
  const elapsedHours = Math.floor((diff % msInDay) / msInHour);
  const elapsedMinutes = Math.floor((diff % msInHour) / msInMinute);
  const elapsedSeconds = Math.floor((diff % msInMinute) / msInSecond);

  if (elapsedDays > 0) {
    return `${elapsedDays + "d"}`;
  } else if (elapsedHours > 0) {
    return `${elapsedHours + "h"}`;
  } else if (elapsedMinutes > 0) {
    return `${elapsedMinutes + "m"}`;
  } else {
    return `${elapsedSeconds + "s"}`;
  }
}
