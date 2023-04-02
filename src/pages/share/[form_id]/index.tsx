// import { type Block } from "@prisma/client";
import Head from "next/head";
// import Link from "next/link";
import { useRouter } from "next/router";
// import Block from "~/components/Block";
import FormQuestion from "~/components/FormQuestion";
import Layout from "~/components/Layout";
// import { useEffect, useState } from "react";
import { api } from "~/utils/api";

type responseType = {
  blockId: string;
  response: string;
}[];

const FormPage = () => {
  const router = useRouter();
  const { form_id } = router.query;

  const { data: formData, status } = api.form.getPublicFormByID.useQuery(
    { formId: form_id as string },
    { enabled: router.isReady }
  );

  const newFormSubmissionMutation =
    api.formResponse.submitWithResponses.useMutation();

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const form = new FormData(target);
    const formData = Object.fromEntries(form.entries());

    const formattedResponses = {
      name: "",
      email: "",
      responses: [] as responseType,
    };

    for (const key in formData) {
      if (key === "name" || key === "email") {
        formattedResponses[key] = formData[key] as string;
      } else {
        formattedResponses.responses.push({
          blockId: key,
          response: formData[key] as string,
        });
      }
    }

    newFormSubmissionMutation.mutate({
      email: formattedResponses.email,
      name: formattedResponses.name,
      formId: form_id as string,
      responses: formattedResponses.responses,
    });

    console.log(formattedResponses);
    void router.push(`/share/${form_id as string}/success`);
    // target.reset();
  };

  if (status == "success") {
    return (
      <>
        <Head>
          <title>{formData?.name}</title>
        </Head>
        <Layout>
          <div className="flex justify-between">
            <h1>{formData?.name}</h1>
          </div>
          <form onSubmit={handleSubmit}>
            <div className="input-group">
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 "
              >
                Name
              </label>
              <div className="mt-2">
                <input
                  disabled={newFormSubmissionMutation.isLoading}
                  type="text"
                  name="name"
                  id="name"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="John Doe"
                />
              </div>
            </div>
            <div className="input-group">
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 "
              >
                Email
              </label>
              <div className="mt-2">
                <input
                  disabled={newFormSubmissionMutation.isLoading}
                  type="email"
                  name="email"
                  id="email"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  placeholder="you@example.com"
                />
              </div>
            </div>
            {formData?.blocks.map((block) => (
              <FormQuestion block={block} key={block.id} />
            ))}
            <input
              disabled={newFormSubmissionMutation.isLoading}
              type="submit"
              className="btn-primary"
              value="Submit!"
            />
          </form>
        </Layout>
      </>
    );
  }
};

export default FormPage;
