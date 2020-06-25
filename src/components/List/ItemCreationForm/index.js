import React, { useState } from "react";
import { graphql } from "@apollo/react-hoc";
import styled from "styled-components";
import { withNoStack, EXECUTE } from "@nostack/no-stack";
import compose from "@shopify/react-compose";

import { CREATE_ITEM_FOR_LIST_ACTION_ID } from "../../../config";

// change styling here
const Form = styled.div`
  margin: 2em auto;
  padding: 1.5em;
  border: none;
  border-radius: 5px;
  background-color: #f5f5f5;
  width: 50%;
`;

const Button = styled.button`
  margin-left: 1em;
  padding: 1em 2.5em;

  font-weight: bold;
  font-size: 16px;

  background: #4aa5d4;
  color: #fff;

  border: none;
  border-radius: 30px;
  box-shadow: 0px 4px 4px 4px rgba(0, 0, 0, 0.1);

  cursor: pointer;
`;

const CreateItemInput = styled.input`
  padding: 1em 1.5em;
  margin-left: 1em;

  border-radius: 5px;
  border: 1px solid #4aa5d4;

  color: #4aa5d4;
  font-size: 16px;
`;

const Label = styled.label`
  font-weight: bold;
  font-size: 16px;

  color: #4aa5d4;
`;

function ItemCreationForm({ userId, createItem, refetchQueries }) {
  const [itemValue, updateItemValue] = useState("");
  const [loading, updateLoading] = useState(false);

  function handleChange(e) {
    updateItemValue(e.target.value);
  }

  async function handleSubmit(e) {
    e.preventDefault();

    if (!itemValue) {
      return;
    }

    updateLoading(true);

    const createItemResponse = await createItem({
      variables: {
        actionId: CREATE_ITEM_FOR_LIST_ACTION_ID,
        executionParameters: JSON.stringify({
          parentInstanceId: userId,
          value: itemValue,
        }),
        unrestricted: false,
      },
      refetchQueries,
    });

    const newItemData = JSON.parse(createItemResponse.data.Execute);

    updateItemValue("");
    updateLoading(false);
  }

  function handleKeyPress(e) {
    if (e.charCode === 13) {
      handleSubmit(e);
    }
  }

  return (
    <Form>
      <Label htmlFor="item-value">
        Item:
        <CreateItemInput
          id="item-value"
          type="text"
          onChange={handleChange}
          onKeyPress={handleKeyPress}
          value={itemValue}
          disabled={loading}
        />{" "}
      </Label>{" "}
      <Button type="submit" disabled={loading} onClick={handleSubmit}>
        {" "}
        {loading ? "Creating Item..." : "Create Item"}{" "}
      </Button>{" "}
    </Form>
  );
}

export default compose(
  graphql(EXECUTE, {
    name: "createItem",
  })
)(ItemCreationForm);
