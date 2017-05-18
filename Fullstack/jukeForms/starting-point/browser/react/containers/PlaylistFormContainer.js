import React from 'react';
import { Link } from 'react-router';
import NewPlaylist from '../components/NewPlaylist';
import axios from 'axios';

class PlaylistFormContainer extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      inputValue: ''
    }
    this.edited = false;
    this.disabled = false;
    this.tooLong = false;
    this.empty = false;
    this.collectInput = this.collectInput.bind(this);
    this.submitInput = this.submitInput.bind(this);
  }

  collectInput(evt) {
    this.edited = true;
		const val = evt.target.value;

    this.tooLong = val.length > 16;
    this.empty = (!val.length && this.edited)
    this.disabled = this.tooLong || this.empty

		this.setState({
			inputValue: val
		});


	}



  submitInput(evt) {
    evt.preventDefault();
    console.log(this.state.inputValue);
    this.setState({
      inputValue: ''
    })

    axios.post('/api/playlists', {name : this.state.inputValue})
      .then(res => res.data)
      .then(result => {
        console.log('RESULT!', result)
      })


  }

  render() {
    return(
      <NewPlaylist changeHandler={this.collectInput} submitHandler={this.submitInput} value={this.state.inputValue} disabled={this.disabled} tooLong={this.tooLong} empty={this.empty}/>
    )
  }
}


export default PlaylistFormContainer
