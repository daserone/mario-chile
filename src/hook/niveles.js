import { useMutation, useQuery, useQueryClient } from "react-query";
import { createNewNivel, getNivelById, getNiveles } from "../api/niveles";

const key = "niveles";

export function useMutateNivel() {
  const queryClient = useQueryClient();

  return useMutation(createNewNivel, {
    onSuccess: (nivel) => {
      queryClient.setQueryData([key], (prevNiveles) => prevNiveles.concat(nivel));
      queryClient.invalidateQueries([key]);
    },
  });
}

export function useNiveles() {
  return useQuery([key], getNiveles);
}

export function useNivel(nivelId) {
  return useQuery([key, nivelId], () => getNivelById(nivelId));
}