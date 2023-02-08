import React from 'react'
import NavHeader  from "../components/NavHeader"

function BaseLayout(props) {
  return (
    <>
      <NavHeader username={props.username}/>
      <main>{props.children}</main>
    </>
  )
}

export default BaseLayout
