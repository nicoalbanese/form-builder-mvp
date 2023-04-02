import { type Block } from "@prisma/client";
import { useState } from "react";
import { api } from "~/utils/api";

type formAttributes = {
  question: string;
  type: string;
};

const Block = ({ block }: { block: Block }) => {
  const [editing, setEditing] = useState(false);
  const [blockData, setBlockData] = useState<Block>(block);
  const utils = api.useContext();

  const blockMutation = api.block.updateBlockWithID.useMutation({
    onSuccess: (data) => setBlockData({ ...data }),
  });

  const deleteBlockMutation = api.block.deleteBlockWithID.useMutation({
    onSuccess: () => {
      void utils.form.getFormByID.invalidate();
    },
  });

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const form = new FormData(target);
    const formData = Object.fromEntries(form.entries()) as formAttributes;
    // console.log(formData);
    target.reset();
    blockMutation.mutate({
      attributes: { question: formData.question, type: formData.type },
      blockId: block.id,
    });
    setEditing(false);
  };

  if (editing) {
    return (
      <form
        onSubmit={handleSubmit}
        className="mt-4 w-full border border-slate-100 p-5"
      >
        <h3>Editing: {blockData.question}</h3>
        {/* <div className="input-group">
          <label htmlFor="question">Question</label>
          <input
            type="text"
            name="question"
            defaultValue={blockData.question}
          />
        </div> */}
        <div className="input-group">
          <label
            htmlFor="email"
            className="block text-sm font-medium leading-6"
          >
            Question
          </label>
          <div className="mt-2">
            <input
              type="text"
              name="question"
              id="question"
              className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              placeholder={blockData.question}
              defaultValue={blockData.question}
            />
          </div>
        </div>
        <div>
          <label
            htmlFor="location"
            className="block text-sm font-medium leading-6"
          >
            Question Type
          </label>
          <select
            id="type"
            name="type"
            className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
            defaultValue="text"
          >
            <option value="text">Text</option>
          </select>
        </div>
        {/* <div className="input-group">
          <label htmlFor="type">Type</label>
          <input type="text" name="type" defaultValue={blockData.type} />
        </div> */}

        <div className="mt-8 flex justify-between">
          <input
            type="submit"
            value="Save"
            className="block w-fit cursor-pointer rounded-lg bg-blue-500 p-2 hover:opacity-75"
          />
          <button
            className=" block h-fit w-fit rounded-lg bg-red-500 p-2 hover:opacity-75"
            onClick={(e) => {
              e.preventDefault();
              deleteBlockMutation.mutate({ blockId: block.id });
            }}
          >
            Delete
          </button>
        </div>
      </form>
    );
  } else {
    return (
      <div
        onDoubleClick={() => setEditing(true)}
        className="mt-4 select-none border-b border-slate-700 pb-8"
      >
        {/* <pre>{JSON.stringify(blockData, null, 5)}</pre> */}
        <div>
          <h3>Question</h3>
          <p>{blockData.question}</p>
        </div>
        <div>
          <h3>Type</h3>
          <p>{blockData.type}</p>
        </div>
      </div>
    );
  }
};

export default Block;
