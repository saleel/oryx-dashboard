// @ts-check

import React from 'react';
import PropTypes from 'prop-types';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import {
  makeStyles,
} from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  content: {
    padding: 0,
  },
  tableRow: {
    // height: '3rem',
  },
  tableCell: {
    padding: '1rem',
    minHeight: '1rem',
  },
}));


/**
 * Renders list of entities based on the data returned from getData
 * @param {{ schema: Object, getData: Function, pageLimit: number }} props
 */
function ItemList(props) {
  const {
    schema, getData, pageLimit = 10,
  } = props;


  const classes = useStyles();

  const { properties } = schema;
  const [data, setData] = React.useState([]);
  const [pageNumber, setPageNumber] = React.useState(0);
  const [total, setTotal] = React.useState(1);
  const [limit, setLimit] = React.useState(pageLimit);


  React.useEffect(() => {
    let isUnmounted = false;
    const skip = pageNumber * pageLimit;

    getData({ skip, limit }).then((result) => {
      if (!isUnmounted) {
        setData(result.data);
        setTotal(result.total);
      }
    });

    return () => { isUnmounted = true; };
  }, [getData, limit, pageLimit, pageNumber]);


  function onChangePage(e, page) {
    setPageNumber(page);
  }

  function onChangeRowsPerPage(e) {
    setLimit(e.target.value);
  }


  return (
    <Card className={classes.root}>
      <CardContent className={classes.content}>
        <div className={classes.inner}>
          <Table>

            <TableHead>
              <TableRow>
                {Object.keys(properties).map((key) => (
                  <TableCell>{properties[key].title}</TableCell>
                ))}
              </TableRow>
            </TableHead>

            <TableBody>
              {data.map((item) => (
                <TableRow
                  className={classes.tableRow}
                  hover
                  key={item.id}
                >
                  {Object.keys(properties).map((key) => (
                    <TableCell className={classes.tableCell}>{item[key]}</TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>

      <CardActions className={classes.actions}>
        <TablePagination
          component="div"
          count={total}
          onChangePage={onChangePage}
          onChangeRowsPerPage={onChangeRowsPerPage}
          page={pageNumber}
          rowsPerPage={limit}
          rowsPerPageOptions={[5, 10, 25]}
        />
      </CardActions>

    </Card>
  );
}


ItemList.propTypes = {
  schema: PropTypes.shape({
    properties: PropTypes.shape({}),
  }).isRequired,
  getData: PropTypes.func.isRequired,
  pageLimit: PropTypes.number,
};


ItemList.defaultProps = {
  pageLimit: 10,
};

export default ItemList;
