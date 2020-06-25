import React from "react";
import styled from "styled-components";

const Button = styled.button`
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1.25rem;
  padding: 0;
  color: #bbbbbb;
  transition: color 0.5s ease;
  margin: 0.1em;
  &:hover {
    color: ${(props) => props.hoverColor || "#000000"};
  }
`;

const EditItemInput = styled.input`
  padding: 1em 1.5em;
  margin-left: 1em;

  border-radius: 5px;
  border: 1px solid #4aa5d4;

  color: #4aa5d4;
  font-size: 16px;
`;

function EditInstanceForm({
  id,
  label,
  value,
  onChange,
  onSave,
  onCancel,
  disabled,
}) {
  return (
    <>
      <label htmlFor={id}>
        {" "}
        {label}{" "}
        <EditItemInput
          id={id}
          type="text"
          value={value}
          onChange={onChange}
          disabled={disabled}
        />{" "}
      </label>{" "}
      <Button
        type="button"
        hoverColor="#00FF00"
        onClick={onSave}
        disabled={disabled}
      >
        &#10003;
      </Button>
      <Button
        type="button"
        hoverColor="#FF0000"
        onClick={onCancel}
        disabled={disabled}
      >
        &#10005;
      </Button>
    </>
  );
}

export default EditInstanceForm;
