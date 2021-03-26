import {
  useToast as useInternalToast,
  UseToastOptions,
} from "@chakra-ui/react";

export const useToast = () => {
  const toast = useInternalToast();

  return {
    toast: (options?: UseToastOptions) =>
      toast({
        isClosable: true,
        position: "top",
        duration: options?.status === "error" ? 10000 : undefined,
        ...options,
      }),
    closeAll: toast.closeAll,
  };
};
