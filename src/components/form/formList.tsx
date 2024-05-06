import React, {memo} from 'react';
import { useForm } from './useForm';
import FormContext from './context';

type FormListProps = {
    name: string;
    value?: Array<any>;
    onChange?: (value: Array<any>) => void;
    children?: (field: Array<any>, {
        add
    }) => React.ReactNode;
};

export const FormList = memo((props: FormListProps) => {
    const [form] = useForm();

    return <FormContext.Provider value={form}>
        
    </FormContext.Provider>
    
});