import React from 'react';
import { useParams } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import StoreContext from '../../contexts/store-context';
import usePromise from '../../hooks/use-promise';
import ItemList from '../../components/item-list';
import SearchInput from '../../components/search-input';


const useStyles = makeStyles((theme) => ({
  root: {
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: theme.spacing(3),
  },
  spacer: {
    flexGrow: 1,
  },
  button: {
    // flex: 1,
    // color: colors.blueGrey[800],
    // padding: '10px 8px',
    // justifyContent: 'flex-start',
    // textTransform: 'none',
    // letterSpacing: 0,
    // width: '100%',
    // fontWeight: theme.typography.fontWeightMedium,
  },
  searchInput: {
    height: '2rem',
    marginBottom: theme.spacing(2),
    maxWidth: '30rem',
  },
}));


function EntityPage() {
  const classes = useStyles();
  const { entityId } = useParams();

  const { getEntity, findItems } = React.useContext(StoreContext);

  const [entity, { isFetching }] = usePromise(() => getEntity(entityId), {
    dependencies: [entityId],
  });


  if (isFetching || !entity) {
    return <CircularProgress />;
  }

  const { name, pluralName } = entity;


  return (
    <div className={clsx(classes.root)}>

      <div className={classes.toolbar}>

        <Typography variant="h4">
          {pluralName}
        </Typography>

        <span className={classes.spacer} />

        <Button
          color="primary"
          className={classes.button}
          variant="contained"
          href={`${entityId}/new`}
          size="large"
        >
          Add
          {' '}
          {name}
        </Button>

      </div>


      <SearchInput
        className={classes.searchInput}
        placeholder={`Search ${pluralName}`}
      />

      <ItemList
        schema={entity.schema}
        getData={({ skip, limit }) => findItems({ entityId: entity.id, skip, limit })}
      />

    </div>
  );
}


export default EntityPage;
