"use client";

import { useMediaQuery } from "@/hooks/use-media-query";
import { useQuery } from "@tanstack/react-query";
import directus from "@/services/directus";
import { readItem } from "@directus/sdk";
import { notFound } from "next/navigation";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { PageTopLine } from "@/components/shared/FootballField";
import {
  FormInput,
  FormDatePicker,
  FormPhoneInput,
  FormCheckbox,
  FormRadio,
  FormTextarea,
} from "@/components/shared/FormField";
import { Form, FormField, FormItem, FormControl } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { SmartCaptcha } from "@yandex/smart-captcha";

import { SlashIcon } from "lucide-react";
import { Arrow } from "@/assets/icons/Icons";
import { Label } from "@/components/ui/label";

const formSchema = z.object({
  name: z
    .string()
    .min(2)
    .max(30)
    .regex(/^[a-zA-Zа-яёА-ЯЁ\s-]+$/),
  email: z.string().email(),
  birthday: z.date(),
  phone: z
    .string()
    .min(1)
    .refine((val) => {
      const numbers = val.replace(/\D/g, "");
      return numbers.length >= 10;
    }),
  height: z.string().length(3),
  weight: z
    .string()
    .min(1)
    .refine((val) => {
      const num = parseInt(val);
      return !isNaN(num) && num >= 30 && num <= 150;
    }),
  nationality: z
    .string()
    .min(1)
    .regex(/^[a-zA-Zа-яёА-ЯЁ\s-]+$/),
  city: z
    .string()
    .min(1)
    .regex(/^[a-zA-Zа-яёА-ЯЁ\s-]+$/),
  position: z.array(z.string()).min(1),
  foot: z.string().min(1),
  study: z.string().min(1),
  clubs: z.string().min(1),
  agreement: z.boolean().refine((data) => data),
  captcha: z.string().min(1),
});

export default function Anketa() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const { data: form, isLoading } = useQuery({
    queryKey: ["form"],
    queryFn: async () =>
      await directus.request(
        readItem("form", 1, {
          fields: ["*"],
        })
      ),
    staleTime: 1000 * 60 * 5,
  });

  const defaultForm = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      birthday: new Date(),
      phone: "",
      height: "",
      weight: "",
      nationality: "",
      city: "",
      position: [],
      foot: "Правая",
      study: "",
      clubs: "",
      agreement: false,
      captcha: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      const phoneWithPrefix = values.phone.startsWith("+7")
        ? values.phone
        : `+7${values.phone}`;

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/webhook/sendform`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...values,
            phone: phoneWithPrefix,
          }),
        }
      );

      if (response.ok) {
        // defaultForm.reset();
        window.location.reload();
      } else {
        console.error("Ошибка при отправке формы:", response.statusText);
      }
    } catch (error) {
      console.error("Ошибка при отправке формы:", error);
    }
  }

  if (isLoading) {
    return (
      <div className="w-full md:max-w-6xl md:mx-auto opacity-30">
        <div className="min-w-full min-h-full space-y-4">
          <Skeleton className="w-80 h-10 mx-auto" />
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="space-y-3">
              <Skeleton className="w-full h-5" />
              <Skeleton className="w-10/12 h-5" />
              <br />
              <Skeleton className="w-full h-5" />
              <Skeleton className="w-10/12 h-5" />
              <br />
              <Skeleton className="w-full h-5" />
              <Skeleton className="w-2/12 h-5" />
              <br />
              <Skeleton className="w-11/12 h-5" />
              <br />
              <Skeleton className="w-full h-5" />
              <Skeleton className="w-full h-5" />
              <Skeleton className="w-full h-5" />
              <Skeleton className="w-10/12 h-5" />
            </div>
          ))}
          <div className="flex flex-row justify-between items-start text-xs md:text-sm text-muted-foreground mt-24">
            <Skeleton className="w-1/5 h-5" />
            <Skeleton className="w-1/5 h-5" />
          </div>
        </div>
      </div>
    );
  }

  if (!form) {
    notFound();
  }

  return (
    <main>
      <div className="h-screen flex flex-col">
        <div className="relative w-full flex-1">
          <div className="absolute top-0 left-0 bg-gradient-to-b from-foreground/90 via-transparent to-transparent z-10 w-full h-1/5" />
          <div className="absolute bottom-0 left-0 bg-gradient-to-t from-foreground/90 via-transparent to-transparent z-10 w-full h-4/5 md:h-2/5" />
          <Image
            src={
              isMobile
                ? `${directus.url}assets/${form.cover_mob}`
                : `${directus.url}assets/${form.cover_desk}`
            }
            alt="Form"
            fill
            sizes="100%"
            className="w-full h-auto object-cover"
          />
        </div>
        <div className="flex flex-shrink-0 flex-col md:flex-row gap-6 md:gap-14 items-start md:items-end justify-between px-4 md:px-10 py-14 bg-foreground">
          <h1 className="text-5xl md:text-[90px] font-black font-unbounded uppercase text-background">
            Анкета
          </h1>
          <h2 className="text-base md:text-[26px] font-bold font-unbounded uppercase text-background max-w-[590px]">
            Все анкеты рассматриваются в течение{" "}
            <span className="text-primary">14 дней</span>
          </h2>
        </div>
      </div>
      <div className="flex flex-col gap-10 py-10">
        <Breadcrumb className="px-4 md:px-10 md:mb-10">
          <BreadcrumbList className="uppercase text-sm">
            <BreadcrumbItem>
              <BreadcrumbLink
                className="text-accent hover:text-accent/80"
                href="/"
              >
                Главная
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator>
              <SlashIcon />
            </BreadcrumbSeparator>
            <BreadcrumbItem>
              <BreadcrumbPage className="font-semibold">Анкета</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
        <PageTopLine
          className="border-accent px-4 md:px-10"
          classLine="bg-accent"
        />
        <p className="text-base md:text-lg text-foreground px-4 md:px-10">
          Если вы хотите стать клиентом футбольного агентства FAF, необходимо
          заполнить все поля.
          <br />
          <span className="font-bold">
            В случае положительного решения с вами свяжутся по указанным в
            анкете контактам.
          </span>
        </p>
        <Form {...defaultForm}>
          <form
            onSubmit={defaultForm.handleSubmit(onSubmit)}
            className="space-y-8 px-4 md:px-10"
          >
            <div className="grid grid-cols-1 md:grid-cols-4 gap-y-6 md:gap-x-5 md:gap-y-10 md:bg-white md:p-10">
              <FormField
                control={defaultForm.control}
                name="name"
                render={({ field }) => (
                  <FormInput
                    label="ФИО"
                    placeholder="Иванов Иван Иванович"
                    field={field}
                  />
                )}
              />
              <FormField
                control={defaultForm.control}
                name="email"
                render={({ field }) => (
                  <FormInput
                    label="Email"
                    placeholder="example@mail.com"
                    field={field}
                  />
                )}
              />
              <FormField
                control={defaultForm.control}
                name="birthday"
                render={({ field }) => (
                  <FormDatePicker
                    label="Дата рождения"
                    placeholder="Выберите дату"
                    field={field}
                  />
                )}
              />
              <FormField
                control={defaultForm.control}
                name="phone"
                render={({ field }) => (
                  <FormPhoneInput
                    label="Телефон"
                    format="+7 (###) ###-##-##"
                    placeholder="+7 (987) 654-32-10"
                    field={field}
                  />
                )}
              />
              <FormField
                control={defaultForm.control}
                name="height"
                render={({ field }) => (
                  <FormInput
                    label="Рост (см)"
                    placeholder="183"
                    field={field}
                  />
                )}
              />
              <FormField
                control={defaultForm.control}
                name="weight"
                render={({ field }) => (
                  <FormInput label="Вес (кг)" placeholder="75" field={field} />
                )}
              />
              <FormField
                control={defaultForm.control}
                name="nationality"
                render={({ field }) => (
                  <FormInput
                    label="Гражданство"
                    placeholder="Россия"
                    field={field}
                  />
                )}
              />
              <FormField
                control={defaultForm.control}
                name="city"
                render={({ field }) => (
                  <FormInput
                    label="Город проживания"
                    placeholder="Москва"
                    field={field}
                  />
                )}
              />
              <FormField
                control={defaultForm.control}
                name="position"
                render={({ field }) => (
                  <FormCheckbox
                    className="col-span-1 md:col-span-4"
                    label="Позиция на поле (можно указать несколько)"
                    options={[
                      { label: "ВР", value: "ВР" },
                      { label: "ПЗ", value: "ПЗ" },
                      { label: "ЦЗ", value: "ЦЗ" },
                      { label: "ЛЗ", value: "ЛЗ" },
                      { label: "ЦОП", value: "ЦОП" },
                      { label: "ЦП", value: "ЦП" },
                      { label: "ЦАП", value: "ЦАП" },
                      { label: "ЛП", value: "ЛП" },
                      { label: "ПП", value: "ПП" },
                      { label: "ФРВ", value: "ФРВ" },
                    ]}
                    field={field}
                  />
                )}
              />
              <FormField
                control={defaultForm.control}
                name="foot"
                render={({ field }) => (
                  <FormRadio
                    className="col-span-1 md:col-span-4"
                    label="Ведущая нога"
                    options={[
                      { label: "Правая", value: "Правая" },
                      { label: "Левая", value: "Левая" },
                    ]}
                    field={field}
                  />
                )}
              />
              <div className="col-span-1 md:col-span-2 grid grid-cols-1 gap-y-6 md:gap-x-5 md:gap-y-10">
                <FormField
                  control={defaultForm.control}
                  name="study"
                  render={({ field }) => (
                    <FormTextarea
                      label="Академии, спортивные школы"
                      placeholder="Академия «Спартак» им. Ф. Ф. Черенкова"
                      field={field}
                    />
                  )}
                />
                <FormField
                  control={defaultForm.control}
                  name="clubs"
                  render={({ field }) => (
                    <FormTextarea
                      label="Клубы (Текущий и предыдущие)"
                      placeholder="Академия «Чертаново», ФК «Химки», ФК «Торпедо»"
                      field={field}
                    />
                  )}
                />
              </div>
            </div>
            <FormField
              control={defaultForm.control}
              name="agreement"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <div className="flex flex-row items-center gap-x-2">
                    <FormControl>
                      <Checkbox
                        id="agreement"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                        className="size-6 rounded-sm bg-white"
                      />
                    </FormControl>
                    <Label
                      htmlFor="agreement"
                      className="text-sm font-normal text-muted-foreground"
                    >
                      <span>
                        Я согласен с{" "}
                        <Link
                          className="text-foreground underline"
                          href="/term"
                        >
                          политикой конфиденциальности и условиями обработки
                          персональных данных
                        </Link>
                      </span>
                    </Label>
                  </div>
                </FormItem>
              )}
            />
            <FormField
              control={defaultForm.control}
              name="captcha"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormControl>
                    <SmartCaptcha
                      sitekey={process.env.NEXT_PUBLIC_YANDEX_CAPTCHA_ID!}
                      onSuccess={(token) => {
                        field.onChange(token);
                      }}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <div className="mx-auto md:ml-0 md:mr-auto w-fit">
              <Button type="submit" icon="arrow" className="px-11 py-4">
                <span>Отправить</span>
                <Arrow className="size-4" />
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <div className="bg-background w-full h-16 md:h-26" />
    </main>
  );
}
