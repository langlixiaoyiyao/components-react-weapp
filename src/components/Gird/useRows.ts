import { useEffect, useState } from 'react';

import type { IGirdItem, IRow } from './types';

export default function useRows(memoItems?: IGirdItem[]) {
  const [rows, setRows] = useState<IRow[]>([]);

  const getRows = (_list: IGirdItem[], _parents: IGirdItem[]) => {
    const allRows: IRow[] = [];
    let curRowCols: IRow[] = [];
    let remainSpan = 24;

    for (let i = 0; i < _list.length; i++) {
      const { items, colSpan, ...others } = _list[i];
      const defColSpan = colSpan || 24;

      const processedCur = {
        source: { ...others },
        cols: items?.length ? getRows(items, [..._parents, _list[i]]) : [],
        colSpan: defColSpan,
        parents: [..._parents],
      };

      if (remainSpan >= defColSpan) {
        curRowCols.push(processedCur);
        remainSpan -= defColSpan;
      } else {
        allRows.push({
          cols: [...curRowCols],
          colSpan: 24,
        });
        curRowCols = [processedCur];
        remainSpan = 24 - defColSpan;
      }
    }

    // 处理最后一行
    if (curRowCols.length) {
      allRows.push({
        cols: [...curRowCols],
        colSpan: 24,
      });
    }

    return allRows;
  };

  useEffect(() => {
    const formatRows: IRow[] = getRows(memoItems, []);
    setRows(formatRows);
  }, [memoItems]);

  return {
    rows,
  };
}
