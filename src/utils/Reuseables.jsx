export const convertMinutesToHours = (n) => {
  const num = n;
  const hours = num / 60;
  const rhours = Math.floor(hours);
  const minutes = (hours - rhours) * 60;
  const rminutes = Math.round(minutes);
  return `${rhours}h ${rminutes}m`;
};

export const formatDate = (date) => {
  const year = date?.slice(0, 4);
  const month = date?.slice(5, 7);
  const day = date?.slice(8);
  return `${month}/${day}/${year}`;
};
