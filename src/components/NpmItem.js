import React from 'react'

const NpmItem = ({ item, radioValueHandler}) => {

    return ( 
        <li >
        <input
          type="radio"
          name="NPM"
          style={{ accentColor: "#6558F5" }}
          onChange={() => radioValueHandler(item.package.name)}
        />{" "}
        <label htmlFor="html">{item.package.name}</label>
      </li>)
}

export default NpmItem