import React from 'react';
import { Link as Button, useParams } from 'react-router-dom';
import { Card, Spinner, Table } from 'react-bootstrap';
import get from 'lodash/get';
import EditIcon from '@iconscout/react-unicons/icons/uil-edit';
import StoreContext from '../../contexts/store-context';
import ItemEditForm from '../../components/item-edit-form';
import usePromise from '../../hooks/use-promise';
import './item-page.scss';


function ItemPage() {
  const { entityId, itemId } = useParams();

  const { getEntity, getItem, updateItem } = React.useContext(StoreContext);

  const [isEditMode, setIsEditMode] = React.useState(false);

  const [item, { isFetching, reFetch }] = usePromise(() => getItem({ entityId, itemId }), {
    dependencies: [entityId],
  });

  const [entity, { isFetching: isFetchingEntity }] = usePromise(() => getEntity(entityId), {
    dependencies: [entityId],
  });


  if (!item || isFetching || isFetchingEntity) {
    return (<Spinner />);
  }


  const { schema } = entity;


  function renderValue(value) {
    if (Array.isArray(value)) {
      if (typeof value[0] === 'object') {
        return value.map(renderValue);
      }

      return value.map((v) => (
        <div>{v}</div>
      ));
    }

    if (typeof value === 'object') {
      return JSON.stringify(value, null, 2);
    }

    return value;
  }


  function renderRow(itemKey) {
    const title = get(schema, `properties.${itemKey}.title`, itemKey);
    const value = get(item, `${itemKey}`);

    return (
      <tr>
        <td>{title}</td>
        <td className="item-page__td-value">{renderValue(value)}</td>
      </tr>
    );
  }


  function renderTable() {
    return (
      <Table responsive bordered>
        <tbody>
          {Object.keys(item).map(renderRow)}
        </tbody>
      </Table>
    );
  }


  function renderEditView() {
    return (
      <ItemEditForm
        schema={entity.schema}
        item={item}
        onSubmit={async (data) => {
          await updateItem({ entityId, itemId, data });
          await reFetch();
          setIsEditMode(false);
        }}
      />
    );
  }


  return (
    <div className="item-page">

      <Card className="p-4">

        <div className="item-page__edit-link">
          <Button onClick={() => setIsEditMode(true)}>
            <EditIcon size="1.5rem" />
          </Button>
        </div>

        {!isEditMode && renderTable()}
        {isEditMode && renderEditView()}

      </Card>

    </div>
  );
}


export default ItemPage;
