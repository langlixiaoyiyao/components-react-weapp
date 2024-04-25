import React, { memo, useEffect, useState } from 'react';
import { Form as TaroForm } from '@tarojs/components';
import FormContext from './contexts/formContext';
import Store from './utils/store';

type FormProps = {
    initValues?: Object;
    onSubmit?: Function;
    onReset?: Function;
    children?: React.ReactNode;
};


const Form = memo((props: FormProps) => {

    const { initValues, onSubmit } = props;

    const [store, setStore] = useState<Store>(() => {
        return new Store(initValues);
    });
    
    return (
        <FormContext.Provider value={store}>
            <TaroForm onSubmit={(e) => {
                onSubmit && onSubmit(e, store.getFieldsValue());
            }} onReset={() => {
                store.setFieldsValue(initValues);
            }}>
                {props.children}
            </TaroForm>
        </FormContext.Provider>
    )
});
