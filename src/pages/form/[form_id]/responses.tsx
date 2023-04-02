import Link from "next/link";
import { useRouter } from "next/router";
import FormResponse from "~/components/FormResponse";
import Layout from "~/components/Layout";
import { api } from "~/utils/api";

const Responses = () => {
  const router = useRouter();
  const { form_id } = router.query;
  const { data: responses, status } =
    api.formResponse.getResponsesForFormID.useQuery(
      { formId: form_id as string },
      { enabled: router.isReady }
    );

  if (status === "success") {
    return (
      <Layout>
        <h1>Form Responses</h1>
        <li>
          <Link href={`/form/${form_id as string}`}>
            Edit form
          </Link>
        </li>
        <li>
          <Link href={`/share/${form_id as string}`}>
            Go to form (public view)
          </Link>
        </li>
        {/* <pre>{JSON.stringify(data, null, 1)}</pre> */}
        <ul role="list" className="divide-y divide-gray-500">
          {responses.map((response) => (
            <FormResponse key={response.id} response={response} />
          ))}
        </ul>
      </Layout>
    );
  }
};

export default Responses;
