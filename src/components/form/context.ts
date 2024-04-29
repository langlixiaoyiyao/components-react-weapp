import React, {createContext} from 'react';

const FormContext = createContext({
    getFieldValue: () => {},
    getFieldsValue: () => {},
    setFieldsValue: () => {},
    setFieldValue: () => {},
    registerField: () => {},
    setInitialValues: () => {},
    resetFieldsValue: () => {},

});

export default FormContext;