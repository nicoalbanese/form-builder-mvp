import { type FormResponse, type FormResponseAnswers } from "@prisma/client";
import TimeAgo from 'javascript-time-ago'
import en from 'javascript-time-ago/locale/en'
TimeAgo.addDefaultLocale(en)
const timeAgo = new TimeAgo('en-US')

const FormResponse = ({
  response,
}: {
  response: FormResponse & {
    form: {
      name: string;
    };
    responses: (FormResponseAnswers & {
      block: {
        question: string;
      };
    })[];
  };
}) => {
  return (
    <li key={response.id} className="flex py-4">
      <div className="ml-3 w-full">
        <div className="flex justify-between w-full">
          <div className="w-fit rounded-lg bg-slate-900 px-3 py-1">
            <span className="text-sm font-medium text-gray-100">
              {response.name}
            </span>
            <span className="mx-2">-</span>
            <span className="text-sm text-gray-300">{response.email}</span>
          </div>
          <p className="text-slate-300 text-sm">{timeAgo.format(new Date(response.createdAt))}</p>
        </div>
        <div className="ml-2 mt-2">
          {response.responses.map((response) => (
            <>
              <h4
                key={response.id}
                className="text-sm font-bold text-slate-300"
              >
                {response.block.question}
              </h4>
              <div key={response.id}>{response.response}</div>
            </>
          ))}
        </div>
      </div>
    </li>
  );
};

export default FormResponse;
