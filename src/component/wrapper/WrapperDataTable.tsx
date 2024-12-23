import DataTable, { createTheme } from "react-data-table-component";
import Alert from "react-bootstrap/Alert";
import { useSkin } from "@src/@core/hooks/useSkin";
import React from "react";

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
  handleClick: (params: any) => void;
  handleDoubleClick: (params: any) => void;
  isExpandable: boolean;
  childrenExpandable?: any;
  isSelectable?: boolean;
  handleSelect?: (params: any) => void;
  clearSelectedRows?: boolean;
  contextActions?: React.ReactNode | React.ReactNode[];
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
  isSelectable,
  handleSelect,
  clearSelectedRows,
  contextActions,
}) => {
  //Handle
  const handlePage = (page: number) => {
    setPage(page);
  };

  const handleCountPerPage = (countPerPage: number) => {
    setCountPerPage(countPerPage);
  };

  const { skin, setSkin } = useSkin();

  console.log(skin);

  //Style light
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

  //Style dark

  createTheme(
    "dark-solarized",
    {
      text: {
        primary: "#f8f8f8",
        secondary: "#f8f8f8",
      },
      background: {
        default: "#283046",
        hover: "red",
      },
      divider: {
        default: "#424242",
      },
      action: {
        button: "rgba(0,0,0,.54)",
        hover: "rgba(198, 198, 198, 0.08)",
        disabled: "rgba(0,0,0,.12)",
      },
      highlightOnHover: {
        default: "#37425e",
        text: "rgba(248, 247, 247, 0.87)",
      },
    },
    "dark"
  );

  const customStyles = {
    headCells: {
      style: {
        background: skin === "dark" ? "#37425e" : "#f8f8f8",
        color: skin === "dark" ? "#f8f8f8" : "#4B465C",
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

  //  customCheckbox for datatable

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
          theme={skin === "dark" ? "dark-solarized" : "solarized"}
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
          selectableRows={isSelectable}
          onSelectedRowsChange={handleSelect}
          clearSelectedRows={clearSelectedRows}
          contextActions={contextActions}
        />
      )}
    </>
  );
};
