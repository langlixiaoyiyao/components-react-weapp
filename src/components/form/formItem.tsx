import React, {memo} from 'react';
import FormContext from './context';

import './styles/formItem.scss'

type FormItemProps = {
    name: string;
    children: React.ReactElement;
    rules?: Array<any>;
};

type FormItemState = {
    error: boolean;
    errorMessage: string;
};

export class FormItem extends React.Component<FormItemProps, FormItemState> {

    constructor(props: FormItemProps) {
        super(props);
        this.state = {
            error: false,
            errorMessage: '',
        }
    }

    componentDidMount(): void {
        const context = this.context as any;
        context.registerField(this);
    }

    validate = (val: any) => {
        const rules = this.props.rules || [];
        let flag = true;
        for(const rule of rules) {
            if (rule?.required) {
                const error = (val === undefined || val === '') ? true : false;
                console.log('error', error);
                if (error) {
                    this.setState({
                        error: true,
                        errorMessage: rule.message || '必填',
                    });
                    flag = false;
                    break;
                } else {
                    console.log('执行次数');
                    this.setState({
                        error: false,
                        errorMessage: '',
                    });
                }
            }
            if (rule?.pattern) {
                const error = rule.pattern.test(val);
                if (!error) {
                    this.setState({
                        error: true,
                        errorMessage: rule.message || '格式错误',
                    });
                    flag = false;
                    break;
                } else {
                    this.setState({
                        error: false,
                        errorMessage: '',
                    });
                }
            }
        };
        return flag;
    }

    render() {
        const context = this.context as any;
        return <div className="component_form_item">
            {React.cloneElement(this.props.children, Object.assign({}, this.props.children.props, {
            name: this.props.name,
            value: context.getFieldValue(this.props.name),
            onChange: (val: any) => {
                this.validate(val);
                context.setFieldValue(this.props.name, val);
            },
        }), null)}
        {
            this.state.error ? <div className="component_form_item_error">{this.state.errorMessage}</div> : null
        }
        </div>
    }
}

