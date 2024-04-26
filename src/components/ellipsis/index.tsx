import React, {memo, useEffect, useState, useMemo, useCallback} from 'react';
import Taro from '@tarojs/taro';

// 使用该组件样式一定要给lineHeight
export const Ellipsis = memo((props: any) => {

    // width可以直接是设计图的尺寸
    const {width, row, expandText='展开', collapseText='收起', content='文本'} = props;

    const [expand, setExpand] = useState(false);
    const [showContent, setShowContent] = useState('');
    const [sid, setSid] = useState('');

    const idRef = useCallback((res) => {
        if (res) {
            setSid(res.sid);
        }
    }, [])

    const getText = async (start, end) => {
        const lineHeight = await new Promise((resolve, reject) => {
            Taro.createSelectorQuery().select(`#${sid}`).fields({
                computedStyle: ['lineHeight', 'fontSize'],
            }, function(res) {
                resolve({
                    lineHeight: res.lineHeight.replace('px', '') - 0,
                })
            }).exec();
        })
    }

    useEffect(() => {
        if (sid) {
            getText(0, 1);
        }
        console.log('id', sid);
    }, [sid]);

    return (
        <div className="compoent_ellipsis"  style={{lineHeight: 1.4}} ref={idRef}>
            ???????????
        </div>
    )
})