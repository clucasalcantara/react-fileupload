import React, { Component } from 'react';
import firebase from 'firebase';
import FileUploader from 'react-firebase-file-uploader';

class ProfilePage extends Component {
    config = {
        apiKey: "AIzaSyAN1ClZNxHTcjNDts-cO9APbxD5hjuAfug",
        authDomain: "awesome-firebase-33c55.firebaseapp.com",
        databaseURL: "https://awesome-firebase-33c55.firebaseio.com",
        storageBucket: "awesome-firebase-33c55.appspot.com"
    };

    state = {
        username: '',
        avatar: '',
        isUploading: false,
        progress: 0,
        avatarURL: ''
    };

  handleChangeUsername = (event) => this.setState({username: event.target.value});
  handleUploadStart = () => this.setState({isUploading: true, progress: 0});
  handleProgress = (progress) => this.setState({progress});
  handleUploadError = (error) => {
      this.setState({isUploading: false});
      console.error(error);
  }
  handleUploadSuccess = (filename) => {
      filename = 'c1p1.png';
      this.setState({avatar: filename, progress: 100, isUploading: false});
      firebase.storage().ref('images').child(filename).getDownloadURL().then(url => this.setState({avatarURL: url}));
  };
  componentWillMount() {
      firebase.initializeApp(this.config);
  }
  render() {
    return (
      <div>
        <form>
          {this.state.isUploading &&
            <p>Progress: {this.state.progress}</p>
          }
          {this.state.avatarURL &&
            <img src={this.state.avatarURL} />
          }
          <FileUploader
            accept="image/*"
            name="avatar"
            storageRef={firebase.storage().ref('images')}
            onUploadStart={this.handleUploadStart}
            onUploadError={this.handleUploadError}
            onUploadSuccess={this.handleUploadSuccess}
            onProgress={this.handleProgress}
          />
          <button type="submit" />
        </form>
      </div>
    );
  }
}

export default ProfilePage;
