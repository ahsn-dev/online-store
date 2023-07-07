export const formatDate = (dateString: string) => {
  const date = new Date(dateString);
  const formattedDate = date.toLocaleDateString("fa");
  return formattedDate;
};

export const formatDateNumber = (dateNumber: number) => {
  const date = new Date(dateNumber);
  const formattedDate = date.toLocaleDateString("fa");
  return formattedDate;
};
