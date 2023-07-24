import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { mutate: login, isLoading } = useMutation({
    // Dapat wala naka curly brace ang mutationFn
    mutationFn: ({ email, password }) =>
      loginApi({ email, password }, { replace: true }),
    onSuccess: (user) => {
      console.log(user);
      toast.success("Successfully logged in");
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard");
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email or password is incorrect");
    },
  });
  return { login, isLoading };
}

export default useLogin;
