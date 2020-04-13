import React from "react";
import Pagination from "react-bootstrap/Pagination";

export const getPagination = (total, active) => {
  let pages = [];
  pages.push(<Pagination.Prev key="prev"/>);
  for (let number = 1; number <= total; number++) {
    if (number === 1 || number === total || Math.abs(active - number) < 3) {
      pages.push(
        <Pagination.Item key={number} active={number === active}>
          {number}
        </Pagination.Item>,
      );
    } else if ((active - number) === 3 || (number - active) === 3) {
      pages.push(<Pagination.Ellipsis key="ellipsis"/>);
    }
  }
  pages.push(<Pagination.Next key="next"/>);

  return pages;
}