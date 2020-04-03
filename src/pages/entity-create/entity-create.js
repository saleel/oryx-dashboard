import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import StoreContext from '../../contexts/store-context';
import ItemEditForm from '../../components/item-edit-form';


const useStyles = makeStyles((theme) => ({
  root: {
  },
  toolbar: {
    display: 'flex',
    marginBottom: theme.spacing(3),
  },
}));


function EntityCreatePage() {
  const classes = useStyles();
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
        minLength: 1,
        items: {
          type: 'object',
          properties: {
            key: { type: 'string', title: 'Key', description: 'Unique key for this property' },
            title: { type: 'string', title: 'Title', description: 'Label/Name of the property' },
            description: { type: 'string', title: 'Description', description: 'Description of the property' },
            type: {
              type: 'string',
              title: 'Type',
              description: 'Type of the property',
              enum: [
                'string', 'number',
              ],
            },
          },
        },
      },
    },
  };

  const uiSchema = {
    properties: {
      items: {
        key: {
          classNames: 'MuiGrid-spacing-md-4',
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
        properties,
      },
    };

    await createEntity(transformedData);

    history.push(`/${id}`);
  }


  return (
    <div className={clsx(classes.root)}>

      <div className={classes.toolbar}>
        <Typography variant="h4">
          Create new Entity
        </Typography>
      </div>

      <ItemEditForm
        schema={schema}
        uiSchema={uiSchema}
        onSubmit={handleSubmit}
      />

    </div>
  );
}


export default EntityCreatePage;
