export const getDaysFromToday = (date: string) => {
  const d = new Date(date);
  const today = new Date();
  const daysFromToday = Math.floor(
    (today.getTime() - d.getTime()) / (1000 * 60 * 60 * 24),
  );
  return daysFromToday;
};

export const getDaysLabel = (days: number) => {
  if (days === 0) return "Today";
  if (days <= 6) return "This week";
  if (days <= 13) return "These two weeks";
  if (days <= 29) return "This month";
  if (days <= 59) return "This quarter";
  if (days <= 365) return "This year";
  return "More than a year";
};

export const calculateMistakeScore = (mistakeCount: number) => {
  let temp = mistakeCount;
  if (mistakeCount > 8) temp = 8;
  return 4 - temp * 0.5;
};

export const calculateTimeScore = (lastRevised: string) => {
  const label = getDaysLabel(getDaysFromToday(lastRevised));
  const score = new Map([
    ["Today", 4],
    ["This week", 4],
    ["These two weeks", 3],
    ["This month", 2],
    ["This quarter", 1],
    ["This year", 0.5],
    ["More than a year", 0],
  ]);
  return score.get(label);
};

export const calculateRevisionScore = (totalRevisions: number) => {
  let temp = totalRevisions;
  if (totalRevisions > 10) temp = 10;
  return temp * 0.2;
};

export const calculateScore = (
  revisions: number,
  mistakes: number,
  date: string,
) => {
  let tempScore = 0;
  tempScore += calculateRevisionScore(revisions);
  tempScore += calculateMistakeScore(mistakes);
  tempScore += calculateTimeScore(date);
  return tempScore;
};
