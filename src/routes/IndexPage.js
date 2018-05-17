import React from 'react';
import { connect } from 'dva';
import { Button, Modal, Form, Input, Radio,Table,Checkbox } from 'antd';
const CheckboxGroup = Checkbox.Group;
const columns = [
  { title: 'Name', dataIndex: 'name', key: 'name' },
  { title: 'Age', dataIndex: 'id', key: 'id' },
  { title: 'Address', dataIndex: 'address', key: 'address' },
  { title: 'Action', dataIndex: '', key: 'x', render: () => <a href="javascript:;">Delete</a> },
];
const data = [
  { key: 1, name: 'John Brown', id: 1, address: 'New York No. 1 Lake Park', description: 'My name is John Brown, I am 32 years old, living in New York No. 1 Lake Park.' },
  { key: 2, name: 'Jim Green', id: 2, address: 'London No. 1 Lake Park', description: 'My name is Jim Green, I am 42 years old, living in London No. 1 Lake Park.' },
  { key: 3, name: 'Joe Black', id: 3, address: 'Sidney No. 1 Lake Park', description: 'My name is Joe Black, I am 32 years old, living in Sidney No. 1 Lake Park.' },
];
const plainOptions = ['Apple', 'Pear', 'Orange'];
class IndexPage extends React.Component {
  constructor(props){
    super(props)
    this.state={
      checkedList: {},
      indeterminate: true,
      checkAll:{

      },
    }
  }
  onChange = (checkedList,record) => {
    //checkedList可以获取全部的被选择的复选框，
    let newfetch = this.state.checkedList;
    newfetch[record.id] = checkedList
    //{
    //  id:[id1,id2]
    //}
    let { checkAll} = this.state;
    checkedList.length === plainOptions.length?checkAll[record.id]=true:false
    this.setState({
      checkedList:newfetch,
      indeterminate: !!checkedList.length && (checkedList.length < plainOptions.length),
      checkAll,
      fetchData:newfetch
    })
  }
  onCheckAllChange = (e,record) => {
    let newfetch = this.state.checkedList;
    newfetch[record.id] = e.target.checked ? plainOptions : []
    let { checkAll} = this.state;
    checkAll[record.id] = e.target.checked
    this.setState({
      checkedList:newfetch,
      indeterminate: false,
      checkAll
    });
  }
  render() {
    console.log(this.state.checkedList)
    return (
      <div>
          <Table
            columns={columns}
            expandedRowRender={record =>{
              return(<div>
                      <div style={{ borderBottom: '1px solid #E9E9E9' }}>
                        <Checkbox
                          indeterminate={this.state.indeterminate}
                          onChange={(e)=>this.onCheckAllChange(e,record)}
                          checked={record.id in this.state.checkAll?this.state.checkAll[record.id]:false }
                        >
                          Check all
                        </Checkbox>
                      </div>
                      <br />
                      <CheckboxGroup options={plainOptions} value={record.id in this.state.checkedList?this.state.checkedList[record.id]:null} onChange={(e)=>this.onChange(e,record)} />
                    </div>)
                    }
              }
            dataSource={data}
          />
      </div>
    );
  }
}


export default IndexPage;
