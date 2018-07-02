import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import Table from 'rc-table';
import 'rc-table/assets/index.css';
import { Pagination } from 'antd';
import 'antd/dist/antd.css';
import 'antd/dist/antd.min.css';
import 'antd/lib/pagination/style/index.css';

export class DisplayPosts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      columns: [ /*{
        title: 'ID', dataIndex: 'id', key:'id', width: 100,
      },*/ {
          title: 'Type', dataIndex: 'type', key:'type', width: 100,
        }, {
          title: 'Weight', dataIndex: 'weight', key:'weight', width: 200,
      }, {
        title: 'Price', dataIndex: 'price', key:'price', width: 200,
      }, {
        title: 'Description', dataIndex: 'description', key:'description', width: 200,
      }, /*{
        title: 'Post Date', dataIndex: 'postdate', key:'postdate', width: 200, 
      },*/ {
        title: 'Image', dataIndex: 'image', key:'image', width: 100, 
        render: (text, record) => {
          if(text) {
            return <img  width="45px" height="45px" src={text} />;
          }
        }
      }],
        
      data: [],
    
      components: {
          body: {
            row: styled.tr`
            &:hover {
            background: #58ACFA !important;
            }`,
          },
      },
      currentPage: 1,
      begin: 0,
      end: 10
    }

    this.showTotal = this.showTotal.bind(this);
    this.handlePageChange = this.handlePageChange.bind(this);
  }
  
  componentDidMount() { 
      fetch('/api/posts')
      .then(res => res.json())
      .then(posts => {
        this.setState({ data: posts });
      });
  }  

  handlePageChange(page, pageSize) {
    // in a real app you could query the specific page from a server user list
    this.setState({ begin: (page - 1) * pageSize });
    this.setState({ end: (page - 1) * pageSize + pageSize });
    this.setState({currentPage: page});
  }

  showTotal() {
    return `Total ${this.state.data.length} items`; 
  }

  onShowSizeChange(current, size) {
    //console.log(current, pageSize);
    //pageSize = size;
  }

  onRowClicked = (record, index) => {
    //alert("row clicked!");
    //alert(`record: ${record}`);
    //alert(`Click nth(${index}) row of parent, record.name: ${record.name}`);
  };

  render() {
    return (
      <div>  
        <Table
            columns={this.state.columns} 
            data={this.state.data.slice(this.state.begin, this.state.end)} 
            //title={currentData => <div align='left'>Total: {currentData.length} items</div>}
            //footer={currentData => <div align='left'>Total: {currentData.length} items</div>}
            //showHeader={false}
            onRow={(record, index) => ({
              onClick: this.onRowClicked.bind(record, index),
            })}
            components={this.state.components}
        />
        <Pagination
          total={this.state.data.length}
          showQuickJumper
          margin={0}
          current={this.state.currentPage} 
          onChange={this.handlePageChange} 
          showTotal={(total, range) => `${range[0]}-${range[1]} of ${this.state.data.length} items`} />
      </div>  
    );
  }
}
