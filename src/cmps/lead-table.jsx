import * as React from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from "react-redux"

import { useEffect, useState } from "react";
import PropTypes from 'prop-types';
import { alpha } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import TableSortLabel from '@mui/material/TableSortLabel';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Checkbox from '@mui/material/Checkbox';
import IconButton from '@mui/material/IconButton';
import Tooltip from '@mui/material/Tooltip';
import FormControlLabel from '@mui/material/FormControlLabel';
import Switch from '@mui/material/Switch';
import DeleteIcon from '@mui/icons-material/Delete';
import FilterListIcon from '@mui/icons-material/FilterList';
import { useTranslation } from 'react-i18next';
import MoreVertIcon from '@mui/icons-material/MoreVert';

import { MultiEdit } from './multi-edit'

import { loadStatuses } from '../store/actions/status.action';


import { removeLead, setLead, saveLead, loadLeads, getActionSetLead } from "../store/actions/lead.action"


import { visuallyHidden } from '@mui/utils';
import { useEffectUpdate } from '../hooks/useEffectUpdate';

export const LeadTable = ({ leadsToShow, leads,statuses, setIsEdit, filterBy }) => {
  const navigation = useNavigate()
  const dispatch = useDispatch()

  // const { statuses } = useSelector((storeState) => storeState.statusModule)
  const { user, users } = useSelector((storeState) => storeState.userModule)

  const { t, i18n } = useTranslation();
  const [status, setStatus] = useState('')
  const [creator, setCreator] = useState('')


  useEffect(() => {
    loadLeads(user._id)
    loadStatuses(user._id)
  }, [status])
  useEffectUpdate(() => {
    loadLeads(user._id)
    loadStatuses(user._id)
  }, [status])

  useEffect(() => {
    loadLeads(user._id)
  }, [leads])

  useEffectUpdate(() => {
    loadLeads(user._id)
  }, [leads])
  useEffect(() => {
    if (!user) {
      navigation('/')
      return
    }
    dispatch(loadLeads(user._id))
    dispatch(loadStatuses(user._id))
  }, [])





  const removeLeads = async (e) => {
    e.preventDefault()
    e.stopPropagation()
    selected.map(async (s, idx) => {
      await dispatch(removeLead(s))
    })
    await dispatch(loadLeads(user._id))

  }

  const onClick = (e) => {
    e.stopPropagation();
  };

  const handleChange = async (ev, row) => {
    ev.stopPropagation()
    ev.preventDefault()
    const field = ev.target?.name
    const value = ev.target?.value
    const x = { ...row }

    switch (field) {
      case 'status':
        setStatus(value)
        x.status = value
        break
      case 'creator':
        setCreator(value)
        x.creator = value
        break
    }
    await dispatch((saveLead(x)))

    // setNewLead(x)



    // await dispatch(loadLeads(user._id))
    // await dispatch(getActionSetLead(null))



    // onSaveLead(x)
  }

  const getTime = (timeStamp) => {
    const time = new Date(timeStamp)
    let hour = time.getHours();
    hour = ('0' + hour).slice(-2);
    let minute = time.getMinutes();
    minute = ('0' + minute).slice(-2);
    const timeToShow = time.getDate()

    return `${time.toLocaleString()}`
  }
  function createData(_id, creator, createdAt, status, campaign, channel, businessName, managerName, phoneNumber, phoneNumber2, phoneNumber3, classDesc, role, email, address, address2, message) {
    return {
      // name,
      _id,
      creator,
      createdAt,
      status,
      campaign,
      channel,
      businessName,
      managerName,
      phoneNumber,
      phoneNumber2,
      phoneNumber3,
      classDesc,
      role,
      email,
      address,
      address2,
      message
    };
  }

  const rows = []
  // leads.map((lead, idx) => {
  leadsToShow.map((lead, idx) => {
    var x = createData(lead._id, lead.creator, lead.createdAt, lead.status, lead.campaign, lead.channel, lead.businessName, lead.managerName, lead.phoneNumber, lead.phoneNumber2, lead.phoneNumber3, lead.classDesc, lead.role, lead.email, lead.address, lead.address2, lead.message)
    rows.push(x)
  })

  function descendingComparator(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
      return -1;
    }
    if (b[orderBy] > a[orderBy]) {
      return 1;
    }
    return 0;
  }

  function getComparator(order, orderBy) {
    return order === 'desc'
      ? (a, b) => descendingComparator(a, b, orderBy)
      : (a, b) => -descendingComparator(a, b, orderBy);
  }

  // This method is created for cross-browser compatibility, if you don't
  // need to support IE11, you can use Array.prototype.sort() directly
  function stableSort(array, comparator) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
      const order = comparator(a[0], b[0]);
      if (order !== 0) {
        return order;
      }
      return a[1] - b[1];
    });
    return stabilizedThis.map((el) => el[0]);
  }

  const headCells = [
    {
      id: '_id',
      numeric: false,
      disablePadding: true,
      label: 'ID',
    },
    {
      id: 'creator',
      numeric: false,
      disablePadding: false,
      label: t('Creator'),
    },
    {
      id: 'createdAt',
      numeric: false,
      disablePadding: false,
      label: t('Created at'),
    },
    {
      id: 'status',
      numeric: false,
      disablePadding: false,
      label: t('Status'),
    },
    {
      id: 'campaign',
      numeric: false,
      disablePadding: false,
      label: t('Campaign'),
    },
    {
      id: 'channel',
      numeric: false,
      disablePadding: false,
      label: t('Channel'),
    },
    {
      id: 'businessName',
      numeric: false,
      disablePadding: false,
      label: t('Business Name'),
    },
    {
      id: 'managerName',
      numeric: false,
      disablePadding: false,
      label: t('Manager Name'),
    },
    {
      id: 'phoneNumber',
      numeric: true,
      disablePadding: false,
      label: t('Phone Number'),
    },
    {
      id: 'phoneNumber2',
      numeric: true,
      disablePadding: false,
      label: t('Phone Number2'),
    },
    {
      id: 'phoneNumber3',
      numeric: true,
      disablePadding: false,
      label: t('Phone Number3'),
    },
    {
      id: 'desc',
      numeric: false,
      disablePadding: false,
      label: t('Class Desc'),
    },
    {
      id: 'role',
      numeric: false,
      disablePadding: false,
      label: t('Role'),
    },
    {
      id: 'email',
      numeric: false,
      disablePadding: false,
      label: t('Email'),
    },
    {
      id: 'address',
      numeric: false,
      disablePadding: false,
      label: t('Address'),
    },
    {
      id: 'address2',
      numeric: false,
      disablePadding: false,
      label: t('Address2'),
    },
    {
      id: 'message',
      numeric: false,
      disablePadding: false,
      label: t('Message'),
    },
    {
      id: 'Actions',
      numeric: false,
      disablePadding: false,
      label: t('Actions')
    }
  ];

  function EnhancedTableHead(props) {
    const { onSelectAllClick, order, orderBy, numSelected, rowCount, onRequestSort } =
      props;
    const createSortHandler = (property) => (event) => {
      onRequestSort(event, property);
    };

    return (
      <TableHead>
        <TableRow>
          <TableCell padding="checkbox">
            <Checkbox
              color="primary"
              indeterminate={numSelected > 0 && numSelected < rowCount}
              checked={rowCount > 0 && numSelected === rowCount}
              onChange={onSelectAllClick}
              inputProps={{
                'aria-label': 'select all desserts',
              }}
            />
          </TableCell>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id}
              align={headCell.numeric ? 'right' : 'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : 'asc'}
                onClick={createSortHandler(headCell.id)}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <Box component="span" sx={visuallyHidden}>
                    {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                  </Box>
                ) : null}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

  EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.oneOf(['asc', 'desc']).isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
  };

  const EnhancedTableToolbar = (props) => {
    const { numSelected } = props;

    return (
      <Toolbar
        sx={{
          pl: { sm: 2 },
          pr: { xs: 1, sm: 1 },
          ...(numSelected > 0 && {
            bgcolor: (theme) =>
              alpha(theme.palette.primary.main, theme.palette.action.activatedOpacity),
          }),
        }}
      >

        {numSelected > 0 ? (
          <Typography
            sx={{ flex: '1 1 100%' }}
            color="inherit"
            variant="subtitle1"
            component="div"
          >
            {numSelected} {t('Selected')}
          </Typography>
        ) : (
          <></>
        )}

        {numSelected > 0 ? (
          <Tooltip title="Delete">
            <IconButton onClick={removeLeads}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        ) : (
          <Tooltip title="Filter list">
            <IconButton>
              <FilterListIcon />
            </IconButton>
          </Tooltip>
        )}


        {numSelected > 0 ? (
          <MultiEdit selectedLeads={selected}></MultiEdit>
        ) : (<></>)
        }




        {/* <FormControlLabel
        control={<Switch checked={dense} onChange={handleChangeDense} />}
        label="Dense padding"
      /> */}
        <TablePagination
          className='pagination'
          rowsPerPageOptions={[5, 10, 25, 50, 100]}
          component="div"
          count={rows.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
      </Toolbar>
    );
  };

  EnhancedTableToolbar.propTypes = {
    numSelected: PropTypes.number.isRequired,
  };

  const [order, setOrder] = React.useState('asc');
  const [orderBy, setOrderBy] = React.useState('_id');
  const [selected, setSelected] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [dense, setDense] = React.useState(true);
  const [rowsPerPage, setRowsPerPage] = React.useState(25);

  const handleRequestSort = (event, property) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event) => {
    event.stopPropagation()
    if (event.target.checked) {
      // const newSelected = rows.map((n) => n.name);
      const newSelected = rows.map((n) => n._id);
      setSelected(newSelected);

      return;
    }
    setSelected([]);

  };

  const handleClick = (event, _id) => {
    const selectedIndex = selected.indexOf(_id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, _id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1),
      );
    }

    setSelected(newSelected);
  };

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleChangeDense = (event) => {
    setDense(event.target.checked);
  };

  const isSelected = (_id) => selected.indexOf(_id) !== -1;

  // Avoid a layout jump when reaching the last page with empty rows.
  const emptyRows =
    page > 0 ? Math.max(0, (1 + page) * rowsPerPage - rows.length) : 0;

  return (
    <Box sx={{ width: '100%' }}>
      <Paper sx={{ width: '100%', mb: 2 }}>

        <EnhancedTableToolbar numSelected={selected.length} />
        <TableContainer>
          <Table
            sx={{ minWidth: 750 }}
            aria-labelledby="tableTitle"
            size={dense ? 'small' : 'medium'}
          >
            <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
            <TableBody>
              {/* if you don't need to support IE11, you can replace the `stableSort` call with:
                 rows.slice().sort(getComparator(order, orderBy)) */}
              {stableSort(rows, getComparator(order, orderBy))
                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                .map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  const labelId = `enhanced-table-checkbox-${index}`;

                  return (
                    <TableRow
                      hover
                      onClick={(event) => handleClick(event, row._id)}
                      role="checkbox"
                      aria-checked={isItemSelected}
                      tabIndex={-1}
                      // key={row._id}
                      key={index}
                      selected={isItemSelected}
                    >
                      <TableCell padding="checkbox">
                        <Checkbox
                          color="primary"
                          checked={isItemSelected}
                          inputProps={{
                            'aria-labelledby': labelId,
                          }}
                        />
                      </TableCell>
                      <TableCell
                        component="th"
                        id={labelId}
                        scope="row"
                        padding="none"
                      >
                        {row._id?.substring(row._id.length - 5, row._id.length)}
                      </TableCell>
                      {/* <TableCell align="right">{row._id}</TableCell> */}
                      <TableCell align="right">
                        <select onClick={onClick} onChange={(ev) => { handleChange(ev, row) }} value={row.creator} name='creator'>
                          {users.map((user, idx) => {
                            return (
                              <option key={idx} value={user.fullname}>
                                {user.fullname}
                              </option>)
                          })}
                          {!users.length && <option key={0} value={creator}>
                            {creator}
                          </option>}

                        </select>
                      </TableCell>
                      <TableCell align="right">{getTime(row?.createdAt)}</TableCell>
                      <TableCell align="right">

                        <form className='lead-edit-form flex' >
                          <div className="flex column">
                            <select onClick={onClick} onChange={(ev) => { handleChange(ev, row) }} value={t(row.status)} name='status'>
                              {statuses.map((status, idx) => {
                                return (<option key={idx} value={status.statusName || t(status.statusName)} >{t(status.statusName)}</option>)
                              })}
                            </select>
                          </div>
                        </form>
                      </TableCell>
                      <TableCell align="right">{row.campaign}</TableCell>
                      <TableCell align="right">{row.channel}</TableCell>
                      <TableCell align="right">{row.businessName}</TableCell>
                      <TableCell align="right">{row.managerName}</TableCell>
                      <TableCell align="right">{row.phoneNumber}</TableCell>
                      <TableCell align="right">{row.phoneNumber2}</TableCell>
                      <TableCell align="right">{row.phoneNumber3}</TableCell>
                      <TableCell align="right">{row.classDesc}</TableCell>
                      <TableCell align="right">{row.role}</TableCell>
                      <TableCell align="right">{row.email}</TableCell>
                      <TableCell align="right">{row.address}</TableCell>
                      <TableCell align="right">{row.address2}</TableCell>
                      <TableCell align="right">{row.message}</TableCell>
                      <TableCell align="right">
                        <button onClick={
                          async (ev) => {
                            ev.stopPropagation()
                            ev.preventDefault()
                            await dispatch(setLead(row._id))
                            setIsEdit(true)
                          }}>{t('Edit')}</button>
                        <button onClick={async (ev) => {
                          ev.stopPropagation()
                          ev.preventDefault()
                          await dispatch(removeLead(row._id))
                          dispatch(loadLeads(user._id))



                        }}>{t('Delete')}</button>

                      </TableCell>


                    </TableRow>
                  );
                })}
              {emptyRows > 0 && (
                <TableRow
                  style={{
                    height: (dense ? 33 : 53) * emptyRows,
                  }}
                >
                  <TableCell colSpan={6} />
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </Paper>

    </Box>
  );
}
