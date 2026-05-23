"use client";
import { useState } from "react";
import { REGISTER_URL } from "@/lib/apiEndPoints";
import { toast } from "react-toastify";
import { signIn } from "next-auth/react";
import myAxios from "@/lib/axios.config";
import { useForm } from "react-hook-form";
import { User, Mail, Lock, Loader2, GraduationCap } from "lucide-react";

export default function Register({ toggleAuth }: { toggleAuth: () => void }) {
  const [loading, setLoading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
  } = useForm();

  const registerFormHandler = async (data: any) => {
    setLoading(true);
    await myAxios
      .post(REGISTER_URL, data)
      .then((res) => {
        const response = res.data;
        setLoading(false);
        toast.success("Account created successfully!");
        if (response?.status == 200 || response?.status == 201) {
          signIn("credentials", {
            email: data.email,
            password: data.password,
            redirect: true,
            callbackUrl: "/",
          });
        }
      })
      .catch((err) => {
        setLoading(false);
        if (err.response?.status == 422) {
          const apiErrors = err.response?.data?.errors;
          Object.keys(apiErrors).forEach((key) => {
            setError(key, { type: "server", message: apiErrors[key][0] });
          });
        } else {
          toast.error("Something went wrong. Please try again!");
        }
      });
  };

  return (
    <div className="w-full bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
      <div className="text-center mb-8">
        <div className="w-14 h-14 mx-auto mb-3 rounded-xl bg-indigo-600 text-white flex items-center justify-center text-2xl font-bold">
          <GraduationCap className="w-8 h-8 animate-bounce" />
        </div>
        <h1 className="text-2xl font-bold text-gray-900">Signup Account</h1>
        <p className="text-sm text-gray-500 mt-1">
          Join us and start your journey
        </p>
      </div>

      <form
        onSubmit={handleSubmit(registerFormHandler)}
        className="space-y-5"
      >
        {/* Full Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Full Name
          </label>
          <div className="relative">
            <User
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="John Doe"
              {...register("name", { required: "Name is required" })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>
          {errors.name && (
            <span className="text-red-500 text-xs mt-1 block">
              {(errors.name as any).message}
            </span>
          )}
        </div>

        {/* Username */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Username
          </label>
          <div className="relative">
            <User
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="text"
              placeholder="johndoe123"
              {...register("username", { required: "Username is required" })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>
          {errors.username && (
            <span className="text-red-500 text-xs mt-1 block">
              {(errors.username as any).message}
            </span>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email Address
          </label>
          <div className="relative">
            <Mail
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="email"
              placeholder="you@example.com"
              {...register("email", { required: "Email is required" })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>
          {errors.email && (
            <span className="text-red-500 text-xs mt-1 block">
              {(errors.email as any).message}
            </span>
          )}
        </div>

        {/* Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="password"
              placeholder="••••••••"
              {...register("password", { required: "Password is required" })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>
          {errors.password && (
            <span className="text-red-500 text-xs mt-1 block">
              {(errors.password as any).message}
            </span>
          )}
        </div>

        {/* Confirm Password */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Confirm Password
          </label>
          <div className="relative">
            <Lock
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              type="password"
              placeholder="••••••••"
              {...register("password_confirmation", {
                required: "Confirm Password is required",
              })}
              className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition"
            />
          </div>
          {errors.password_confirmation && (
            <span className="text-red-500 text-xs mt-1 block">
              {(errors.password_confirmation as any).message}
            </span>
          )}
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full py-3 rounded-xl bg-indigo-600 text-white font-semibold hover:bg-indigo-700 transition-all disabled:opacity-60 flex items-center justify-center"
        >
          {loading ? (
            <Loader2 className="animate-spin mr-2" size={20} />
          ) : (
            "Create Account"
          )}
        </button>
      </form>

      {/* Footer */}
      <p className="text-sm text-center text-gray-600 mt-6">
        Already have an account?{" "}
        <span
          onClick={toggleAuth}
          className="text-indigo-600 font-medium hover:underline cursor-pointer"
        >
          Login
        </span>
      </p>
    </div>
  );
}

