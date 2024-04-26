import React, { memo, useState, useContext } from 'react';
import FormContext from './contexts/formContext';
import Store from './utils/store';

type FormItemProps = {
    children: React.ReactElement<any, string | React.JSXElementConstructor<any>>;
    name: string;
};


const FormItem = (props: FormItemProps) => {

    console.log('FormItem', props);

    const [flag, setFlag] = useState(false);

    const context = useContext<Store>(FormContext);
    const childrenProps: any = {
        ...props.children.props,
        value: context.getFieldValue(props.name),
        onChange: (val: any) => {
            setFlag((pre) => !pre);
            context.setFieldValue(props.name, val);
        }
    };
    
    return (
        <div className="custom_form_item">
            {
                props.children ? React.cloneElement(props.children, childrenProps, null) : ''
            }
        </div>
    )
};

export default FormItem;
