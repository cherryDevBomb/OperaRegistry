import React from "react";
import Pagination from "react-bootstrap/Pagination";

export const getPagination = (total, active) => {
  let pages = [];

  pages.push(<Pagination.Prev id="prev" key="prev" disabled={active === 1}/>);
  for (let number = 1; number <= total; number++) {
    if (number === 1 || number === total || Math.abs(active - number) < 3) {
      pages.push(
        <Pagination.Item key={number} active={number === active}>
          {number}
        </Pagination.Item>,
      );
    } else if ((active - number) === 3) {
      pages.push(<Pagination.Ellipsis id="ellipsis-bck" key="ellipsis-bck"><span
        id="ellipsis-bck">{"..."}</span></Pagination.Ellipsis>);
    } else if ((number - active) === 3) {
      pages.push(<Pagination.Ellipsis id="ellipsis-fwd" key="ellipsis-fwd"><span
        id="ellipsis-fwd">{"..."}</span></Pagination.Ellipsis>);
    }
  }
  pages.push(<Pagination.Next id="next" key="next" disabled={active === total}/>);

  return pages;
}

export const getNewPageNumber = (e, currentPage, total) => {
  const targetId = e.target.getAttribute("id");
  const targetInnerText = e.target.innerText;
  const targetText = e.target.text;

  let newPage = currentPage;
  if (targetInnerText.includes("‹")) {
    if (currentPage !== 1) {
      newPage = currentPage - 1;
    }
  } else if (targetInnerText.includes("›")) {
    if (currentPage !== total) {
      newPage = currentPage + 1;
    }
  } else if (targetId === "ellipsis-bck") {
    newPage = currentPage - 2;
  } else if (targetId === "ellipsis-fwd") {
    newPage = currentPage + 2;
  } else {
    if (!isNaN(targetText)) {
      newPage = parseInt(e.target.text);
    }
  }
  console.log(newPage)
  return newPage;
}