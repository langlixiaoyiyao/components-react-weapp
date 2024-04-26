import Form from '@/components/form/form';
import FormItem from '@/components/form/formItem';
import { Ellipsis } from '@/components';
import { useLoad } from '@tarojs/taro'
import { Button, Input as TaroInput } from '@tarojs/components';
import './index.scss';


const Input = (props:any) => {
  console.log('Input', props);
  return (
    <TaroInput {...props} onChange={(e) => {props.onChange(e.detail.value);}} />
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
  })

  return (
    <div>
      <Form onSubmit={(e, value) => {console.log(value);}} initValues={{username: 'sb', choose: true}}>
      <FormItem  name="username">
        <Input />
      </FormItem>
      <FormItem  name="choose">
        <CheckBox />
      </FormItem>
      <Button formType='reset'>重置</Button>
      <Button formType='submit'>提交</Button>
    </Form>
    <Ellipsis />
    </div>
    
  )
}
