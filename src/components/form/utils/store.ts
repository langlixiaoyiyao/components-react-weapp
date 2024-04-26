class Store {
    private values: object = {};
    constructor(initValues: object | undefined) {
        if (initValues) {
            this.values = JSON.parse(JSON.stringify(initValues));
        }
    }
    getFieldsValue() {
        return this.values;
    }
    getFieldValue(name: string) {
        return this.values[name];
    }
    setFieldsValue(values: object | undefined) {
        if (values) {
            this.values = JSON.parse(JSON.stringify(values));
        } else {
            this.values = {};
        }
    }
    setFieldValue(name: string, value: any) {
        this.values[name] = value;
    }
}

export default Store;