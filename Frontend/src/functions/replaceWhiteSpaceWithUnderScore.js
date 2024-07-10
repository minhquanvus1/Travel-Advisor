export const replaceWhiteSpaceWithUnderScore = (str) => {
  if (!str) return;
  return str.replace(/ /g, "_");
};
