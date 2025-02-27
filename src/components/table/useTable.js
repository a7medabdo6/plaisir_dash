// import { useState, useCallback } from 'react';

// // ----------------------------------------------------------------------

// export default function useTable(props) {
//   const [dense, setDense] = useState(!!props?.defaultDense);

//   const [orderBy, setOrderBy] = useState(props?.defaultOrderBy || 'name');

//   const [order, setOrder] = useState(props?.defaultOrder || 'asc');

//   const [page, setPage] = useState(props?.defaultCurrentPage || 0);
//   const [limit, setLimit] = useState(5);
//   const [offset, setOffset] = useState(0);
//   const [rowsPerPage, setRowsPerPage] = useState(props?.defaultRowsPerPage || 5);

//   const [selected, setSelected] = useState(props?.defaultSelected || []);

//   const onSort = useCallback(
//     (id) => {
//       const isAsc = orderBy === id && order === 'asc';
//       if (id !== '') {
//         setOrder(isAsc ? 'desc' : 'asc');
//         setOrderBy(id);
//       }
//     },
//     [order, orderBy]
//   );

//   const onSelectRow = useCallback(
//     (id) => {
//       const selectedIndex = selected.indexOf(id);

//       let newSelected = [];

//       if (selectedIndex === -1) {
//         newSelected = newSelected.concat(selected, id);
//       } else if (selectedIndex === 0) {
//         newSelected = newSelected.concat(selected.slice(1));
//       } else if (selectedIndex === selected.length - 1) {
//         newSelected = newSelected.concat(selected.slice(0, -1));
//       } else if (selectedIndex > 0) {
//         newSelected = newSelected.concat(
//           selected.slice(0, selectedIndex),
//           selected.slice(selectedIndex + 1)
//         );
//       }
//       setSelected(newSelected);
//     },
//     [selected]
//   );

//   const onSelectAllRows = useCallback((checked, newSelecteds) => {
//     if (checked) {
//       setSelected(newSelecteds);
//       return;
//     }
//     setSelected([]);
//   }, []);

//   const onChangePage = useCallback((event, newPage) => {
//     setPage(newPage);
//   }, []);

//   const onChangeRowsPerPage = useCallback((event) => {
//     setPage(0);
//     setRowsPerPage(parseInt(event.target.value, 10));
//   }, []);

//   const onChangeDense = useCallback((event) => {
//     setDense(event.target.checked);
//   }, []);

//   return {
//     dense,
//     order,
//     page,
//     orderBy,
//     rowsPerPage,
//     //
//     selected,
//     onSelectRow,
//     onSelectAllRows,
//     //
//     onSort,
//     onChangePage,
//     onChangeDense,
//     onChangeRowsPerPage,
//     //
//     setPage,
//     setDense,
//     setOrder,
//     setOrderBy,
//     setSelected,
//     setRowsPerPage,
//   };
// }

import { useState, useCallback, useEffect } from 'react';

// ----------------------------------------------------------------------

export default function useTable(props) {
  const [dense, setDense] = useState(!!props?.defaultDense);
  const [orderBy, setOrderBy] = useState(props?.defaultOrderBy || 'name');

  const [order, setOrder] = useState(props?.defaultOrder || 'asc');

  const [page, setPage] = useState(props?.defaultCurrentPage || 0);
  const [pageCount, setpageCount] = useState(1);

  const [rowsPerPage, setRowsPerPage] = useState(props?.defaultRowsPerPage || 5);
  const [offset,setOffset] = useState() // Calculate offset based on page and rowsPerPage

  const [selected, setSelected] = useState(props?.defaultSelected || []);

  // Update offset whenever page or rowsPerPage (limit) changes
  useEffect(() => {
    setOffset(page * rowsPerPage);
  }, [page, rowsPerPage]);

  const onSort = useCallback(
    (id) => {
      const isAsc = orderBy === id && order === 'asc';
      if (id !== '') {
        setOrder(isAsc ? 'desc' : 'asc');
        setOrderBy(id);
      }
    },
    [order, orderBy]
  );

  const onSelectRow = useCallback(
    (id) => {
      const selectedIndex = selected.indexOf(id);

      let newSelected = [];

      if (selectedIndex === -1) {
        newSelected = newSelected.concat(selected, id);
      } else if (selectedIndex === 0) {
        newSelected = newSelected.concat(selected.slice(1));
      } else if (selectedIndex === selected.length - 1) {
        newSelected = newSelected.concat(selected.slice(0, -1));
      } else if (selectedIndex > 0) {
        newSelected = newSelected.concat(
          selected.slice(0, selectedIndex),
          selected.slice(selectedIndex + 1)
        );
      }
      setSelected(newSelected);
    },
    [selected]
  );

  const onSelectAllRows = useCallback((checked, newSelecteds) => {
    if (checked) {
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  }, []);

  const onChangePage = useCallback((event, newPage) => {
    // Update page state
    setPage(newPage);
    setpageCount(newPage+ 1)
    
    


  }, [rowsPerPage, ]);
  

  const onChangeRowsPerPage = useCallback((event) => {
    setPage(0);
    setRowsPerPage(parseInt(event.target.value, 10));
  }, []);

  const onChangeDense = useCallback((event) => {
    setDense(event.target.checked);
  }, []);

  return {
    dense,
    order,
    page,
    orderBy,
    rowsPerPage,
    //
    selected,
    onSelectRow,
    onSelectAllRows,
    //
    onSort,
    onChangePage,
    onChangeDense,
    onChangeRowsPerPage,
    //
    setPage,
    setDense,
    setOrder,
    setOrderBy,
    setSelected,
    setRowsPerPage,
    pageCount, setpageCount,
    //
    offset,  // Include offset in the returned values
  };
}

