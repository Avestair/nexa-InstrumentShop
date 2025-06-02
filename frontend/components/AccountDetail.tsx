import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "../ui/Button";
import Input from "../ui/Input";
import { Inputs } from "../types/FormTypes";

export default function AccountDetails() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>();

  const onSubmit: SubmitHandler<Inputs> = (data) => console.log(data);

  return (
    <section className="mb-8 grid w-[80vw] rounded-lg p-4">
      <h2 className="mb-12 border-b pb-4 text-right text-2xl font-medium text-gray-800">
        جزئیات حساب
      </h2>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="grid w-full grid-cols-1 gap-6 text-right md:grid-cols-2"
      >
        <div className="grid gap-1">
          <label
            htmlFor="name"
            className="mb-2 block px-1 text-sm font-bold text-gray-700"
          >
            نام:
          </label>
          <Input
            type="text"
            id="name"
            name="firstName"
            defaultValue="علی احمدی"
            className="w-full"
            {...register("firstName", { required: true })}
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">نام ضروری است!</p>
          )}
        </div>

        <div className="grid gap-1">
          <label
            htmlFor="name"
            className="mb-2 block px-1 text-sm font-bold text-gray-700"
          >
            نام خانوادگی:
          </label>
          <Input
            type="text"
            name="lastName"
            id="lastName"
            defaultValue="علی احمدی"
            className="w-full"
            {...register("lastName", { required: true })}
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">نام خانوادگی ضروری است!</p>
          )}
        </div>

        <div className="grid gap-1">
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            ایمیل:
          </label>
          <Input
            type="email"
            name="email"
            id="email"
            defaultValue="ali.ahmadi@example.com"
            className="w-full"
            {...(register("email"), { required: true })}
          />
          {errors.email && (
            <p className="text-sm text-red-500">آٔدرس ایمیل ضروری است!</p>
          )}
        </div>

        <div className="grid gap-1">
          <label
            htmlFor="phone"
            className="mb-2 block text-sm font-bold text-gray-700"
          >
            شماره تلفن:
          </label>
          <Input
            type="tel"
            name="phoneNumber"
            id="phone"
            placeholder="شماره تلفن خود را وارد کنید"
            defaultValue="+989123456789"
            className="w-full"
            {...register("phoneNumber", { required: true })}
          />
          {errors.phoneNumber && (
            <p className="text-sm text-red-500">شماره تلفن ضروری است!</p>
          )}
        </div>
        <Button
          variant="default"
          type="submit"
          className="mt-6 h-fit p-2 !px-14"
        >
          ذخیره تغییرات
        </Button>
      </form>
    </section>
  );
}
