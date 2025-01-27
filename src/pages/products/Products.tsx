import { formatPrice } from "@src/helpers/helpers";
import useCompanies from "@src/hooks/useCompanies";
import { getProducts } from "@src/services/products.service";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Row, Col, Card, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import ModalNewProduct from "./components/ModalNewProduct";

interface Params {
  company_name: string;
  filter: string;
}

const initial = {
  company_name: "",
  filter: "",
};

const Products = () => {
  const [page, setPage] = useState<number>(1);
  const [countPerPage, setCountPerPage] = useState<number>(10);
  const [params, setParams] = useState<Params>(initial);
  const [openAddProduct, setOpenAddProduct] = useState<boolean>(false);
  const { data, isError, isLoading } = useQuery({
    queryKey: ["products", page, params],
    queryFn: () => getProducts({ page, items: countPerPage, ...params }),
    placeholderData: keepPreviousData,
    enabled: params.company_name !== "",
  });

  const { company } = useCompanies();

  useEffect(() => {
    if (company.name !== "") {
      setPage(1);
      setParams((prev: Params) => ({
        ...prev,
        company_name: company.name,
      }));
    }
  }, [company]);

  return (
    <>
      <Row>
        <Col>
          <h2 className="mt-3">
            <span className="">Mis Productos </span>
          </h2>
          {/* search  */}
          <div className="row">
            <div className="col-lg-6 col-md-6 col-sm-10">
              <div className="input-group">
                <input
                  type="text"
                  className="form-control"
                  placeholder="Buscar"
                  onChange={(e) =>
                    setParams((prev) => ({
                      ...prev,
                      filter: e.target.value,
                    }))
                  }
                />
                <button className="btn btn-primary">
                  <i className="fa fa-search"></i>
                </button>
              </div>
            </div>
            {/* add product  */}
            <div className="col-lg-6 col-md-6 col-sm-10">
              <Button
                className="btn btn-primary"
                onClick={() => setOpenAddProduct(true)}
              >
                Agregar producto
              </Button>
            </div>
          </div>
          <div className="row gy-4 mb-60 d-flex justify-content-center">
            {(!data || !data?.items || data?.items?.length === 0) && (
              <div className="col-lg-12 pt-5">
                <div className="alert alert-warning p-3" role="alert">
                  <h3 className="text-warning"> No se encontraron productos</h3>
                </div>
              </div>
            )}
            {data?.items?.map((data: any) => {
              const { id, title, product_image, product_id, product_variant } =
                data;
              return (
                <div key={id} className="col-lg-4 col-md-6 col-sm-10 ">
                  <div
                    data-wow-duration="1.5s"
                    data-wow-delay="0.2s"
                    className="eg-card auction-card1 wow animate fadeInDown"
                  >
                    <div className="auction-img">
                      <img
                        alt="image"
                        src={product_image[0]?.src}
                        style={{
                          height: "250px",
                          objectFit: "cover",
                        }}
                      />
                    </div>
                    <div className="auction-content">
                      <h4>
                        <a>{title}</a>
                      </h4>
                      <small>{product_id}</small>

                      <p>
                        {"Precio"} :{" "}
                        <span>{formatPrice(product_variant[0]?.price)}</span>
                      </p>
                      <div className="auction-card-bttm">
                        <Link
                          to={`/products/${title}`}
                          className="btn btn-primary"
                        >
                          Ver producto
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </Col>
      </Row>
      <Row>
        <Col>
          {/* pagination  */}
          {/* data total pages  */}
          {data?.total_pages > 1 && (
            <div className="d-flex justify-content-center flex-wrap">
              <nav aria-label="Page navigation example">
                <ul className="pagination d-flex flex-wrap">
                  <li className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      aria-label="Previous"
                      onClick={() => setPage((prev) => prev - 1)}
                    >
                      <span aria-hidden="true">«</span>
                    </a>
                  </li>
                  {Array.from({ length: data?.total_pages }, (_, i) => (
                    <li
                      key={i}
                      className={`page-item ${page === i + 1 ? "active" : ""}`}
                    >
                      <a
                        className="page-link"
                        href="#"
                        onClick={() => setPage(i + 1)}
                      >
                        {i + 1}
                      </a>
                    </li>
                  ))}
                  <li className="page-item">
                    <a
                      className="page-link"
                      href="#"
                      aria-label="Next"
                      onClick={() => setPage((prev) => prev + 1)}
                    >
                      <span aria-hidden="true">»</span>
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
          )}
        </Col>
      </Row>
      <ModalNewProduct
        isOpen={openAddProduct}
        handleClose={() => setOpenAddProduct(false)}
        saveProduct={(form) => console.log(form)}
      />
    </>
  );
};

export default Products;
