import React from 'react';
import ReactDOM from 'react-dom';
import FilterInput from '../components/FilterInput';
import Artists from '../components/Artists';


export default class FilterableArtistsContainer extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			inputValue: ''
		}

		this.collectInput = this.collectInput.bind(this);
	}

	collectInput(evt) {
		const val = evt.target.value;
		this.setState({
			inputValue: val
		})
		console.log('changed state to: ', this.state.inputValue);
	}

	render() {
		console.log('artists pre filter: ', this.props.artists);
		const filteredArtists = this.props.artists.filter(artist => {
			return artist.name.match(this.state.inputValue);
		})
		console.log('artists post filter: ', filteredArtists);
		return(
			<div>
			<FilterInput handleChange={this.collectInput} />
			<Artists  artists={filteredArtists}/>
			</div>
			)

	}

}
