import { Helmet } from 'react-helmet-async';
import { useEffect, useState } from 'react';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import {
  Card,
  Table,
  Button,
  Divider,
  TableBody,
  Container,
  TableContainer,
} from '@mui/material';
import { PATH_DASHBOARD } from '../../../../routes/paths';
import { _userList, _CompanysList } from '../../../../_mock/arrays';
import Iconify from '../../../../components/iconify';
import Scrollbar from '../../../../components/scrollbar';
import CustomBreadcrumbs from '../../../../components/custom-breadcrumbs';
import { useSettingsContext } from '../../../../components/settings';
import {
  useTable,
  TableHeadCustom,
  TablePaginationCustom,
} from '../../../../components/table';
import { useLocales } from '../../../../locales';
import { CompanyTableRow, CompanyTableToolbar } from './list';
import useCompanyList from './useCompanyList';
export default function CompanysListPage() {
  const {
    dense,
    page,
    order,
    orderBy,
    rowsPerPage,
    pageCount,
    selected,
    onSelectRow,
    onSelectAllRows,
    onSort,
    onChangeDense,
    onChangePage,
    onChangeRowsPerPage,
  } = useTable();
  const { translate } = useLocales();
  const [filterName, setFilterName] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const { themeStretch } = useSettingsContext();
  const navigate = useNavigate();
  const initialParams = {
    orderBy: 'id',
    order: 'desc',
    limit: 5,
    page: pageCount,
    filterOptions: { searchKey: 'name_en', searchValue: filterName },
  };
  const { loading, total, data, isFiltered, handleDeleteCompany } = useCompanyList(
    initialParams,
    pageCount,
    filterName,
    filterRole,
    filterStatus
  );
  const TABLE_HEAD = [
    { id: 'commercial_name_ar', label: `${translate('Companys.commercial_name_ar')}`, align: 'left' },
    { id: 'commercial_name_en', label: `${translate('Companys.commercial_name_en')}`, align: 'left' },
    { id: 'locaton', label: `${translate('Companys.locaton')}`, align: 'left' },
    { id: '' },
  ];
  const [openConfirm, setOpenConfirm] = useState(false);
  
  const handleFilterName = (event) => {
    setFilterName(event.target.value);
  };

  const handleDeleteRow = (id) => {
    console.log(id);
    
    // handleDeleteCompany(id)
  };
  const handleEditRow = (id) => {
    navigate(`/dashboard/company/edit${id}`);
  };

  const handleResetFilter = () => {
    setFilterName('');
    setFilterRole(`${translate('CompanysNewEditForm.all')}`);
    setFilterStatus(`${translate('Companys.all')}`);
  };

  return (
    <>
      <Helmet>
        <title> Companys: List | Plaissir UI</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={`${translate('Companys.Companys')}`}
          links={[
            { name: `${translate('Companys.Dashboard')}`, href: PATH_DASHBOARD.root },
            { name: `${translate('Companys.Companys')}`, href: PATH_DASHBOARD.Companys },
            { name: `${translate('Companys.list')}` },
          ]}
          action={
            <Button
              component={RouterLink}
              to="/dashboard/Companys/new"
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              {`${translate('Companys.create')}`}
            </Button>
          }
        />
        <Card>
          <Divider />
          <CompanyTableToolbar
            isFiltered={isFiltered}
            filterName={filterName}
            filterRole={filterRole}
            onFilterName={handleFilterName}
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
                  numSelected={selected.length}
                  onSort={onSort}
                  onSelectAllRows={(checked) =>
                    onSelectAllRows(
                      checked,
                      data?.data?.map((row) => row.id)
                    )
                  }
                />
                <TableBody>
                  {data?.data?.map((row) => (
                    <CompanyTableRow
                      key={row.id}
                      row={row}
                      icon={true}
                      loading={loading}
                      openConfirm={openConfirm}
                      setOpenConfirm={setOpenConfirm}
                      selected={selected.includes(row.id)}
                      onSelectRow={() => onSelectRow(row.id)}
                      onDeleteRow={() => handleDeleteRow(row.id)}
                      onEditRow={() => handleEditRow(row.id)}
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
            dense={dense}
            onChangeDense={onChangeDense}
          />
        </Card>
      </Container>
    </>
  );
}
