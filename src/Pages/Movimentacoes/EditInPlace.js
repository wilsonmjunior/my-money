import React, { useState, useEffect, useRef } from 'react'

const Input = ({ viewAs, value, alterar  }) => {
  const [isEditing, setIsEditing] = useState(false)
  const inputEditRef = useRef('')

  useEffect(() => {
    if (isEditing) {
      inputEditRef.current.focus()
    }
  },[isEditing])

  const edit = () => setIsEditing(true)
  const done = () => {
    alterar(inputEditRef.current.value)
    setIsEditing(false)
  }

  if (isEditing) {
    return <input className="form-control" ref={inputEditRef} type="text" onBlur={done} defaultValue={value} />
  }

  return React.createElement(viewAs || "div", {
    className: "edit-in-place",
    onClick: edit,
    children: value
  })
}

export default Input