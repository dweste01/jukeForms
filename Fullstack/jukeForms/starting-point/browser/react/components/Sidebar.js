import React from 'react';
import { Link } from 'react-router';
import Playlist from './Playlist';

const Sidebar = (props) => {
  return (
    <sidebar>
      <img src="juke.svg" className="logo" />
      <section>
        <h4 className="menu-item">
          <Link to='/albums'>ALBUMS</Link>
        </h4>
      </section>
      <section>
        <h4 className="menu-item">
          <Link to='/artists'>ARTISTS</Link>
        </h4>
      </section>
      <hr />
      <section>
        <h4>
          <Link className="btn btn-primary btn-block" to="/newplaylist">
            <span className="glyphicon glyphicon-plus"></span> PLAYLIST
          </Link>
          <hr />
          <ul className="list-unstyled">
          {props.playlists.map((playlist, idx) => {
            return (<li key={idx} className="playlist-item menu-item">
              <Link to={`/playlists/${playlist.id}`}>{playlist.name}</Link>
            </li>)
          })}
          </ul>
        </h4>
      </section>




    </sidebar>
  );
}

export default Sidebar;
