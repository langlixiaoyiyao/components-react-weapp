import React, { useState, useMemo, useEffect } from 'react';

import useResizeObserver from '@/hooks/useResizeObserver';

import './index.less';

interface RespListProps {
  list: any[];
  itemWidth: number;
  itemML: number;
  itemMT?: number;
  renderItem: (v: any) => React.ReactNode;
  colKey?: string;
}

/**
 * @description 响应式列表(通过给定的itemWidth 计算出每行展示的个数，如果有留白，则自动扩充每个item的宽度)
 * @param list 列表
 * @param itemWidth 每个item的宽度
 * @param itemML 每个item的marginLeft
 * @param renderItem 渲染item
 * @param itemMT 每个item的marginTop
 */
export default function RespList(props: RespListProps) {
  const {
    list = [], itemWidth, itemML, itemMT = 0, renderItem, colKey = 'id',
  } = props;

  const [fillList, setFillList] = useState([]); // 填充后的列表
  const contEleId = useMemo(() => `resp-list-${Math.random()}`, []); // 容器id
  const itemStyle = useMemo(() => ({
    width: `${itemWidth}px`,
    marginLeft: `${itemML}px`,
    marginTop: `${itemMT}px`,
  }), []);
  const rect = useResizeObserver(document.getElementById(contEleId));

  const calcList = () => {
    let maxCol = 0;
    let newList: any[] = [];
    if (list?.length && rect) {
      const len = list.length;
      maxCol = Math.floor(rect.width / (itemWidth + itemML));
      const seat = (len % maxCol) ? maxCol - (len % maxCol) : 0;
      newList = [...list, ...Array(seat).fill(null)];
    }
    return {
      respList: newList,
      maxCol,
    };
  };

  useEffect(() => {
    const { respList } = calcList();
    setFillList(respList);
  }, [list, rect?.width]);

  return (
    <div className="comp-resp-list" id={contEleId}>
      <div
        className="comp-resp-list-wrap"
        style={{
          marginTop: `-${itemMT}px`,
          marginLeft: `-${itemML}px`,
        }}
      >
        {
          fillList?.map((_v) => {
            if (!_v) {
              return <div key={_v} className="comp-resp-list-item" style={itemStyle} />;
            }
            return (
              <div
                style={itemStyle}
                className="comp-resp-list-item"
                key={_v?.[colKey] || _v}
              >
                {renderItem(_v)}
              </div>
            );
          })
        }
      </div>
    </div>
  );
}
