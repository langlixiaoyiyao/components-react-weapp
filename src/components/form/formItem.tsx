import React, { memo, useEffect, useContext } from 'react';
import FormContext from './contexts/formContext';
import Store from './utils/store';

type FormItemProps = {
    children?: React.ReactNode;
    name: String;
};


const FormItem = memo((props: FormItemProps) => {

    const context = useContext<Store>(FormContext);
    
    return (
        <div className="custom_form_item">
            {
                props.children ? React.cloneElement(props.children, {
                    value: context.getFieldValue(props.name)
                }, null) : ''
            }
        </div>
    )
});
