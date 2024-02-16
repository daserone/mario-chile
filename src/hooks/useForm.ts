import { useState, useEffect } from "react";

interface Formulario {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}
/**
 * @params initialState: objeto
 **/
export const useForm = (initialState: Formulario = {}) => {
  const [formulario, setFormulario] = useState<Formulario>(initialState);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  const handleInput: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (isMounted) {
      setFormulario((prev) => ({
        ...prev,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const handleSwitch: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    if (isMounted) {
      setFormulario((prev) => ({
        ...prev,
        [e.target.name]: e.target.checked,
      }));
    }
  };

  const handleProps = (key: string, value: string | boolean) => {
    if (isMounted) {
      setFormulario((prev) => ({ ...prev, [key]: value }));
    }
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleSubmit = (submit: any) => {
    return (event: React.FormEvent<HTMLFormElement>) => {
      event.preventDefault();

      submit(formulario);
    };
  };

  const onReset = () => {
    if (isMounted) {
      setFormulario(initialState);
    }
  };

  const onInsert = (values: Formulario) => {
    if (isMounted) {
      setFormulario(values);
    }
  };

  return {
    value: formulario,
    handleInput,
    handleSwitch,
    handleProps,
    handleSubmit,
    onReset,
    onInsert,
    isMounted,
  };
};
