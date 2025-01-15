import { Helmet } from 'react-helmet-async';
import { paramCase } from 'change-case';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
// @mui
import {
  Tab,
  Tabs,
  Card,
  Table,
  Button,
  Tooltip,
  Divider,
  TableBody,
  Container,
  IconButton,
  TableContainer,
} from '@mui/material';
// routes
import { PATH_DASHBOARD } from '../../../../routes/paths';
// _mock_
import { _userList } from '../../../../_mock/arrays';
// components
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';
import ConfirmDialog from '../../../../components/confirm-dialog';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../components/settings';
import {
  useTable,
  getComparator,
  emptyRows,
  TableNoData,
  TableEmptyRows,
  TableHeadCustom,
  TableSelectedAction,
  TablePaginationCustom,
} from '../../../../components/table';
// sections
import { useLocales } from '../../../../locales';
import { useCategoryList } from './useCategoryList';
import CategoryTableRow from './list/CategoryTableRow';
import { CategoryTableToolbar } from './list';

// ----------------------------------------------------------------------

export default function CategoryListPage() {
  const { themeStretch } = useSettingsContext();
  const { translate } = useLocales();
  const navigate = useNavigate();

  const [openConfirm, setOpenConfirm] = useState(false);

  const [filterName, setFilterName] = useState('');

  const [filterRole, setFilterRole] = useState(`${translate('category.all')}`);
  

  const [filterStatus, setFilterStatus] = useState(`${translate('category.all')}`);
  const [loading, setLoading] = useState(false);

  const {
    dense,
    page,
    order,
    offset,
    orderBy,
    rowsPerPage,
    setPage,
    //
    pageCount,
     setpageCount,
    selected,
    setSelected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
    
  } = useTable();
  const { data, applyFilter, handleDeleteCategory,  isLoading, isError, error,refetch ,isFiltered} = useCategoryList({
    limit: 5,
    page,
    order,
    orderBy,
    filterName,
    filterRole,
    filterStatus,
    setPage,
    pageCount,
     setpageCount,
     loading, 
     setLoading,
     setOpenConfirm
     
  });

  const [total, settotal] = useState(data?.total);
  useEffect(() => {
    if(data){
      settotal(data?.total)
  
    }
  }, [data])

  const TABLE_HEAD = [
    { id: 'id', label: `${translate('category.id')}`, align: 'left' },


    { id: 'image', label: `${translate('category.image')}`, align: 'left' },
    { id: 'name_ar', label: `${translate('category.NameAr')}`, align: 'left' },
    { id: 'name_en', label: `${translate('category.NameEn')}`, align: 'left' },
    { id: '' },
  ];

  const dataFiltered = applyFilter({
    inputData: data?.data,
    comparator: getComparator(order, orderBy),
    filterName,
    filterRole,
    filterStatus,
    translate
  });


  
  const isNotFound =
    (!dataFiltered?.length && !!filterName) ||
    (!dataFiltered?.length && !!filterRole) ||
    (!dataFiltered?.length && !!filterStatus);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleFilterStatus = (event, newValue) => {
    // setPage(0);
    setFilterStatus(newValue);
  };

  const handleFilterName = (event) => {
    // setPage(0);
    setFilterName(event.target.value);
  };

  const handleFilterRole = (event) => {
    setPage(0);
    setFilterRole(event.target.value);
  };

  const handleDeleteRow = (id) => {
    handleDeleteCategory(id)

   
  };



  const handleEditRow = (id) => {
    navigate(`/dashboard/category/edit${id}`);
  };

  const handleResetFilter = () => {
    setFilterName('');
    setFilterRole(`${translate('category.all')}`);
    setFilterStatus(`${translate('category.all')}`);
  };



  return (
    <>
      <Helmet>
        <title> Category: List | Plaissir</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={`${translate('category.category')}`}
          links={[
            { name: `${translate('category.Dashboard')}`, href: PATH_DASHBOARD.root },
            { name: `${translate('category.category')}`, href: PATH_DASHBOARD.category },
            { name: `${translate('category.list')}` },
          ]}
          action={
            <Button

              component={RouterLink}
              to="/dashboard/category/new"
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              {`${translate('category.create')}`}
            </Button>
          }
        />

        <Card>
          


          <CategoryTableToolbar
            isFiltered={isFiltered}
            filterName={filterName}
            filterRole={filterRole}
            onFilterName={handleFilterName}
            onFilterRole={handleFilterRole}
            onResetFilter={handleResetFilter}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
         

            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={data?.data?.length}
                  numSelected={selected?.length}
                  onSort={onSort}
                
                />

                <TableBody>
                  {data?.data?.map((row) => (
                      <CategoryTableRow
                        key={row.id}
                        keys={TABLE_HEAD}
                        row={row}
                        avtar={true}
                        isCategories={true}
                        loading={loading}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                        openConfirm={openConfirm}
                        setOpenConfirm={setOpenConfirm}
                      />
                    ))}

                 

                </TableBody>
              </Table>
            </Scrollbar>
          </TableContainer>

          <TablePaginationCustom
            count={total}
            page={page}
            rowsPerPage={rowsPerPage}
            onPageChange={onChangePage}
            onRowsPerPageChange={onChangeRowsPerPage}
            //
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
      </Container>

    </>
  );
}


