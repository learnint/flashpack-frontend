import { UseMutationResult } from "react-query";
import { useToast } from "components/common";

export const useMutator = () => {
  const { toast, closeAll } = useToast();

  return async <D, E, V, C>(
    mutation: UseMutationResult<D, E, V, C>,
    request: V,
    successMessage: string
  ) => {
    closeAll();
    try {
      await mutation.mutateAsync(request);
      toast({
        title: successMessage,
        status: "success",
      });
      return true;
    } catch (error) {
      toast({
        title: error.message,
        status: "error",
      });
      return false;
    }
  };
};
