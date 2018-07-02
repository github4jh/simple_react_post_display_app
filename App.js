import React, { Component } from 'react';
import { DisplayPosts } from './DisplayPosts';

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      type: '',
      weight: '',
      price: '',
      description: '',
      refresh: 'false'
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(e) {
    const target = e.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleSubmit(e) {
    e.preventDefault();

    const data = new FormData();
    data.append('file', this.uploadInput.files[0]);
    data.append('filename', 'pic.jpg');
    data.append('type', this.state.type);
    data.append('weight', this.state.weight);
    data.append('price', this.state.price);
    data.append('description', this.state.description);
    data.append('email', 'hello@hotmail.com');

    fetch('/api/postAd', {
      method: "POST",
      body: data
    })
    .then(function(response) {
      response.json().then((body) => {
      });
    })
    this.setState({refresh: !this.state.refresh});
  }

  render() {
    return (
      <div className="App">
        <div>
          <h1>Messages</h1>
          <DisplayPosts />
        </div>
        <h2>Post a message</h2>
        <form onSubmit={this.handleSubmit}>
          <table className="Posts">
            <tr>
              <td>
                type
              </td>
              <td>
                <input name="type" value={this.state.type} onChange={this.handleChange} />
              </td>
            </tr>
            <tr>
              <td>
                weight
              </td>
              <td>
                <input name="weight" value={this.state.weight} onChange={this.handleChange} />
              </td>
            </tr>
            <tr>
              <td>
                price
              </td>
              <td>
                <input name="price" value={this.state.price} onChange={this.handleChange} />
              </td>
            </tr>
            <tr>
              <td>
                description
              </td>
              <td>
                <textarea rows="4" cols="50" name="description" value={this.state.description} onChange={this.handleChange}>
                </textarea>
              </td>
            </tr>                        
            <tr>
              <td>
                Uploade image
              </td>
              <td>
                <input ref={(ref) => { this.uploadInput = ref; }} type="file" />
              </td>
            </tr>
            <tr colspan='2'>
              <input type="submit" value="Submit" />      
            </tr>
          </table>  
        </form>
      </div>
    );
  }
}

export default App;
