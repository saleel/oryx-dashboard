import React from 'react';
import { Link, useParams } from 'react-router-dom';
import { Card, Spinner } from 'react-bootstrap';
import StoreContext from '../../contexts/store-context';
import ItemList from '../../components/item-list';
import SearchInput from '../../components/search-input';
import usePromise from '../../hooks/use-promise';
import './entity-page.scss';


function EntityPage() {
  const { entityId } = useParams();

  const { getEntity, findItems } = React.useContext(StoreContext);

  const [entity, { isFetching }] = usePromise(() => getEntity(entityId), {
    dependencies: [entityId],
  });


  if (!entity || isFetching) {
    return (<Spinner />);
  }


  const { id, name, pluralName } = entity;


  return (
    <div className="entity-page">
      {/* <Card className="p-4"> */}

      <div className="row d-flex justify-content-between">
        <SearchInput
          className="col-xs-12 col-md-6 col-lg-4 mb-4"
          placeholder={`Search ${pluralName}`}
        />

        <div className="col-xs-12 col-md-6 justify-content-end d-flex w-100 mb-4">
          <Link
            className="btn btn-md btn-outline-primary"
            to={`/${id}/new`}
          >
              Add
            {' '}
            {name}
          </Link>
        </div>
      </div>

      <ItemList
        entity={entity}
        getData={({ skip, limit }) => findItems({ entityId: entity.id, skip, limit })}
      />

      {/* </Card> */}
    </div>
  );
}


export default EntityPage;
