import { faClose } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  getCities,
  getDistricts,
  getProvinces,
} from "@src/services/orders.service";
import React, { useEffect, useState } from "react";
import { Button, Form, Offcanvas } from "react-bootstrap";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

interface ModalDistrictsProps {
  isOpen: boolean;
  handleClose: () => void;
  saveDistrict: (districtId: string) => void;
  provinceId: string;
  cityId: string;
}

interface FormValues {
  province_id: string;
  city_id: string;
  district_id: string;
}

function ModalDistricts({
  isOpen,
  handleClose,
  saveDistrict,
  provinceId,
  cityId,
}: ModalDistrictsProps) {
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    control,
    getValues,
    watch,
    formState: { errors },
  } = useForm<FormValues>({
    defaultValues: {
      province_id: provinceId,
      city_id: cityId,
      district_id: "",
    },
  });

  const [province_id, city_id] = watch(["province_id", "city_id"]);

  const onSubmit = (form: FormValues) => {
    saveDistrict(districts.find((d) => d.name === form.district_id)?.id);
    reset();
    handleClose();
  };

  const [provinces, setProvinces] = useState<any[]>([]);
  const [cities, setCities] = useState<any[]>([]);
  const [districts, setDistricts] = useState<any[]>([]);

  const fetchProvinces = async () => {
    getProvinces().then((data) => {
      console.log("province", data);

      setProvinces(data.provinces);
      provinceId !== "" && setValue("province_id", provinceId);
    });
  };

  const fetchCities = async (provinceId: string) => {
    getCities(provinceId).then((data) => {
      console.log("city", data);

      setCities(data.cities);
    });
  };

  const fetchDistricts = async (cityId: string) => {
    getDistricts(cityId).then((data) => {
      console.log("district", data);
      setDistricts(data.districts);
    });
  };

  useEffect(() => {
    fetchProvinces();
  }, []);

  useEffect(() => {
    console.log(provinceId, province_id);

    if (province_id === "") return;
    fetchCities(province_id);
  }, [province_id]);

  useEffect(() => {
    if (city_id === "") return;
    fetchDistricts(city_id);
  }, [city_id]);

  return (
    <>
      <Offcanvas show={isOpen} onHide={handleClose} placement="end">
        <Offcanvas.Header>
          <Offcanvas.Title>
            <h2>Asignar distrito</h2>
          </Offcanvas.Title>
          <div className="btn-close" onClick={handleClose}>
            <FontAwesomeIcon icon={faClose} />
          </div>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <div className="d-flex flex-column">
            <div className="col-12">
              <Form onSubmit={handleSubmit(onSubmit)}>
                <Form.Group className="mb-3" controlId="province_id">
                  <Form.Label>Provincia</Form.Label>
                  <Form.Select {...register("province_id", { required: true })}>
                    <option value="">Seleccionar</option>
                    {provinces.map((province: any) => (
                      <option key={province.id} value={province.name}>
                        {province.name}
                      </option>
                    ))}
                  </Form.Select>
                  {errors.province_id && (
                    <Form.Text className="text-danger">
                      Este campo es requerido
                    </Form.Text>
                  )}
                </Form.Group>
                {/* cities  */}
                <Form.Group className="mb-3" controlId="city_id">
                  <Form.Label>Ciudad</Form.Label>
                  <Form.Select {...register("city_id", { required: true })}>
                    <option value="">Seleccionar</option>
                    {cities.map((city: any) => (
                      <option key={city.id} value={city.name}>
                        {city.name}
                      </option>
                    ))}
                  </Form.Select>
                  {errors.city_id && (
                    <Form.Text className="text-danger">
                      Este campo es requerido
                    </Form.Text>
                  )}
                </Form.Group>
                {/* districts  */}
                <Form.Group className="mb-3" controlId="district_id">
                  <Form.Label>Distrito</Form.Label>
                  <Form.Select {...register("district_id", { required: true })}>
                    <option value="">Seleccionar</option>
                    {districts.map((district: any) => (
                      <option key={district.id} value={district.name}>
                        {district.name}
                      </option>
                    ))}
                  </Form.Select>
                  {errors.district_id && (
                    <Form.Text className="text-danger">
                      Este campo es requerido
                    </Form.Text>
                  )}
                </Form.Group>

                <Button variant="primary" type="submit">
                  Guardar
                </Button>
              </Form>
            </div>
          </div>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}

export default ModalDistricts;
