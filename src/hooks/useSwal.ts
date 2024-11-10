import { getCancelReasons } from "@src/services/orders.service";
import { useCallback } from "react";
import Swal from "sweetalert2";

const useSwal = () => {
  const showAlert = useCallback(
    (
      title: string,
      text: string,
      icon: "success" | "error" | "warning" | "info" | "question"
    ) => {
      Swal.fire({
        title,
        text,
        icon,
        confirmButtonText: "OK",
      });
    },
    []
  );

  const showConfirm = useCallback(
    (
      title: string,
      text: string,
      icon: "warning" | "question",
      confirmButtonText: string = "Yes",
      cancelButtonText: string = "No"
    ) => {
      return Swal.fire({
        title,
        text,
        icon,
        showCancelButton: true,
        confirmButtonText,
        cancelButtonText,
      });
    },
    []
  );

  const showCancelReason = useCallback(
    async (
      title: string,
      text: string,
      icon: "warning" | "question",
      confirmButtonText: string = "Yes",
      cancelButtonText: string = "No"
    ) => {
      const { reasons } = await getCancelReasons();
      // array to input select options
      let options: any = {};
      options = reasons.map((reason: any) => {
        return { [reason]: reason };
      });

      return Swal.fire({
        title,
        text,
        icon,
        showCancelButton: true,
        confirmButtonText,
        cancelButtonText,
        input: "select",
        inputOptions: options,
      });
    },
    []
  );

  const showConfirmWithInput = useCallback(
    (
      title: string,
      text: string,
      icon: "warning" | "question",
      confirmButtonText: string = "Yes",
      cancelButtonText: string = "No",
      inputLabel: string
    ) => {
      return Swal.fire({
        title,
        text,
        icon,
        showCancelButton: true,
        confirmButtonText,
        cancelButtonText,
        input: "text",
        inputLabel: inputLabel,
      });
    },
    []
  );

  return { showAlert, showConfirm, showCancelReason, showConfirmWithInput };
};

export default useSwal;
