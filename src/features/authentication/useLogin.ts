import { useMutation, useQueryClient } from "@tanstack/react-query";
import { login as loginApi } from "../../services/apiAuth";
import { useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import { TypeLogin } from "../../types";

export function useLogin() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: login, isLoading } = useMutation({
    mutationFn: ({ email, password }: TypeLogin) =>
      loginApi({ email, password }),
    onSuccess: (user) => {
      toast.success("Login success!");
      queryClient.setQueriesData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log("ERROR", err);
      toast.error("Provided email or password are incorrect");
    },
  });

  return { login, isLoading };
}

// export function useLogin() {
//   const queryClient = useQueryClient();
//   const navigate = useNavigate();

//   const { mutate: login, isLoading } = useMutation({
//     mutationFn: ({ email, password }: TypeLogin) =>
//       loginApi({ email, password }),
//     onSuccess: (user) => {
//       queryClient.setQueryData(["user"], user.user);
//       navigate("/dashboard", { replace: true });
//     },
//     onError: (err) => {
//       console.log("ERROR", err);
//       toast.error("Provided email or password are incorrect");
//     },
//   });

//   return { login, isLoading };
// }
