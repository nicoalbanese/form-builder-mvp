import { type Block } from "@prisma/client";

const FormQuestion = ({ block }: { block: Block }) => {
  return (
    <div className="my-4">
      <label htmlFor="email" className="block text-sm font-medium leading-6">
        {block.question}
      </label>
      <div className="mt-2">
        <input
          type="text"
          name={String(block.id)}
          // id="question"
          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
      </div>
    </div>
  );
};

export default FormQuestion;
