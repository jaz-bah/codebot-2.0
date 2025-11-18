export interface IParams {
  params: Promise<{ id: string }>;
}

export interface ICodeData {
  language: string;
  code: string;
}

export interface ITableData {
  _id: string;
  name: string;
  note: string;
  url: string;
}

export interface ICharDiff {
  charOne: string;
  charTwo: string;
  same: boolean;
}

export interface ICompareResult {
  diffs: ICharDiff[];
  identical: boolean;
}

export interface ICommandCard {
  title: string;
  commands: ICommand[];
}

export interface ICommand {
  cmd: string;
  desc: string;
}
