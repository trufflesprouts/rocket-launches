import React, { PropTypes } from 'react'
import Select from 'react-select'

const Settings = (props) => {
  function handleLimitChange(event) {
    props.setLimit(event.target.value)
  }

  const options = [
    { value: 'papayawhip', label: 'Papayawhip' },
    { value: 'grey', label: 'Grey' },
    { value: 'white', label: 'White' }
  ]

  return (
    <div className={`Settings ${props.className}`}>
      <h6>Results Per Page:</h6>
      <input value={props.limit} onChange={handleLimitChange} className='date' type="text"/>
      <h6>Background Color:</h6>
        <Select
          clearable={false}
          name="background-color"
          value={props.theme}
          options={options}
          onChange={props.setTheme}
          searchable={false}
        />
    </div>
  )
}

Settings.propTypes = {
  limit: PropTypes.number.isRequired
}

export default Settings
