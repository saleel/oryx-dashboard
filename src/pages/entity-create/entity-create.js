import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory, useParams } from 'react-router-dom';
import clsx from 'clsx';
import StoreContext from '../../contexts/store-context';
import usePromise from '../../hooks/use-promise';
import EntityList from '../../components/entity-list';
import SearchInput from '../../components/search-input';
import EntityEditForm from '../../components/entity-edit-form';


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

  const { createSchema } = React.useContext(StoreContext);

  const schema = {
    type: 'object',
    required: ['title', 'description'],
    properties: {
      title: { type: 'string', title: 'Title', description: 'Name of the Entity' },
      description: { type: 'string', title: 'Description', description: 'Description of the Entity' },
      properties: {
        type: 'array',
        title: 'Properties',
        minLength: 1,
        items: {
          type: 'object',
          properties: {
            key: { type: 'string', title: 'Key', description: 'Unique key for this property' },
            title: { type: 'string', title: 'Title', description: 'Name of the Entity' },
            description: { type: 'string', title: 'Description', description: 'Description of the Entity' },
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
    const id = data.title.split(' ').join('_').toLowerCase();

    const properties = data.properties.reduce((acc, prop) => {
      const { key, ...rest } = prop;
      return { ...acc, [key]: { ...rest } };
    }, {});

    const tranformedData = {
      id,
      ...data,
      properties,
    };

    await createSchema(tranformedData);

    history.push(`/${id}`);
  }


  return (
    <div className={clsx(classes.root)}>

      <div className={classes.toolbar}>

        <Typography variant="h4">
          Create new Entity
        </Typography>

      </div>

      <EntityEditForm
        schema={schema}
        uiSchema={uiSchema}
        onSubmit={handleSubmit}
      />

    </div>
  );
}


export default EntityCreatePage;
