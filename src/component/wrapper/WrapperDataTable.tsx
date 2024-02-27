import DataTable, { createTheme } from "react-data-table-component";
import Alert from "react-bootstrap/Alert";

interface Props {
  title?: string;
  columns: object[];
  isLoading: boolean;
  isError: boolean;
  data: object[];
  recordsTotals: number;
  countPerPage: number;
  setCountPerPage: (params: number) => void;
  page: number;
  setPage: (params: number) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleClick: (params: any) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleDoubleClick: (params: any) => void;
  isExpandable: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  childrenExpandable?: any;
}

const paginationOptions = {
  rowsPerPageText: "Registros:",
  rangeSeparatorText: "de",
  /*noRowsPerPage: false,
  selectAllRowsItem: true,
  selectAllRowsItemText: "Todos",*/
};

const ExpandedTemplateDefault = () => {
  return <div className="m-2">Expanded</div>;
};

export const WrapperDataTable: React.FC<Props> = ({
  title,
  columns,
  isLoading,
  isError,
  data,
  recordsTotals,
  countPerPage,
  setCountPerPage,
  page,
  setPage,
  handleClick,
  handleDoubleClick,
  isExpandable,
  childrenExpandable,
}) => {
  //Handle
  const handlePage = (page: number) => {
    setPage(page);
  };

  const handleCountPerPage = (countPerPage: number) => {
    setCountPerPage(countPerPage);
  };
  //Style
  createTheme(
    "solarized",
    {
      text: {
        primary: "#4B465C",
        secondary: "#4B465C",
      },
      background: {
        default: "#f8f8f8",
        hover: "red",
      },
      divider: {
        default: "#DBDADE",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(198, 198, 198, 0.08)",
        disabled: "rgba(0,0,0,.12)",
      },
      highlightOnHover: {
        default: "#DBDADE",
        text: "rgba(0, 0, 0, 0.87)",
      },
    },
    "dark"
  );
  const customStyles = {
    headCells: {
      style: {
        color: "#4B465C",
        fontWeight: "600",
      },
    },
    hover: {
      when: "even", // 'odd', 'even', 'none'
      style: {
        background: "red", // change the background color on hover
      },
    },
  };

  return (
    <>
      {isError ? (
        <Alert variant="danger" className="p-2 m-2">
          Estamos presentando problemas al procesar tu solicitud.
        </Alert>
      ) : (
        <DataTable
          title={title}
          fixedHeader
          fixedHeaderScrollHeight="600px"
          persistTableHead
          theme="solarized"
          customStyles={customStyles}
          columns={columns}
          progressPending={isLoading}
          data={data}
          highlightOnHover
          responsive
          pagination
          paginationServer
          paginationDefaultPage={page ?? 1}
          paginationTotalRows={recordsTotals || 0}
          paginationPerPage={countPerPage ?? 5}
          paginationComponentOptions={paginationOptions}
          onChangePage={(page) => handlePage(page)}
          onChangeRowsPerPage={(countPerPage) =>
            handleCountPerPage(countPerPage)
          }
          paginationRowsPerPageOptions={[10, 25, 50, 100]}
          noDataComponent="Sin datos para mostrar"
          progressComponent={
            <div>
              <h2>Cargando...</h2>
            </div>
          }
          onRowDoubleClicked={(state) => handleDoubleClick(state)}
          onRowClicked={(state) => handleClick(state)}
          expandableRows={isExpandable}
          expandableRowsComponent={
            childrenExpandable || ExpandedTemplateDefault
          }
        />
      )}
    </>
  );
};
