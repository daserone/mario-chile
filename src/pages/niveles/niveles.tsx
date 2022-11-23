import React, { useState, useEffect } from "react";
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
  IonThumbnail,
  IonSearchbar,
  IonItem,
  IonLabel,
  IonButton,
  IonBadge,
} from "@ionic/react";
import { useHistory, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./niveles.css";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteNivel, getNiveles } from "../../api/nivelesApi";

const Niveles: React.FC = () => {
  const history = useHistory();
  const user = useSelector((state: any) => state.reducerAuth.user);
  const handelNotificaciones = () => {
    history.push("/app/notificaciones");
  };
  //const [niveles, setNiveles] = useState<any>([]);
  const [notificacion, setNotificacion] = useState({
    msg: "",
    estado: false,
  });

  const handleNiveles = (event: any) => {
    history.push("./niveles");
  };

  const handleUsuarios = (event: any) => {
    history.push("./usuarios");
  };

  const handleDetail = (id: any) => {
    history.push(`./nivel/${id}`);
  };

  {/*
  const [data, load] = useFetch(
    "/controller/nivelesback.php",
    "listadoNiveles",
    "1",
    "1",
    ""
  );

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
  }*/}

  const {
    isLoading,
    data: niveles,
    isError,
    error,
  } = useQuery({
    queryKey: ["niveles"],
    queryFn: getNiveles,
    //select: (data) => data.sort((a: { id: number; }, b: { id: number; }) => b.id - a.id),
  });
  const queryClient = useQueryClient();

  const deleteNivelMutation = useMutation({
    mutationFn: deleteNivel,
    onSuccess: () => {
      setNotificacion({
        msg: "Nivel eliminado exitosamente",
        estado: true,
      });
      queryClient.invalidateQueries({ queryKey: ['niveles'] });
    },
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }
  //else if (isError) return <div>{error.message}</div>;

  return (
    <IonPage className="fondo">
      <IonContent fullscreen className="bg-light">
        <IonGrid className="bg-light">
          <IonRow className="pt-4 pb-4 mb-2">
            <IonCol size="2" className="px-3 fs-14 text-white">
              <div className="d-inline">
                <img
                  src="./images/logo-bieni.svg"
                  alt="imagen"
                  className="d-inline"
                  width={25}
                />
                <p className="ml-3 fs-20 font-w600 text-info d-inline">Bieni</p>
              </div>
            </IonCol>
            <IonCol size="7" className="px-3 fs-14 text-white">
              <div
                className="searchContainer d-inline-block"
                style={{ width: "60%" }}
              >
                <form action="">
                  <IonSearchbar
                    placeholder="Buscar..."
                    slot="end"
                    class="px-0 py-0"
                  />
                  <input type="submit" style={{ display: "none" }} />
                </form>
              </div>
            </IonCol>
            <IonCol size="3" className="px-3">
              <div
                className="float-right fs-14 d-flex flex-row"
                onClick={handelNotificaciones}
                style={{ cursor: "pointer" }}
              >
                <div className="align-self-center">
                  <IonImg
                    src={"./images/notificaciones.svg"}
                    className="w-24-p"
                  />
                </div>
                <div className="ml-5 p-perfil-sub">
                  <IonThumbnail slot="start" class="">
                    <img src="./images/sandra.jpg" alt="Laura" />
                  </IonThumbnail>
                </div>
                <div className="ml-3 mr-2">
                  <span className="fs-15 font-w700 text-info d-block">
                    Dra. {}
                    {user.nombre}
                  </span>
                  <span className="text-info font-w600">Ginecología</span>
                </div>
              </div>
            </IonCol>
          </IonRow>

          <IonRow className="mt-0">
            <IonCol size="2" className="pl-0 pr-3">
              {/*<Nav/>*/}

              <div className="px-3 py-5 bg-info-alt border-menu menu-principal height-vh-content">
                <IonItem
                  lines="none"
                  button
                  onClick={() => {}}
                  className="mb-3"
                >
                  <IonImg
                    src={"./images/afiliados-light.svg"}
                    className="mr-3"
                    style={{ width: "20px" }}
                  />
                  <IonLabel>Mis pacientes</IonLabel>
                </IonItem>
                <IonItem
                  lines="none"
                  button
                  onClick={() => {}}
                  className="mb-3"
                >
                  <IonImg
                    src={"./images/doctor-light.svg"}
                    className="mr-3"
                    style={{ width: "20px" }}
                  />
                  <IonLabel>Perfil</IonLabel>
                </IonItem>
                <IonItem
                  lines="none"
                  button
                  onClick={() => {}}
                  className="mb-3"
                >
                  <IonImg
                    src={"./images/configuracion.svg"}
                    className="mr-2"
                    style={{ width: "26px" }}
                  />
                  <IonLabel>Soporte</IonLabel>
                </IonItem>
                <IonItem
                  lines="none"
                  button
                  onClick={handleNiveles}
                  className="mb-3 active"
                >
                  <IonImg
                    src={"./images/configuracion.svg"}
                    className="mr-2"
                    style={{ width: "26px" }}
                  />
                  <IonLabel>Niveles</IonLabel>
                </IonItem>
                <IonItem
                  lines="none"
                  button
                  onClick={handleUsuarios}
                  className="mb-3"
                >
                  <IonImg
                    src={"./images/configuracion.svg"}
                    className="mr-2"
                    style={{ width: "26px" }}
                  />
                  <IonLabel>Usuarios</IonLabel>
                </IonItem>
                <IonItem
                  lines="none"
                  button
                  onClick={() => {}}
                  className="mb-3"
                >
                  <IonImg
                    src={"./images/cerrar-sesion.svg"}
                    className="mr-3"
                    style={{ width: "20px" }}
                  />
                  <IonLabel>Cerrar sesi&oacute;n</IonLabel>
                </IonItem>
              </div>
            </IonCol>
            <IonCol size="10" className="px-3">
              <div className="pb-2">
                <IonButton
                  className="btn-outline text-info fs-12"
                  fill="outline"
                  onClick={() => {
                    handleDetail('nuevo');
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
                        <th scope="col">Estado</th>
                        <th scope="col">Acciones</th>
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
                              <div className="d-flex flex-row">
                                <Link to={`./${item.id}`} className="btn mr-1">
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
                                  className="btn btn-delete-nivel"
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
    </IonPage>
  );
};

export default Niveles;
