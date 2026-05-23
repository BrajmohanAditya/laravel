import { useState } from "react";
import { registerUserAPI } from "@/app/api/auth.api";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";

export const useRegisterHook = () => {
  const [isPending, setIsPending] = useState(false);

  const mutate = async (data: any, setError: any) => {
    setIsPending(true);
    // Supplying name parameter from username to prevent backend 422 error since it was removed from UI
    const payload = { ...data, name: data.username };

    try {
      const res = await registerUserAPI(payload);
      const response = res.data;
      setIsPending(false);
      toast.success("Account created successfully!");
      if (response?.status == 200 || response?.status == 201) {
        signIn("credentials", {
          email: data.email,
          password: data.password,
          redirect: true,
          callbackUrl: "/",
        });
      }
    } catch (err: any) {
      setIsPending(false);
      if (err.response?.status == 422) {
        const apiErrors = err.response?.data?.errors;
        Object.keys(apiErrors).forEach((key) => {
          setError(key, { type: "server", message: apiErrors[key][0] });
        });
      } else {
        toast.error("Something went wrong. Please try again!");
      }
    }
  };

  return { mutate, isPending };
};
