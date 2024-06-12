import React from "react";

const MessageParser = ({ children, actions }) => {
  const parse = (message) => {
    actions.handleMessage(message);
  };

  return React.Children.map(children, (child) => {
    return React.cloneElement(child, {
      parse: parse,
    });
  });
};

export default MessageParser;
