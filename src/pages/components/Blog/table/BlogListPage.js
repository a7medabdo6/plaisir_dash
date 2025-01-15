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
import { BlogTagTableRow, BlogTagTableToolbar } from './list';
import useBlogList from './useBlogList';
export default function BlogListPage() {
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
    filterOptions: { searchKey: 'title_en', searchValue: filterName },
  };
  const { loading, total, data, isFiltered, handleDeleteBlogTag } = useBlogList(
    initialParams,
    pageCount,
    filterName,
    filterRole,
    filterStatus
  );
  const TABLE_HEAD = [
    { id: 'photo', label: `${translate('bloging.photo')}`, align: 'left' },
    { id: 'title_ar', label: `${translate('bloging.title_ar')}`, align: 'left' },
    { id: 'title_en', label: `${translate('bloging.title_en')}`, align: 'left' },
    { id: 'desc_ar', label: `${translate('bloging.desc_ar')}`, align: 'left' },
    { id: 'desc_en', label: `${translate('bloging.desc_en')}`, align: 'left' },
    { id: 'content_ar', label: `${translate('bloging.content_ar')}`, align: 'left' },
    { id: 'content_en', label: `${translate('bloging.content_en')}`, align: 'left' },
    { id: 'tags', label: `${translate('bloging.tags')}`, align: 'left' },
    { id: 'most popular', label: `${translate('bloging.most_popular')}`, align: 'left' },

  ];

  const [openConfirm, setOpenConfirm] = useState(false);

  const handleFilterName = (event) => {
    setFilterName(event.target.value);
  };

  const handleDeleteRow = (id) => {
    handleDeleteBlogTag(id)
  };
  const handleEditRow = (id) => {
    navigate(PATH_DASHBOARD.blog.edit(id));
  };

  const handleResetFilter = () => {
    setFilterName('');
    setFilterRole(`${translate('BlogNewEditForm.all')}`);
    setFilterStatus(`${translate('bloging.all')}`);
  };

  return (
    <>
      <Helmet>
        <title> Blog: List | Plaissir UI</title>
      </Helmet>
      <Container maxWidth={themeStretch ? false : 'lg'}>
        <CustomBreadcrumbs
          heading={`${translate('bloging.Blog')}`}
          links={[
            { name: `${translate('bloging.dashboard')}`, href: PATH_DASHBOARD.root },
            { name: `${translate('bloging.blog')}`, href: PATH_DASHBOARD.Blog },
            { name: `${translate('bloging.list')}` },
          ]}
          action={
            <Button
              component={RouterLink}
              to="/dashboard/Blog/new"
              variant="contained"
              startIcon={<Iconify icon="eva:plus-fill" />}
            >
              {`${translate('bloging.create')}`}
            </Button>
          }
        />
        <Card>
          <Divider />
          <BlogTagTableToolbar
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
                    <BlogTagTableRow
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
