import './App.css';
import { Component } from 'react';
import axios from 'axios';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errors: {},
      form: {
        title: "",
        image: ""
      }
    }
  }

  handleChange = (event) => {
    const data = this.state.form;
    data[event.target.name] = event.target.value;
    this.setState({ ...this.state, form: data });
  }
  handelChooseImage = (event) => {
    this.setState({ ...this.state, form: { ...this.state.form, image: event.target.files[0] } });
  }

  handleUpload = (event) => {
    event.preventDefault();
    this.resetErrors();
    const errors = this.validation();
    this.upload(errors);
  }

  resetErrors = () => {
    this.setState({ ...this.state, errors: {} });
    return;
  }

  upload = (errors) => {
    if (Object.keys(errors).length === 0) {
      const data = this.state.form;
      const formData = new FormData();
      formData.append("image", data.image);
      formData.append("title", data.title);
      axios.post("/xxx", formData);
      return;
    }

    this.setState({ ...this.state, errors })
  }

  validation = event => {
    const data = this.state.form;
    let errors = {};
    if (data.title.trim() === "" || data.title.trim().length > 20) {
      errors.title = "Wrong title";
    }
    if (data.image === "" || data.image?.name?.length > 100) {
      errors.image = "Wrong image";
    }
    return errors;
  }

  render() {
    return (
      <div className="container mt-4">
        <div className="row mx-auto">
          <div className="col-8 mx-auto rounded bg-white pt-3 p-5">
            <h3>UPLOADS</h3>
            <form encType="multipart/form-data" onSubmit={this.handleUpload}>
              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" onChange={this.handleChange} placeholder="Title" className="form-control" name="title" id="title" aria-describedby="titleHelp" />
                {
                  this.state.errors.title ?
                    <p className="text-danger">{this.state.errors.title}</p> : ""
                }
              </div>
              <div className="mb-3">
                <label htmlFor="file" className="form-label">Image</label>
                <input type="file" onChange={this.handelChooseImage} name="image" className="form-control" id="file" />
                {
                  this.state.errors.image ?
                    <p className="text-danger">{this.state.errors.image}</p> : ""
                }
              </div>
              <button type="submit" className="btn btn-primary">Submit</button>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
