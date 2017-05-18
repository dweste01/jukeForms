import React from 'react';


const NewPlaylist = (props) => {
  return (


    <div className="well">
      <form className="form-horizontal" onSubmit={props.submitHandler}>
        <fieldset>
          <legend>New Playlist</legend>
          <div className="form-group">
            <label className="col-xs-2 control-label">Name</label>
            <div className="col-xs-10">
              <input className="form-control" type="text" onChange={props.changeHandler} value={props.value}/>
              {props.tooLong ?
                <div className="alert alert-warning">Please enter a name less than 16 characters</div>
                : props.empty ?
                  <div className="alert alert-warning">Please enter a name</div>
                  : null}
            </div>
          </div>
          <div className="form-group">
            <div className="col-xs-10 col-xs-offset-2">
              <button type="submit" className="btn btn-success" disabled={props.disabled}>Create Playlist</button>
            </div>
          </div>
        </fieldset>
      </form>
    </div>
  )
}


export default NewPlaylist
