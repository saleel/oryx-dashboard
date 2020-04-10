import React from 'react';
import { useHistory, useParams } from 'react-router-dom';
import { Spinner } from 'react-bootstrap';
import StoreContext from '../../contexts/store-context';
import usePromise from '../../hooks/use-promise';
import EntityEditForm from '../../components/item-edit-form';
import './item-create-page.scss';


function ItemCreatePage() {
  const { entityId } = useParams();
  const history = useHistory();

  const { getEntity, createItem } = React.useContext(StoreContext);

  const [entity, { isFetching }] = usePromise(() => getEntity(entityId), {
    dependencies: [entityId],
  });


  async function handleSubmit(data) {
    await createItem({ entityId, data });
    history.push(`/${entityId}`);
  }


  if (isFetching || !entity) {
    return <Spinner />;
  }

  const { name } = entity;


  return (
    <div className="item-create-page">

      <h2 className="item-create-page__header">
        Create new
        {' '}
        {name}
      </h2>

      <EntityEditForm
        schema={entity.schema}
        onSubmit={handleSubmit}
      />

    </div>
  );
}


export default ItemCreatePage;
