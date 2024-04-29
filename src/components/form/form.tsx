import React, {memo, useEffect} from 'react';
import {Form as TaroForm} from '@tarojs/components';
import FormContext from './context';
import {useForm} from './useForm';

type FormProps = {
    initialValues?: any;
    form?: any;
    onFinish?: (e: any,values: any) => void;
    children: React.ReactNode;
};

export const Form = memo((props: FormProps) => {

    const [form] = useForm(props.form);

    useEffect(() => {
        if (props.initialValues) {
            form.setInitialValues(props.initialValues);
        }
    }, []);

    const handleSubmit = (e: any) => {
        if (props.onFinish) {
            const val = form.onFinish();
            if (val !== false) {
                props.onFinish(e, val);
            }
        }
    }

    const handleReset = (e: any) => {
        e.preventDefault();
        form.resetFieldsValue();
    }

    // 这里的provider的value是永远不会改变的
    return <FormContext.Provider value={form}>
    <TaroForm onSubmit={handleSubmit} onReset={handleReset}>
        {props.children}
    </TaroForm>;
    </FormContext.Provider>
});

