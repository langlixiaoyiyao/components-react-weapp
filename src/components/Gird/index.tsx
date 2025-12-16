import React from 'react';
import { Col, Row } from 'antd';

import useRows from './useRows';

import type { IGirdItem, IRow } from './types';

interface GirdProps {
  className?: string;
  items: IGirdItem[],
  render: (source: IGirdItem, parents: IGirdItem[], children: React.ReactNode) => React.ReactNode
}
/**
 * 布局组件，可以配合动态表单一起使用，使用方法参考 src/containers/ProductInsp/TextCode/index.tsx
 */
export default function Gird(props: GirdProps) {
  const { items, className = '', render } = props;

  const { rows } = useRows(items);

  const innerRender = (_rows: IRow[]) => (
    <>
      {
        _rows.map((_row, _rowIndex) => (
          <Row gutter={24} key={_rowIndex}>
            {
              _row.cols.map(_col => (
                <Col span={_col.colSpan}>
                  {
                    render(
                      _col.source,
                      _col?.parents,
                      innerRender(_col.cols),
                    )
                  }
                </Col>
              ))
            }
          </Row>
        ))
      }
    </>
  );

  return (
    <div className={`comp-gird ${className}`}>
      {
        innerRender(rows)
      }
    </div>
  );
}
