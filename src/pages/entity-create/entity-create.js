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
  const { schemaId } = useParams();
  const history = useHistory();

  const { getSchema, createEntity } = React.useContext(StoreContext);

  const [schema, { isFetching }] = usePromise(() => getSchema(schemaId), {
    dependencies: [schemaId],
  });


  async function handleSubmit(data) {
    await createEntity({ schemaId, data });
    history.push(`/${schemaId}`);
  }


  if (isFetching || !schema) {
    return <CircularProgress />;
  }

  const { title } = schema;


  return (
    <div className={clsx(classes.root)}>

      <div className={classes.toolbar}>

        <Typography variant="h4">
          Create new
          {' '}
          {title}
        </Typography>

      </div>

      <EntityEditForm
        schema={schema}
        onSubmit={handleSubmit}
      />

    </div>
  );
}


export default EntityCreatePage;
