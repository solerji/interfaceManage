import { Form, Input, DatePicker, InputNumber, Select } from 'antd';
import React, { Component } from 'react';
import EditableFormTable from './editTable'
import style from './edit.css'

const { Option } = Select

  class editInstructionForm extends Component {
    editInstructionForm = Form.create({})(editInstructionForm);
    constructor (props) {
        super(props)
        this.state = {
          labelList: [
            {
              name: '接口名称',
              type: 'char'
            },
            {
              name:'接口类型',
              type: 'char'
            },
            {
              name: '创建时间',
              type: 'date'
            },
            {
              name: '创建人',
              type: 'char'
            },
            {
              name:'接口描述',
              type: 'char'
            }
          ],
          requestList:[],
          responseList: []
        }
    }

    handleSubmit = e => {
      e.preventDefault();
      this.props.form.validateFields((err, values) => {
        if (!err) {
          console.log('Received values of form: ', values);
        }
      });
    };

    switchItem (item) {
      const type = item.type;
      switch (type) {
        case 'int':
          return <InputNumber style={{ width: '100%' }} />
        case 'char':
          return <Input />
        case 'date':
          return <DatePicker style={{ width: '100%' }} />
        case 'select':
          return (
            <Select>
            {
              item.options.map((option, index) => {
                return (<Option key={index} value={option}>{option}</Option>)
              })
            }
            </Select>
          )
        default:
          return <Input />
    }
    }

    render() {
      return (
        <div>
        <span className={ style.font }>主要信息设置</span>
        <div>
        <Form layout="inline" onSubmit={this.handleSubmit}>
        {
            this.state.labelList.map((item, index) => {
                return (
                    <Form.Item
                    key={ index }
                    label= {item.name }>
                   {(this.switchItem(item))}
                </Form.Item>
                )
            })
        }
        </Form>
        </div>
        <div className={ style.distance }>
        <span className={ style.font }>请求参数设置</span>
        <EditableFormTable></EditableFormTable>
        </div>
        <div className={ style.distance }>
        <span className={ style.font }>返回参数设置</span>
        <EditableFormTable></EditableFormTable>
        </div>
        </div>
      );
    }
  }

  export default editInstructionForm
