export const replaceUnderScoreWithWhiteSpace = (str) => {
  if (!str) return;
  return str.replace(/_/g, " ");
};
