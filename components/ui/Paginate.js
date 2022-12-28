import React from "react";
import { Pagination } from "react-bootstrap";

/* eslint-disable */
const Paginate = ({ pages, page, isAdmin = false, onChangePage = null }) => {
  const start = Math.max(1, page - 2);
  const end = Math.min(pages, page + 2);

  return (
    pages > 1 && (
      <Pagination className="mt-2 justify-content-center  ">
        {page > 1 && (
          <Pagination.Prev
            onClick={e => {
              e.preventDefault();
              if (onChangePage) onChangePage(page - 1);
            }}
          />
        )}
        {[...Array(end - start + 1).keys()].map(x => {
          const itemValue = start + x;
          return isAdmin ? (
            <Pagination.Item
              key={itemValue}
              onClick={e => {
                e.preventDefault();
                if (onChangePage) onChangePage(itemValue);
              }}
              active={itemValue === page}
            >
              {itemValue}
            </Pagination.Item>
          ) : (
            <Pagination.Item
              key={itemValue}
              onClick={e => {
                e.preventDefault();
                if (onChangePage) onChangePage(itemValue);
              }}
              active={itemValue === page}
            >
              {itemValue}
            </Pagination.Item>
          );
        })}
        {page < pages && (
          <Pagination.Next
            onClick={e => {
              e.preventDefault();
              if (onChangePage) onChangePage(page + 1);
            }}
          />
        )}
      </Pagination>
    )
  );
};

export default Paginate;
