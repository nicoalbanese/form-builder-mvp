// import { type Block } from "@prisma/client";
import { Cog8ToothIcon, LightBulbIcon } from "@heroicons/react/24/outline";
import { type Block } from "@prisma/client";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import BlockComponent from "~/components/Block";
import Layout from "~/components/Layout";
import SettingsModal from "~/components/SettingsModal";
// import { useEffect, useState } from "react";
import { api } from "~/utils/api";

const FormPage = () => {
  const router = useRouter();
  const { form_id } = router.query;
  const { data: formData, status } = api.form.getFormByID.useQuery(
    { formId: form_id as string },
    {
      enabled: router.isReady,
      onSuccess(data) {
        setBlocks(data?.blocks);
      },
    }
  );
  const [blocks, setBlocks] = useState<Block[] | undefined>();
  const createBlockMutation = api.block.createBlock.useMutation({
    onSuccess: (data) => {
      setBlocks([...(blocks as Block[]), data]);
    },
  });

  const [settingsModalOpen, setSettingsModalOpen] = useState(false);

  if (status == "success") {
    return (
      <Layout>
        {settingsModalOpen ? (
          <SettingsModal
            formId={formData?.id as string}
            open={settingsModalOpen}
            setOpen={setSettingsModalOpen}
            formName={formData?.name as string}
          />
        ) : null}
        <Link href="/form">back</Link>
        <div className="flex justify-between">
          <h1>{formData?.name}</h1>
          <div className="flex items-center">
            <button
              className="mr-3  block h-fit w-fit rounded-lg hover:opacity-75"
              onClick={() => setSettingsModalOpen(true)}
            >
              <Cog8ToothIcon height="30" width="30" color="white" />
            </button>
            <button
              className="btn-primary h-min"
              onClick={() =>
                createBlockMutation.mutate({
                  formId: formData?.id as string,
                  question: "What do you think of this new question?",
                  type: "text",
                })
              }
            >
              +
            </button>
          </div>
        </div>
        {(blocks?.length as number) > 0 ? (
          <>
            <button
              className="btn-primary my-2"
              onClick={() =>
                void navigator.clipboard.writeText(
                  `http://localhost:3000/share/${form_id as string}`
                )
              }
            >
              Copy link to form
            </button>
            <Link href={`/form/${form_id as string}/responses`}>
              <button
                type="button"
                className="rounded-md bg-white px-2.5 py-1.5 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 ml-2"
              >
                See responses
              </button>
            </Link>
            <div className="my-3 flex items-center space-x-3 bg-slate-900 p-5">
              <LightBulbIcon height="20" width="20" />{" "}
              <p>Double click question to edit</p>
            </div>
            {blocks?.map((block) => (
              <BlockComponent block={block} key={block.id} />
            ))}
          </>
        ) : (
          <div>No blocks yet. Please add with the button above.</div>
        )}
      </Layout>
    );
  }
};

export default FormPage;
