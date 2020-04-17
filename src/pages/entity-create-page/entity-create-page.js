import React from 'react';
import { useHistory } from 'react-router-dom';
import StoreContext from '../../contexts/store-context';
import ItemEditForm from '../../components/item-edit-form';
// import objectField from '../../components/item-edit-form/object-field';
import { PropertyTypes } from '../../constants';
import './entity-create-page.scss';


function EntityCreatePage() {
  const history = useHistory();

  const { createEntity } = React.useContext(StoreContext);

  const schema = {
    type: 'object',
    required: ['name', 'description', 'properties'],
    properties: {
      // id: { type: 'string', title: 'ID', description: 'ID of the Entity' },
      name: { type: 'string', title: 'Name', description: 'Singular name of the Entity' },
      // pluralName: { type: 'string', title: 'Plural Name', description: 'Pluralized version of the name' },
      description: { type: 'string', title: 'Description', description: 'Description of the Entity' },
      properties: {
        type: 'array',
        title: 'Properties',
        minItems: 1,
        items: {
          type: 'object',
          required: ['key', 'title', 'type'],
          properties: {
            key: {
              type: 'string',
              title: 'Key',
              description: 'Unique key for this property',
            },
            title: {
              type: 'string',
              title: 'Title',
              description: 'Label/Name of the property',
            },
            type: {
              type: 'string',
              title: 'Type',
              description: 'Type of the property',
              enum: Object.values(PropertyTypes),
            },
            enum: { type: 'array', title: 'Enum', items: { type: 'string' } },
            properties: {
              type: 'array',
              title: 'Properties',
              required: ['key', 'title', 'type'],
              minItems: 1,
              items: {
                type: 'object',
                properties: {
                  key: {
                    type: 'string',
                    title: 'Key',
                    description: 'Unique key for this property',
                  },
                  title: {
                    type: 'string',
                    title: 'Title',
                    description: 'Label/Name of the property',
                  },
                  type: {
                    type: 'string',
                    title: 'Type',
                    description: 'Type of the property',
                    enum: Object.values(PropertyTypes).filter((p) => p !== PropertyTypes.Object),
                  },
                  // enum: { type: 'array', items: { type: 'string' } },
                },
              },
            },
          },
        },
      },
    },
  };


  function propsArrayToObject(propsArray = []) {
    const properties = propsArray.reduce((acc, prop) => {
      const {
        key, type, properties: nestedProperties, title, enum: enumValues,
      } = prop;

      const value = { title };

      if (type === PropertyTypes.String) {
        value.type = 'string';
      }

      if (type === PropertyTypes.Enum) {
        value.type = 'string';
        value.enum = enumValues;
      }

      if (type === PropertyTypes.Number) {
        value.type = 'number';
      }

      if (type === PropertyTypes.Boolean) {
        value.type = 'boolean';
      }

      if (type === PropertyTypes.ArrayOfStrings) {
        value.type = 'array';
        value.items = {
          type: 'string',
        };
      }

      if (type === PropertyTypes.ArrayOfStrings) {
        value.type = 'array';
        value.items = {
          type: 'number',
        };
      }

      if (type === PropertyTypes.Object) {
        value.type = 'object';
      }

      if (type === PropertyTypes.Object && nestedProperties && nestedProperties.length > 0) {
        const nestedPropertiesObject = propsArrayToObject(nestedProperties);
        value.properties = nestedPropertiesObject;
      }

      return { ...acc, [key]: value };
    }, {});

    return properties;
  }


  async function handleSubmit(data) {
    const { name, description } = data;

    const id = name.split(' ').join('_').toLowerCase();

    const properties = propsArrayToObject(data.properties);

    const transformedData = {
      id,
      name,
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

      <ItemEditForm
        schema={schema}
        onSubmit={handleSubmit}
      />

    </div>
  );
}


export default EntityCreatePage;
