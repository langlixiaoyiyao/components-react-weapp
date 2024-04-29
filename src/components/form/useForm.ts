import React from 'react';

class FormStore {
    private store: any;
    private fieldEntities: Array<any>;
    private initValues: any;
    constructor() {
        this.store = {};
        this.fieldEntities = [];
        this.initValues = {};
    };

    setInitialValues = (initValues: any) => {
        this.initValues = initValues;
        this.resetFieldsValue();
    }
    getFieldValue = (name: string) => {
        return this.store[name];
    }
    getFieldsValue = () => {
        return this.store;
    }
    setFieldsValue = (newStore: any) => {
        this.store = JSON.parse(JSON.stringify(newStore));
        this.onStoreChange();
    }
    setFieldValue = (name: string, value: any) => {
        this.store[name] = value;
        this.onStoreChange(name);
    }
    registerField = (field: any) => {
        this.fieldEntities.push(field);
    }
    resetFieldsValue = () => {
        this.setFieldsValue(this.initValues);
    }
    onStoreChange = (name?: string) => {
        if (name) {
            this.fieldEntities.forEach((entity: any) => {
                if (entity.props.name === name) {
                    entity.forceUpdate();
                }
            });
        
        } else {
            this.fieldEntities.forEach((entity: any) => {
                entity.forceUpdate();
            });
        
        }
    }
    onFinish = () => {
        let flag = true;
        this.fieldEntities.forEach((entity: any) => {
            const val = this.getFieldValue(entity.props.name);
            const res = entity.validate(val);
            console.log('res', res);
            if (!res) {
                flag = false;
            }
        });
        if (!flag) {
            return false;
        } else {
            return this.getFieldsValue();
        }
    }
    
    getForm = () => {
        return {
            getFieldValue: this.getFieldValue,
            getFieldsValue: this.getFieldsValue,
            setFieldsValue: this.setFieldsValue,
            setFieldValue: this.setFieldValue,
            registerField: this.registerField,
            setInitialValues: this.setInitialValues,
            resetFieldsValue: this.resetFieldsValue,
            onFinish: this.onFinish,
        }
    }
}

export function useForm(form?: any) {
    const formRef = React.useRef<any>();
    if (!formRef.current) {
        formRef.current = form ? form : new FormStore().getForm();
    }
    return [formRef.current];
}