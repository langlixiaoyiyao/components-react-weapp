export interface IGirdItem {
  key: string;
  colSpan?: number;
  parents?: IGirdItem[];
  [key: string]: any;
  items?: IGirdItem[];
}

export interface IRow {
  source?: IGirdItem;
  colSpan?: number;
  parents?: IGirdItem[];
  cols?: IRow[];
}
