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
import queryString from 'query-string';

// sections
import { UserTableToolbar, UserTableRow } from '../../../../sections/@dashboard/user/list/index';
import { useLocales } from '../../../../locales';
import useCoupon from 'src/hooks/Coupon/useCoupon';
import CouponTableRow from './list/CouponTableRow';
import CouponTableToolbar from './list/CouponTableToolbar';
import useDeleteCouponMutation from 'src/hooks/Coupon/useDeleteCouponMutation';

// ----------------------------------------------------------------------





// ----------------------------------------------------------------------

export default function CouponListPage() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    setPage,
    pageCount,
    //
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

  const { themeStretch } = useSettingsContext();
  const { translate } = useLocales();
  const TABLE_HEAD = [
    { id: 'code', label: `${translate('coupon.code')}`, align: 'left' },

    { id: 'discountPercentage', label: `${translate('coupon.discountPercentage')}`, align: 'left' },
    { id: 'expirationDate', label: `${translate('coupon.expirationDate')}`, align: 'left' },
    { id: 'products', label: `${translate('coupon.products')}`, align: 'left' },

    // { id: 'company', label: 'Company', align: 'left' },
    // { id: 'role', label: 'Role', align: 'left' },
    // { id: 'isVerified', label: `${translate('coupon.Verified')}`, align: 'center' },
    // { id: 'status', label: `${translate('coupon.status')}`, align: 'left' },
    { id: '' },
  ];
  
  const navigate = useNavigate();

  const [tableData, setTableData] = useState(_userList);

  const [openConfirm, setOpenConfirm] = useState(false);

  const [filterName, setFilterName] = useState('');

  const [filterRole, setFilterRole] = useState(`${translate('coupon.all')}`);

  const [filterStatus, setFilterStatus] = useState(`${translate('coupon.all')}`);

  const dataFiltered = applyFilter({
    inputData: tableData,
    comparator: getComparator(order, orderBy),
    filterName,
    filterRole,
    filterStatus,
    translate
  });
  const STATUS_OPTIONS = [`${translate('coupon.all')}`];
  
const initialParams = {
  orderBy: 'id',
  order: 'desc',
  limit: 5,
  page: pageCount,
  filterOptions: { searchKey: 'code', searchValue: filterName },
};

// تحويل filterOptions إلى سلسلة استعلام


// استخدام finalParams مع useCoupon
const { data, isError, error } = useCoupon(initialParams);
    console.log(data);
    const { mutate: deleteCouponMutation } = useDeleteCouponMutation();



  const dataInPage = dataFiltered.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage);

  const denseHeight = dense ? 52 : 72;

  const isFiltered = filterName !== '' || filterRole !== `${translate('coupon.all')}`|| filterStatus !== `${translate('coupon.all')}`;

  const isNotFound =
    (!dataFiltered.length && !!filterName) ||
    (!dataFiltered.length && !!filterRole) ||
    (!dataFiltered.length && !!filterStatus);

  const handleOpenConfirm = () => {
    setOpenConfirm(true);
  };

  const handleCloseConfirm = () => {
    setOpenConfirm(false);
  };

  const handleFilterStatus = (event, newValue) => {
    setPage(0);
    setFilterStatus(newValue);
  };

  const handleFilterName = (event) => {
    setPage(0);
    setFilterName(event.target.value);
  };

  const handleFilterRole = (event) => {
    setPage(0);
    setFilterRole(event.target.value);
  };
const [total, settotal] = useState(data?.total);
  useEffect(() => {
    if(data){
      settotal(data?.total)
  
    }
  }, [data])
  const [loading, setLoading] = useState(false);


  const handleDeleteCoupon = (CouponId) => {
    setLoading(true)
    deleteCouponMutation(CouponId, {
      onSuccess: () => {
        // عرض رسالة النجاح باستخدام useSnackbar
        enqueueSnackbar(`${translate('deleteSuccess')}`, { variant: 'success' });
        setLoading(false)
        setOpenConfirm(false)

      },
      onError: (error) => {
        console.error('Error deleting Coupon:', error);
        // عرض رسالة الخطأ باستخدام useSnackbar
        enqueueSnackbar(`${translate('deleteError')}`, { variant: 'error' });
        setLoading(false)

      },
    });
  };
  const handleDeleteRow = (id) => {
    handleDeleteCoupon(id)
  };
  const handleEditRow = (id) => {
    navigate(`/dashboard/coupon/edit${id}`);
  };

  const handleResetFilter = () => {
    setFilterName('');
    setFilterRole(`${translate('coupon.all')}`);
    setFilterStatus(`${translate('coupon.all')}`);
  };




  return (
    <>
      <Helmet>
        <title> User: List | Minimal UI</title>
      </Helmet>

      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={`${translate('coupon.coupon')}`}
          links={[
            { name: `${translate('coupon.Dashboard')}`, href: PATH_DASHBOARD.root },
            { name: `${translate('coupon.coupon')}`, href: PATH_DASHBOARD.Coupon},
            { name: `${translate('coupon.list')}` },
          ]}
          action={
            <Button

              component={RouterLink}
              to="/dashboard/coupon/new"
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              {`${translate('coupon.create')}`}
            </Button>
          }
        />

        <Card>
          <Tabs
            value={filterStatus}
            onChange={handleFilterStatus}
            sx={{
              px: 2,
              bgcolor: 'background.neutral',
            }}
          >
            {STATUS_OPTIONS.map((tab) => (
              <Tab key={tab} label={tab} value={tab} />
            ))}
          </Tabs>

          <Divider />

          <CouponTableToolbar
            isFiltered={isFiltered}
            filterName={filterName}
            filterRole={filterRole}
            onFilterName={handleFilterName}
            onFilterRole={handleFilterRole}
            onResetFilter={handleResetFilter}
          />

          <TableContainer sx={{ position: 'relative', overflow: 'unset' }}>
            <TableSelectedAction
              dense={dense}
              numSelected={selected.length}
              rowCount={tableData.length}
              onSelectAllRows={(checked) =>
                onSelectAllRows(
                  checked,
                  tableData.map((row) => row.id)
                )
              }
              action={
                <Tooltip title={`${translate('coupon.delet')}`}>
                  <IconButton color="primary" onClick={handleOpenConfirm}>
                    <Iconify icon="eva:trash-2-outline" />
                  </IconButton>
                </Tooltip>
              }
            />

            <Scrollbar>
              <Table size={dense ? 'small' : 'medium'} sx={{ minWidth: 800 }}>
                <TableHeadCustom
                  order={order}
                  orderBy={orderBy}
                  headLabel={TABLE_HEAD}
                  rowCount={tableData.length}
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      tableData.map((row) => row.id)
                    )
                  }
                />

                <TableBody>
                  {data?.data.map((row) => (
                      <CouponTableRow
                        key={row.id}
                        row={row}
                        avtar={false}
                        coupon={true}
                        setOpenConfirm={setOpenConfirm}
                        openConfirm={openConfirm}

                        selected={selected.includes(row.id)}
                        onSelectRow={() => onSelectRow(row.id)}
                        onDeleteRow={() => handleDeleteRow(row.id)}
                        onEditRow={() => handleEditRow(row.id)}
                      />
                    ))}

                  {/* <TableEmptyRows
                    height={denseHeight}
                    emptyRows={emptyRows(page, rowsPerPage, tableData.length)}
                  /> */}

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

// ----------------------------------------------------------------------

function applyFilter({ inputData, comparator, filterName, filterStatus, filterRole,translate }) {
  const stabilizedThis = inputData.map((el, index) => [el, index]);

  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  inputData = stabilizedThis.map((el) => el[0]);

  if (filterName) {
    inputData = inputData.filter(
      (user) => user.name.toLowerCase().indexOf(filterName.toLowerCase()) !== -1
    );
  }

  if (filterStatus !== `${translate('coupon.all')}`) {
    inputData = inputData.filter((user) => user.status === filterStatus);
  }

  if (filterRole !== `${translate('coupon.all')}`) {
    inputData = inputData.filter((user) => user.role === filterRole);
  }

  return inputData;
}
