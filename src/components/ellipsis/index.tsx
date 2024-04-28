import {memo, useEffect, useState, useCallback, useRef} from 'react';
import Taro from '@tarojs/taro';
import './index.scss';

// 使用该组件样式一定要给compoent_ellipsis_hidden 和 compoent_ellipsis_content设置line-light，不可使用父元素传递下来的lineHeight
export const Ellipsis = memo((props: any) => {

    const {row=3, expandText='展开', collapseText='收起', content='文本'} = props;

    const [expand, setExpand] = useState(false); //当前状态是否处于展开状态
    const [showContent, setShowContent] = useState(content);
    const [sid, setSid] = useState('');
    const [exceeded, setExceeded] = useState<boolean>(false);
    const [initEnd, setInitEnd] = useState<boolean>(false);

    const collapseInnerText = useRef('');

    const idRef = useCallback((res: any) => {
        if (res) {
            setSid(res.sid);
        }
    }, []);

    const allowHeight = useRef<number>(0);

    const calcEllipse = () => {
        if (!allowHeight.current) return;
        setShowContent(content);
        Taro.createSelectorQuery().select(`#${sid}`).fields({
            size: true,
        }, function(res) {
            console.log(res.height, allowHeight.current);
            if (res.height <= allowHeight.current) {
                setExceeded(true);
            } else {
                getText(0, content.length);
            }
        }).exec();
    };

    const getText = (start: number, end: number) => {
        if (!allowHeight.current) return;
        const middle:number = Math.floor((start + end) / 2);
        const text = content.slice(0, middle);
        const innerText = text + '...' + expandText;
        setShowContent(innerText);
        if (end - start <= 1) {
            setInitEnd(true);
            collapseInnerText.current = text + '...';
            setShowContent(text + '...');
            return ;
        }
        Taro.createSelectorQuery().select(`#${sid}`).fields({
            size: true,
        }, function(res) {
            if (res.height > allowHeight.current) {
                getText(start, middle);
            } else {
                getText(middle, end);
            }
        }).exec();
    };

    const handleClick = () => {
        if (expand) {
            setShowContent(collapseInnerText.current);
        } else {
            setShowContent(content);
        }
        setExpand((pre) => !pre);
    }

    useEffect(() => {
        if (sid) {
            Taro.createSelectorQuery().select(`#${sid}`).fields({
                computedStyle: ['lineHeight'],
            }, function(res) {
                allowHeight.current = (res.lineHeight.replace('px', '') - 0) * row;
                calcEllipse();
            }).exec();
        }
    }, [sid, content]);

    return (
        <div className="compoent_ellipsis" >
            <div>
                {initEnd || exceeded ? 
                    <>
                    <span className='span'>{showContent}</span>
                    {exceeded ?  '' : <span className='compoent_ellipsis_opera span' onClick={handleClick}>{expand ? collapseText : expandText}</span>}
                    </>
                : null}
            </div>
            <div className='compoent_ellipsis_hidden' ref={idRef}>{showContent}</div>
        </div>
    )
})