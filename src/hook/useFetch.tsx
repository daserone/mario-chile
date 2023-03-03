import { useState, useEffect } from "react";
import { services } from "../servicios/servicios";
import axio from "axios";

interface DataItem {
  id: number;
  // other properties
}

interface ResponseData {
  data: any[];
  totalResults: number;
  recordsFiltered: number;
}

export function useFetch(
  url: string,
  action: string,
  id: any,
  page: any,
  reload = ""
) {
  const [load, setLoad] = useState(true);
  const [data, setData] = useState<any>([]);
  const [totalResults, settotalResults] = useState(0);
  const [recordsFiltered, setrecordsFiltered] = useState(0);

  function concatState(response: any) {
    setData((prev: any) => [...prev, response]);
  }

  function deletState(id: any) {
    let nuevo = data.filter((item: any) => item.id !== id);
    setData(nuevo);
  }

  const updateState = (item: any) => {
    let nuevo = data.map((items: any) =>
      items.id === item.id ? (items = item) : items
    );
    setData(nuevo);
  };

  useEffect(() => {
    const cancelToken = axio.CancelToken;
    const source = cancelToken.source();
    if (id !== "0") {
      services
        .get(url, {
          params: {
            op: action,
            id: id,
            page: page,
            imestamp: new Date().getTime(),
          },
          responseType: "json",
        })
        .then((rsp: any) => {
          const { data, status } = rsp;
          if (status === 200) {
            if (data.data) {
              setLoad(false);
              setData(data.data);
              settotalResults(data.totalResults);
              setrecordsFiltered(data.recordsFiltered);
            }
          }
        })
        .catch((e: any) => {
          console.warn(e);
        });
    }
    return () => {
      source.cancel("solicitud de axios cancelada");
    };
  }, [id, url, action, page, reload]);

  return [
    data,
    load,
    totalResults,
    recordsFiltered,
    concatState,
    deletState,
    updateState,
  ];
}

/*import axios, { AxiosResponse } from 'axios';
import { useState, useEffect } from 'react';

interface DataItem {
  id: number;
  // other properties
}

interface ResponseData {
  data: DataItem[];
  totalResults: number;
  recordsFiltered: number;
}

export function useFetchData(url: string, action: string, id = '0', page = 1, reload = ''): [DataItem[], boolean, number, number, (item: DataItem) => void, (id: number) => void, (item: DataItem) => void] {
  const [data, setData] = useState<DataItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [totalResults, setTotalResults] = useState(0);
  const [recordsFiltered, setRecordsFiltered] = useState(0);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response: AxiosResponse<ResponseData> = await axios.get(url, {
          params: {
            op: action,
            id,
            page,
            timestamp: new Date().getTime(),
          },
          responseType: 'json',
        });

        const { data: responseData, totalResults: responseTotalResults, recordsFiltered: responseRecordsFiltered } = response.data;

        setData(responseData);
        setTotalResults(responseTotalResults);
        setRecordsFiltered(responseRecordsFiltered);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    if (id !== '0') {
      fetchData();
    }

    return (): void => {
      setData([]);
    };
  }, [url, action, id, page,]
*/
/*
import axios, { AxiosResponse } from 'axios';

interface IFetch {
  (url: string, config?: object): Promise<AxiosResponse<any>>;
}

interface IUseFetch {
  (url: string, fetch?: IFetch): [any[], boolean];
}

const useFetch: IUseFetch = (url, fetch = axios.get) => {
  const [data, setData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let cancel = false;

    const fetchData = async () => {
      try {
        setIsLoading(true);
        const response = await fetch(url);
        if (!cancel) {
          setData(response.data);
          setIsLoading(false);
        }
      } catch (error) {
        console.error(error);
        setIsLoading(false);
      }
    };

    fetchData();

    return () => {
      cancel = true;
    };
  }, [url, fetch]);

  return [data, isLoading];
};

export default useFetch;

const [data, isLoading] = useFetch(url, (url) =>
  fetch(url).then((response) => response.json())
);


return [
    state = data ? data.data : [],
    isLoading = data ? false : true,
    totalResults = data ? data.totalResults : 0,
    recordsFiltered = data ? data.recordsFiltered : 0,
    concatState = concatState || (() => {}),
    deleteState = deleteState || (() => {}),
    updateState = updateState || (() => {})
  ] 


*/
