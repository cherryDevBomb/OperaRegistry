import React from "react";

export const sleep = (milliseconds) => {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

export const Highlighter = ({children, highlight}) => {
  if (!highlight || highlight === "") return children;
  const regexp = new RegExp(highlight, 'g');
  const matches = children.match(regexp);
  var parts = children.split(new RegExp(`${highlight.replace()}`, 'gi'));

  for (var i = 0; i < parts.length; i++) {
    if (i !== parts.length - 1) {
      let match = matches[i];
      parts[i] = (
        <React.Fragment key={i}>
          {parts[i]}<span className="highlighted">{match}</span>
        </React.Fragment>
      );
    }
  }
  return <div className="highlighter">{parts}</div>;
};
