import React from 'react';
import { Link } from 'react-router';
import Songs from './Songs';
import axios from 'axios';

class Playlist extends React.Component {
	constructor(props) {
		super(props);
		this.id = this.props.routeParams.playlistId;
		this.state = {
			playlist: {}
		}
	}

	componentDidMount() {
		axios.get(`/api/playlists/${this.id}`)
		.then(result => this.setState({playlist: result.data}))
	}

	componentWillReceiveProps(newProps) {
		if (this.props != newProps) {
			axios.get(`/api/playlists/${newProps.routeParams.playlistId}`)
			.then(result => this.setState({playlist: result.data}))
		}
	}

	render() {
		return (<div>
				  <h3>{ this.state.playlist.name }</h3>
				  <Songs songs={this.state.playlist.songs} />
				  { this.state.playlist.songs && !this.state.playlist.songs.length && <small>No songs.</small> }
				  <hr />
				</div>) 
	}

}

export default Playlist;