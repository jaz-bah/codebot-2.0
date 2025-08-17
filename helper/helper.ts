import { ICharDiff, ICompareResult } from "@/types/global.type";

export function toFraction(decimal: number): string {
  if (decimal === 0) return "0";

  const tolerance = 1.0e-6;
  let h1 = 1,
    h2 = 0,
    k1 = 0,
    k2 = 1;
  let b = decimal;

  do {
    const a = Math.floor(b);
    const aux = h1;
    h1 = a * h1 + h2;
    h2 = aux;
    const aux2 = k1;
    k1 = a * k1 + k2;
    k2 = aux2;
    b = 1 / (b - a);
  } while (Math.abs(decimal - h1 / k1) > decimal * tolerance);

  return `${h1}/${k1}`;
}

export function textTransform(text: string, formate: string) {
  if (formate == "uppercase") {
    return text.toUpperCase();
  } else if (formate == "capitalize") {
    return text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  } else if (formate == "lowercase") {
    return text.toLowerCase();
  } else if (formate == "camelcase") {
    return text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join("");
  } else if (formate == "kebabcase") {
    return text
      .split(" ")
      .map((word) => word.toLowerCase())
      .join("-");
  } else if (formate == "snakecase") {
    return text
      .split(" ")
      .map((word) => word.toLowerCase())
      .join("_");
  }
  return text;
}

export function compareCharacters(
  text1: string,
  text2: string
): ICompareResult {
  if (text1 === text2) {
    return {
      diffs: [],
      identical: true,
    };
  }

  const charsOne = text1.split("");
  const charsTwo = text2.split("");
  const maxLength = Math.max(charsOne.length, charsTwo.length);

  const diffs: ICharDiff[] = [];

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

export const handleDownload = async (fileUrl: string, fileName: string) => {
  try {
    const res = await fetch(fileUrl);
    if (!res.ok) throw new Error("Failed to download file");

    const blob = await res.blob();
    const url = window.URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = fileName.toLowerCase().replace(/\s+/g, '-') + ".zip";
    document.body.appendChild(a);
    a.click();
    a.remove();

    window.URL.revokeObjectURL(url);
  } catch (err) {
    console.error(err);
  }
};

export function extractScssTree(aiResponse: string): string {
  const regex = /```(?:scss|css)?([\s\S]*?)```/i;
  const match = aiResponse.match(regex);
  return match ? match[1].trim() : aiResponse.trim();
}

