import React from 'react';
import { makeStyles, Typography } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress';
import { useHistory, useParams } from 'react-router-dom';
import clsx from 'clsx';
import StoreContext from '../../contexts/store-context';
import usePromise from '../../hooks/use-promise';
import EntityEditForm from '../../components/item-edit-form';


const useStyles = makeStyles((theme) => ({
  root: {
  },
  toolbar: {
    display: 'flex',
    marginBottom: theme.spacing(3),
  },
}));


function ItemCreatePage() {
  const classes = useStyles();
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
    return <CircularProgress />;
  }

  const { title } = entity;


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
        schema={entity.schema}
        onSubmit={handleSubmit}
      />

    </div>
  );
}


export default ItemCreatePage;
