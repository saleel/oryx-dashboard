import React from 'react';
import { useParams, NavLink } from 'react-router-dom';
import clsx from 'clsx';
import { makeStyles, colors } from '@material-ui/core';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import CircularProgress from '@material-ui/core/CircularProgress';
import StoreContext from '../../contexts/store-context';
import usePromise from '../../hooks/use-promise';
import EntityList from '../../components/entity-list';
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
    height: '3rem',
    marginBottom: theme.spacing(2),
    maxWidth: '30rem',
  },
}));


function EntityPage() {
  const classes = useStyles();
  const { schemaId } = useParams();

  const { getSchema, findEntities } = React.useContext(StoreContext);

  const [schema, { isFetching }] = usePromise(() => getSchema(schemaId), {
    dependencies: [schemaId],
  });


  if (isFetching || !schema) {
    return <CircularProgress />;
  }

  const { title } = schema;


  return (
    <div className={clsx(classes.root)}>

      <div className={classes.toolbar}>

        <Typography variant="h4">
          {title}
        </Typography>

        <span className={classes.spacer} />

        <Button
          color="primary"
          className={classes.button}
          variant="contained"
          href={`${schemaId}/new`}
        >
          Create
          {' '}
          {title}
        </Button>

      </div>


      <SearchInput
        className={classes.searchInput}
        placeholder="Search user"
      />

      <EntityList
        schema={schema}
        getData={({ skip, limit }) => findEntities({ schemaId: schema.id, skip, limit })}
      />

    </div>
  );
}


export default EntityPage;
