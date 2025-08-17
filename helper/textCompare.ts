export interface CharDiff {
  charOne: string;
  charTwo: string;
  same: boolean;
}

export interface CompareResult {
  diffs: CharDiff[];
  identical: boolean;
}

export function compareCharacters(text1: string, text2: string): CompareResult {
  if (text1 === text2) {
    return {
      diffs: [],
      identical: true,
    };
  }

  const charsOne = text1.split("");
  const charsTwo = text2.split("");
  const maxLength = Math.max(charsOne.length, charsTwo.length);

  const diffs: CharDiff[] = [];

  for (let i = 0; i < maxLength; i++) {
    const charOne = charsOne[i] || "";
    const charTwo = charsTwo[i] || "";
    diffs.push({
      charOne,
      charTwo,
      same: charOne === charTwo,
    });
  }

  return {
    diffs,
    identical: false,
  };
}
