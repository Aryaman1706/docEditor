import React, { useState } from 'react';
import axios from 'axios';

const Add = (props) => {
    const [file, setFile] = useState('');
    const [title, setTitle] = useState('');

    const onChange = e => {
        setFile(e.target.files[0]);
      };

      const onChangeTitle = (e) => {
        setTitle(e.target.value);
      };
    
      const onSubmit = async e => {
        if(file && title){
          props.history.push('/');
          const formData = new FormData();
          formData.append('file', file);
          formData.append('title', title);
            const res = await axios.post('/api/upload', formData, {
              headers: {
                'Content-Type': 'multipart/form-data'
              }
            });
        };
        e.preventDefault();
      };

    return (
      <div className="valign-wrapper" style={{height: "90%", width: "100%", position: "absolute"}}>
        <div className="container">
        <h3 className='center-align'>Create a New Document...</h3>
          <br></br>
          <div className='row'>
          <br></br>
              <form onSubmit={onSubmit}>
                <div className="input-field col s12">
                  <input 
                  name="title" 
                  type="text"
                  onChange={onChangeTitle}
                  />
                  <label htmlFor="title">Title</label>
                </div>
                <div className="input-field col s12">
                  <input 
                  name="file" 
                  type="file"
                  onChange={onChange}
                  />
                </div>

                <div className='center'>
                <input 
                type='submit' 
                className='btn blue'
                />
                </div>

              </form>
          </div>
        </div>
      </div>
    )
}

export default Add
