// @ts-check

import React from 'react';
import PropTypes from 'prop-types';
import { Card as div, Table, Pagination } from 'react-bootstrap';
import EditIcon from '@iconscout/react-unicons/icons/uil-edit';
import { Link } from 'react-router-dom';
import './item-list.scss';


/**
 * Renders list of entities based on the data returned from getData
 * @param {{ entity: Object, getData: Function, pageLimit: number }} props
 */
function ItemList(props) {
  const {
    entity, getData, pageLimit = 10,
  } = props;


  const { id: entityId, schema } = entity;
  const { properties } = schema;
  const [data, setData] = React.useState([]);
  const [pageNumber, setPageNumber] = React.useState(1);
  const [total, setTotal] = React.useState(0);
  const [limit] = React.useState(pageLimit);


  const keysToShow = schema.required || Object.keys(schema.properties).slice(0, 5).filter(Boolean);

  const numberOfPages = Math.ceil(total / limit);
  const showPagination = numberOfPages > 1;
  const pages = showPagination ? [...new Array(numberOfPages)].map((_, i) => (i + 1)) : [];


  React.useEffect(() => {
    let isUnmounted = false;
    const skip = (pageNumber - 1) * pageLimit;

    getData({ skip, limit }).then((result) => {
      if (!isUnmounted) {
        setData(result.data);
        setTotal(result.total);
      }
    });

    return () => { isUnmounted = true; };
  }, [getData, limit, pageLimit, pageNumber]);


  function onChangePage(page) {
    setPageNumber(page);
  }


  function renderValue(value) {
    if (Array.isArray(value)) {
      return value.map(((val) => (
        <div>{val}</div>
      )));
    }

    if (typeof value === 'object') {
      return Object.keys(value).map((k) => (
        <div>
          {k}
          {': '}
          {value[k]}
        </div>
      ));
    }

    return value;
  }


  return (
    <div className="item-list">
      <Table responsive borderless>

        <thead>
          <tr>
            {keysToShow.map((key) => (
              <th key={key}>{properties[key].title}</th>
            ))}
            <th style={{ width: '100px' }}>Actions</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.id}>
              {keysToShow.map((key) => (
                <td key={key}>
                  {renderValue(item[key])}
                </td>
              ))}
              <td>
                <Link to={`/${entityId}/${item.id}/edit`}>
                  <EditIcon />
                </Link>
              </td>
            </tr>
          ))}
        </tbody>

      </Table>

      {showPagination && (
        <Pagination className="item-list__pagination">
          {pages.map((n) => (
            <Pagination.Item
              active={n === pageNumber}
              onClick={() => onChangePage(n)}
            >
              {n}
            </Pagination.Item>
          ))}
        </Pagination>
      )}

    </div>
  );
}


ItemList.propTypes = {
  entity: PropTypes.shape({
    id: PropTypes.string.isRequired,
    schema: PropTypes.shape({
      required: PropTypes.arrayOf(PropTypes.string),
      properties: PropTypes.shape({}),
    }),
  }).isRequired,
  getData: PropTypes.func.isRequired,
  pageLimit: PropTypes.number,
};


ItemList.defaultProps = {
  pageLimit: 10,
};


export default ItemList;
