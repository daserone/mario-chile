import useCompanies from "@src/hooks/useCompanies";
import {
  assignDimensions,
  DimensionsRequest,
  getProducts,
  getSingleProduct,
} from "@src/services/products.service";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
// @ts-ignore
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { formatPrice } from "@src/helpers/helpers";
import { Product } from "@src/models/products.model";
import ModalDimensions from "./components/ModalDimensions";

interface Params {
  company_name: string;
  filter: string;
}

const initial = {
  company_name: "",
  filter: "",
};
const ProductDetail = () => {
  const { name } = useParams<{ name: string }>();
  const [page, setPage] = useState<number>(1);
  const [countPerPage, setCountPerPage] = useState<number>(10);
  const [params, setParams] = useState<Params>(initial);
  const [product, setProduct] = useState<Product | null>(null);
  const [modalDimensions, setModalDimensions] = useState<boolean>(false);

  const { company } = useCompanies();

  const fetchProduct = async () => {
    const response = await getSingleProduct({
      page,
      items: countPerPage,
      ...params,
    });
    setProduct(response.items[0]);

    return response;
  };

  useEffect(() => {
    if (company.name !== "") {
      setPage(1);
      setParams((prev: Params) => ({
        ...prev,
        company_name: company.name,
        filter: name ?? "",
      }));
    }
  }, [company]);

  useEffect(() => {
    if (params.filter === "" || params.filter === undefined) return;
    fetchProduct();
  }, [params]);

  const [images, setImages] = useState<any>([]);

  useEffect(() => {
    let images: any = [];
    product?.product_image?.map((img: any) => {
      images.push({
        original: img.src,
        thumbnail: img.src,
      });
    });
    setImages(images);
    console.log(product, "PRODUCT");
  }, [product]);

  const assignDimensionsToVariant = (form: any) => {
    let body: DimensionsRequest = {
      variant_id: product?.product_variant[0].id!,
      depth: form.depth,
      height: form.height,
      width: form.width,
      weight: form.weight,
    };

    assignDimensions(body)
      .then((response) => {
        console.log(response);
        setModalDimensions(false);
        fetchProduct();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Row>
        <Col>
          <h2 className="mt-3">
            <span className="">{name}</span>
          </h2>
        </Col>
      </Row>
      {/* details here */}

      <Row>
        <Col>
          <Card>
            <Card.Body>
              <div className="d-flex flex-row">
                <div className="col-4">
                  <ImageGallery
                    items={images}
                    showPlayButton={false}
                    showFullscreenButton={true}
                    // showNav={false}
                    showThumbnails={true}
                    // showIndex
                  />
                </div>
                <div className="col-8 ps-3">
                  {/* variants with price  */}
                  <h3> Variantes del producto</h3>
                  {product?.product_variant?.map((variant: any) => {
                    return (
                      <div key={variant.id} className="card border px-2 py-1">
                        {/* sku  */}
                        <div className="col-4">
                          <div className="d-flex flex-column">
                            <h4>SKU:</h4>
                            <p>{variant.sku}</p>
                          </div>
                        </div>
                        {/* price  */}
                        <div className="col-4">
                          <div className="d-flex flex-column">
                            <h4>Precio:</h4>
                            <p>{formatPrice(variant.price)}</p>
                          </div>
                        </div>
                        {/* barcode  */}
                        <div className="col-4">
                          <div className="d-flex flex-column">
                            <h4>Código de barras:</h4>
                            <p>{variant.barcode}</p>
                          </div>
                        </div>
                        {/* dimensions  */}
                        <div className="col-4">
                          <div className="d-flex flex-column">
                            <h4>Dimensiones:</h4>

                            {variant.height === null ||
                            variant.width === null ||
                            variant.depth === null ? (
                              <div className="">
                                <p>Dimensiones no disponibles</p>
                              </div>
                            ) : (
                              <div className="">
                                <p>
                                  Peso: {variant.weight} {variant.weight_unit}
                                </p>
                                <p>Alto: {variant.height} cm</p>
                                <p>Ancho: {variant.width} cm</p>
                                <p>Largo: {variant.depth} cm</p>
                              </div>
                            )}
                          </div>
                          {/* assign button  */}
                          <div className="d-flex flex-row">
                            <button
                              className="btn btn-primary"
                              onClick={() => setModalDimensions(true)}
                            >
                              Asignar dimensiones
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
      <ModalDimensions
        isOpen={modalDimensions}
        handleClose={() => setModalDimensions(false)}
        saveDimensions={(form) => {
          assignDimensionsToVariant(form);
        }}
      />
    </>
  );
};

export default ProductDetail;
