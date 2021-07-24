const parseLadderData = (data) => {
  return data.split("\n").map((line) => {
    const firstSpaceIndex = line.indexOf(" ");

    return {
      answer: line.substring(0, firstSpaceIndex),
      clue: line.substring(firstSpaceIndex + 1),
    };
  });
};

const getMaxWordLength = (ladder) =>
  ladder.reduce((longest, current) => {
    if (current.answer.length > longest.answer.length) {
      return current;
    }

    return longest;
  }).answer.length;

export { parseLadderData, getMaxWordLength };
