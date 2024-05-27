import useCompanies from "@src/hooks/useCompanies";
import { getProducts, getSingleProduct } from "@src/services/products.service";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { Row, Col, Card } from "react-bootstrap";
import { useParams } from "react-router-dom";
// @ts-ignore
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
import { formatPrice } from "@src/helpers/helpers";

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
  const [product, setProduct] = useState<any>(null);

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
    // [{
    //     original: "https://picsum.photos/id/1018/1000/600/",
    //     thumbnail: "https://picsum.photos/id/1018/250/150/",
    //   },
    //   {
    //     original: "https://picsum.photos/id/1015/1000/600/",
    //     thumbnail: "https://picsum.photos/id/1015/250/150/",
    //   },
    //   {
    //     original: "https://picsum.photos/id/1019/1000/600/",
    //     thumbnail: "https://picsum.photos/id/1019/250/150/",
    //   },]

    let images: any = [];
    product?.product_image?.map((img: any) => {
      images.push({
        original: img.src,
        thumbnail: img.src,
      });
    });
    setImages(images);
    console.log(product);
  }, [product]);

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
                      </div>
                    );
                  })}
                </div>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default ProductDetail;
