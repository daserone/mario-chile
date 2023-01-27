import DataTable, { createTheme } from "react-data-table-component";
import { paginationOptions } from "./config";
interface Props {
  title: string;
  columnas: any;
  load: boolean;
  data: any[];
  setPage: (params: any) => void;
  recordsTotals: number;
  dobleClic: (params: any) => void;
}

export const Datatable: React.FC<Props> = ({
  title,
  columnas,
  load,
  data,
  setPage,
  recordsTotals,
  dobleClic,
}) => {
  const countPerPage = 10;
  createTheme("solarized", {
    divider: {
      default: "#fff",
    },
  });

  //  Internally, customStyles will deep merges your customStyles with the default styling.
  const customStyles = {
    rows: {
      style: {
        minHeight: "40px", // override the row height
      },
    },
    headCells: {
      style: {
        padding: "0px 6px", // override the cell padding for head cells
      },
    },
    cells: {
      style: {
        padding: "4px 6px", // override the cell padding for data cells
      },
    },
  };

  return (
    <>
      <DataTable
        title={title}
        fixedHeader
        fixedHeaderScrollHeight="600px"
        columns={columnas}
        data={data}
        highlightOnHover
        responsive
        striped
        pagination
        paginationTotalRows={recordsTotals}
        paginationServer
        paginationPerPage={countPerPage}
        paginationComponentOptions={paginationOptions}
        onChangePage={(page) => setPage(page)}
        paginationRowsPerPageOptions={[10, 25, 50, 100]}
        noDataComponent="Sin datos para mostrar"
        progressPending={load}
        progressComponent={
          <div>
            <h2>Cargando...</h2>
          </div>
        }
        theme="solarized"
        customStyles={customStyles}
        onRowDoubleClicked={(state: any) => dobleClic(state)}
        persistTableHead
      />
    </>
  );
};
