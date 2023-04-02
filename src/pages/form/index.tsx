import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "~/components/Layout";
import { api } from "~/utils/api";

const Forms = () => {
  const router = useRouter();
  const { data, status } = api.form.getAll.useQuery();
  const newFormMutation = api.form.create.useMutation({
    onSuccess(data) {
      void router.push(`/form/${data.id}`);
    },
  });

  if (status == "loading")
    return (
      <Layout>
        <h1>Hello</h1>
        <>loading</>
      </Layout>
    );

  if (status == "success") {
    return (
      <Layout>
        <div className="flex justify-between">
          <h1>Forms</h1>
          <button
            className="btn-primary h-min"
            onClick={() => newFormMutation.mutate({ name: "My New Form" })}
          >
            +
          </button>
        </div>
        {data.length > 0 ? data.map((form) => (
          <div key={form.id}>
            <Link href={`/form/${form.id}`}>{form.name}</Link>
          </div>
        )) : <div>No forms yet, add a form by clicking the &quot;+&quot; button above.</div>}
      </Layout>
    );
  }
};

export default Forms;
