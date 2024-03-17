import { useState } from "react";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import { ResponseNotificacion } from "@src/models/response.model";

interface FileState {
  name: string;
  uid: string;
  progress: number;
  estado: "espera" | "aprobado" | "cancelado";
  msg?: string;
}

interface UseLoadingReturn {
  onUploadFile: (e: React.ChangeEvent<HTMLInputElement>) => void;
  files: Record<string, FileState>;
}

interface ServiceFunction {
  post: (
    path: string,
    data: FormData,
    config?: AxiosRequestConfig
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ) => Promise<AxiosResponse<any>>;
}

export const useLoadingFile = (
  service: ServiceFunction,
  path: string,
  formulario: FormData
): UseLoadingReturn => {
  const [files, setFiles] = useState<Record<string, FileState>>({});

  const onUploadFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files) return;

    Array.from(e.target.files).forEach(handleFileUpload);
  };

  const handleFileUpload = async (file: File) => {
    //Uuid
    const uid = new Date().getTime().toString();

    const updateFileState = (state: FileState) => {
      setFiles((prevFiles) => ({ ...prevFiles, [uid]: state }));
    };

    const getFileState = (
      progress: number,
      estado: FileState["estado"],
      msg?: string
    ): FileState => ({
      name: file.name,
      uid,
      progress,
      estado,
      msg,
    });

    updateFileState(getFileState(0, "espera"));

    try {
      formulario.append("file", file);
      formulario.append("uuid", uid);
      const resp = await service.post(path, formulario, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        onUploadProgress: (event: any) => {
          const progress = Math.round((event.loaded * 100) / event.total);
          updateFileState(getFileState(progress, "espera"));
        },
      });

      if (resp.data) {
        const { responseCode, message }: ResponseNotificacion = resp.data;
        if (responseCode === 1) {
          updateFileState(getFileState(100, "aprobado"));
        } else if (responseCode === 2) {
          updateFileState(getFileState(25, "cancelado", message));
        }
      }
    } catch (error) {
      console.error("Error al cargar el archivo:", error);
      updateFileState(getFileState(25, "cancelado"));
    }
  };

  return { onUploadFile, files };
};
