import React from 'react'

function Alert(props) {
        
    return (
      <div style = {{height:"60px"}}>
        {props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fixed-bottom fade show`} role="alert">
        {props.alert.msg}
      </div>}
      </div>
    )
  }
export default Alert
