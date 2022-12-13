import React, { useState } from "react";
import {
  IonGrid,
  IonRow,
  IonCol,
  IonCard,
  IonCardContent,
  IonContent,
  IonPage,
  IonImg,
  IonToast,
  IonButton,
} from "@ionic/react";
import { useHistory, Link } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { NavLateral, HeaderInterior } from "../../components";
import { deleteNivel, getNiveles } from "../../api/nivelesApi";
import "./niveles.css";
const Niveles: React.FC = () => {
  const history = useHistory();
  const [notificacion, setNotificacion] = useState({
    msg: "",
    estado: false,
  });

  const handleDetail = (id: any) => {
    history.push(`./nivel/${id}`);
  };

  const queryClient = useQueryClient();

  const {
    data: niveles,
    error,
    isLoading,
    isFetching,
  } = useQuery({
    queryKey: ["niveles"],
    queryFn: getNiveles,
    //select: (data) => data.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id),
  });

  const deleteNivelMutation = useMutation({
    mutationFn: deleteNivel,
    onSuccess: () => {
      setNotificacion({
        msg: "Nivel eliminado exitosamente",
        estado: true,
      });
      //queryClient.invalidateQueries({ queryKey: ['niveles'] });
      queryClient.invalidateQueries(["niveles"]);
    },
  });

  if (isLoading) {
    return (
      <IonPage className="fondo">
        <IonContent fullscreen className="bg-light">
          <IonGrid className="bg-light">
            <IonRow
              className="pt-4 pb-4 mb-2 ion-justify-content-center"
              style={{
                height: "100vh",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <span className="spinner-border mb-4"></span>
                <h1>Cargando....</h1>
              </div>
            </IonRow>
          </IonGrid>
        </IonContent>
      </IonPage>
    );
  }
  //if (error) return <div>{error.message}</div>;

  return (
    <IonPage className="fondo">
      <IonContent fullscreen className="bg-light">
        <IonGrid className="bg-light">
          <HeaderInterior />
          <IonRow className="mt-0">
            <NavLateral />
            <IonCol size="10" className="px-3">
              <div className="pb-2">
                <IonButton
                  className="btn-outline text-info fs-12"
                  fill="outline"
                  onClick={() => {
                    handleDetail("nuevo");
                  }}
                >
                  <IonImg
                    src={"./images/descargar.svg"}
                    className="mr-2"
                    style={{ width: "16px" }}
                  />
                  Nuevo
                </IonButton>
                <IonButton
                  className="btn-outline text-info fs-12"
                  fill="outline"
                >
                  <IonImg
                    src={"./images/descargar.svg"}
                    className="mr-2"
                    style={{ width: "16px" }}
                  />
                  Exportar (Excel)
                </IonButton>

                {isFetching && <span className="spinner-border"></span>}

                <div className="float-right">
                  <IonButton
                    className="button-deg-gen fs-12 mr-2"
                    fill="outline"
                  >
                    <IonImg
                      src={"./images/filtrar.svg"}
                      className="mr-2 filter-white"
                      style={{ width: "16px" }}
                    />
                    Filtrar
                  </IonButton>
                  <IonButton className="button-deg-gen fs-12" fill="outline">
                    <IonImg
                      src={"./images/ordenar.svg"}
                      className="mr-2 filter-white"
                      style={{ width: "16px" }}
                    />
                    Ordenar
                  </IonButton>
                </div>
              </div>
              <IonCard className="m-0 card-slide shadow-full">
                <IonCardContent className="card-content-slide height-vh-con-table">
                  <table className="table table-striped">
                    <thead className="text-gray">
                      <tr>
                        <th scope="col">ID</th>
                        <th scope="col">Nombre</th>
                        <th scope="col">Descripci&oacute;n</th>
                        <th scope="col" className="text-center">
                          Estado
                        </th>
                        <th scope="col" className="text-center">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="fs-13 font-w500">
                      {niveles.length === 0 ? (
                        <IonCard className="m-0 mb-4 card-slide w-100">
                          <IonCardContent className="card-content-slide">
                            <div className="my-2 text-center">
                              Sin resultados
                            </div>
                          </IonCardContent>
                        </IonCard>
                      ) : (
                        niveles.map((item: any) => (
                          <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.nombre}</td>
                            <td>{item.descripcion}</td>
                            <td className="text-center">{item.estado}</td>
                            <td>
                              <div className="d-flex justify-content-center">
                                <Link to={`./nivel/${item.id}`} className="">
                                  <IonImg
                                    src={"./images/editar.svg"}
                                    className="mr-2 cursor-pointer"
                                    style={{ width: "19px" }}
                                  />
                                </Link>
                                <button
                                  onClick={() => {
                                    deleteNivelMutation.mutate(item.id);
                                  }}
                                  className="btn btn-delete-nivel p-0"
                                  disabled={item.isDeleting}
                                >
                                  {item.isDeleting ? (
                                    <span className="spinner-border spinner-border-sm"></span>
                                  ) : (
                                    <IonImg
                                      src={"./images/eliminar.svg"}
                                      className="cursor-pointer text-danger"
                                      style={{ width: "19px" }}
                                    />
                                  )}
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </IonCardContent>
              </IonCard>
            </IonCol>
          </IonRow>
        </IonGrid>
        <IonToast
          isOpen={notificacion.estado}
          onDidDismiss={() =>
            setNotificacion({ ...notificacion, estado: false })
          }
          message={notificacion.msg}
          duration={500}
        />
      </IonContent>

      {/*<Loading text="Cargando" show={true} />*/}
    </IonPage>
  );
};

export default Niveles;

/*

 useEffect(() => {
    nivelService.getAll().then((x) => setNiveles(x.data));
  }, []);

  function deleteNivel(id: any) {
    setNiveles(
      niveles.map((x: any) => {
        if (x.id === id) {
          x.isDeleting = true;
        }
        return x;
      })
    );
    nivelService.delete(id).then(() => {
      console.log(id);
      setNiveles((niveles: any[]) => niveles.filter((x) => x.id !== id));
    });
  }*/
