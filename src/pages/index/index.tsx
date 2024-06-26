import {Form, FormItem} from '@/components';
import { Ellipsis } from '@/components';
import { useLoad } from '@tarojs/taro'
import { Button, Input as TaroInput } from '@tarojs/components';
import './index.scss';


const Input = (props:any) => {
  console.log('Input', props);
  return (
    <TaroInput {...props} onChange={(e) => {props.onChange(e.detail.value);return e.detail.value}} />
  )
};

const CheckBox = (props: any) => {
  return (
    <div style={{width: '20px', height: '20px', border: '1px solid #eee', backgroundColor: props.value ? 'blue': '',}} onClick={() => {
      console.log('click');
      props.onChange(!props.value);
    }}>
    </div>
  )
}

export default function Index() {

  useLoad(() => {
    console.log('Page loaded.')
  });

  const handleSubmit = (e: any, values: any) => {
    console.log('提交事件触发了', values);
  }

  return (
    <div>
      <Form onFinish={handleSubmit} initialValues={{username: 'hh', choose: true}}>
      <FormItem  name="username" rules={[{required: true}, {pattern: new RegExp(/^0$/)}]}>
        <Input />
      </FormItem>
      <FormItem  name="choose">
        <CheckBox />
      </FormItem>
      <Button formType='reset'>重置</Button>
      <Button formType='submit'>提交</Button>
    </Form>
    <div style={{height: '100vh', backgroundColor: 'green', marginBottom: '800rpx'}}></div>
    <Ellipsis content="提交提交提交提交提交提交提交提交提交提交、提交提交提交提交提交提交提交提交提交提交、提交提交提交提交提交提交提交提交提交提交" />
    </div>
    
  )
}
