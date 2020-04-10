import React from 'react';
import { useParams } from 'react-router-dom';
import { Spinner, Button } from 'react-bootstrap';
import StoreContext from '../../contexts/store-context';
import usePromise from '../../hooks/use-promise';
import ItemList from '../../components/item-list';
import SearchInput from '../../components/search-input';
import './entity-page.scss';


function EntityPage() {
  const { entityId } = useParams();

  const { getEntity, findItems } = React.useContext(StoreContext);

  const [entity, { isFetching }] = usePromise(() => getEntity(entityId), {
    dependencies: [entityId],
  });


  if (isFetching || !entity) {
    return <Spinner />;
  }

  const { name, pluralName } = entity;


  return (
    <div className="entity-page">

      <div className="entity-page__header">

        <h2 className="m-0">
          {pluralName}
        </h2>

        <Button
          variant="outline-primary"
          href={`/${entityId}/new`}
          size="md"
        >
          Add
          {' '}
          {name}
        </Button>

      </div>


      <SearchInput
        placeholder={`Search ${pluralName}`}
        className="entity-page__search"
      />

      <ItemList
        schema={entity.schema}
        getData={({ skip, limit }) => findItems({ entityId: entity.id, skip, limit })}
      />

    </div>
  );
}


export default EntityPage;
