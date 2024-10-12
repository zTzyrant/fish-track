export const validateImageUrl = (url) => {
  const urlRegex = /^(http|https|ftp):\/\/[^\s/$.?#].[^\s]*$/;

  return urlRegex.test(url);
};
