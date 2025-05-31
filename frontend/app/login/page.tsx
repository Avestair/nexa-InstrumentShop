"use client";

import Link from "next/link";
import { Button } from "../../ui/Button";
import Input from "../../ui/Input";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs = {
  phoneNumber: string;
  password: string;
};

export default function page() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <div className="grid h-full w-full justify-items-center">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="mt-14 grid min-w-[320px] justify-items-center gap-8 rounded-sm border border-gray-100 p-8 shadow-xs md:min-w-[500px]"
      >
        <h1 className="text-medium mb-8 text-2xl">ورود</h1>
        <div className="grid w-full gap-2">
          <label htmlFor="phoneNumber">شماره موبایل</label>
          <Input
            type="text"
            name="phoneNumber"
            {...register("phoneNumber", { required: true })}
          />
          {errors.phoneNumber && (
            <span className="mt-1 text-sm text-red-500">
              شماره موبایل ضروری است!
            </span>
          )}
        </div>

        <div className="grid w-full gap-2">
          <label htmlFor="password">رمز عبور</label>
          <Input
            type=""
            name="password"
            {...register("password", { required: true })}
          />
          <Link href={"/forgot-password"} className="text-xs text-gray-500">
            رمز عبور خود را فراموش کرده اید؟
          </Link>
          {errors.password && (
            <span className="mt-1 text-sm text-red-500">
              رمز عبور ضروروی است!
            </span>
          )}
        </div>
        <Button type="submit" variant="default" className="w-full">
          ورود
        </Button>
      </form>
    </div>
  );
}
