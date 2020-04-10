import React from 'react';
import { useHistory } from 'react-router-dom';
import StoreContext from '../../contexts/store-context';
import ItemEditForm from '../../components/item-edit-form';
import './entity-create-page.scss';


function EntityCreatePage() {
  const history = useHistory();

  const { createEntity } = React.useContext(StoreContext);

  const schema = {
    type: 'object',
    required: ['name', 'pluralName', 'description', 'properties'],
    properties: {
      name: { type: 'string', title: 'Name', description: 'Singular name of the Entity' },
      pluralName: { type: 'string', title: 'Plural Name', description: 'Pluralized version of the name' },
      // id: { type: 'string', title: 'ID', description: 'ID of the Entity' },
      description: { type: 'string', title: 'Description', description: 'Description of the Entity' },
      properties: {
        type: 'array',
        title: 'Properties',
        minItems: 1,
        items: {
          type: 'object',
          properties: {
            title: { type: 'string', title: 'Title', description: 'Label/Name of the property' },
            key: { type: 'string', title: 'Key', description: 'Unique key for this property' },
            type: {
              type: 'string',
              title: 'Type',
              description: 'Type of the property',
              enum: [
                'string', 'number',
              ],
            },
            description: { type: 'string', title: 'Description', description: 'Description of the property' },
          },
        },
      },
    },
  };


  async function handleSubmit(data) {
    const { name, pluralName, description } = data;

    const id = name.split(' ').join('_').toLowerCase();

    const properties = data.properties.reduce((acc, prop) => {
      const { key, ...rest } = prop;
      return { ...acc, [key]: { ...rest } };
    }, {});

    const transformedData = {
      id,
      name,
      pluralName,
      schema: {
        title: name,
        description,
        type: 'object',
        properties,
      },
    };

    await createEntity(transformedData);

    history.push(`/${id}`);
  }


  return (
    <div className="entity-create-page">

      <h2 className="entity-create-page__header">
        Create new Entity
      </h2>

      <ItemEditForm
        schema={schema}
        onSubmit={handleSubmit}
      />

    </div>
  );
}


export default EntityCreatePage;
