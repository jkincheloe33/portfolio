// gets the ID and concats to the embed URL format
export const getEmbedLink = (autoplay, url) => {
  const regExp = /^.*(?:(?:youtu\.be\/|v\/|vi\/|u\/\w\/|embed\/)|(?:(?:watch)?\?v(?:i)?=|&v(?:i)?=))([^#&?]*).*/;
  const embed = url.match(regExp);
  if (!embed) {
    console.warn(
      'The YouTube component on this page cannot parse the provided url.'
    );
    return;
  }
  return `https://www.youtube.com/embed/${embed[1]}?controls=1${
    autoplay ? '&autoplay=1' : ''
  }`;
};
