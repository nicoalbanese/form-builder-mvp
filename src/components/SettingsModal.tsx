import { Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { api } from "~/utils/api";

type FormType = {
  name: string;
};

export default function Example({
  formName,
  formId,
  open = false,
  setOpen,
}: {
  formName: string;
  open: boolean;
  formId: string;
  setOpen: React.Dispatch<boolean>;
}) {
  // const [open, setOpen] = useState(isOpen);
  const utils = api.useContext();

  const formNameMutation = api.form.updateFormByID.useMutation({
    onSuccess: () => {
      void utils.form.getFormByID.invalidate();
    },
  });

  const handleSubmit = (event: React.SyntheticEvent) => {
    event.preventDefault();
    const target = event.target as HTMLFormElement;
    const form = new FormData(target);
    const formData = Object.fromEntries(form.entries()) as FormType;

    if (formData.name !== formName) {
      formNameMutation.mutate({ formId, attributes: { ...formData } });
    }

    setOpen(false);
    target.reset();
  };

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as="div" className="relative z-10" onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter="ease-out duration-300"
          enterFrom="opacity-0"
          enterTo="opacity-100"
          leave="ease-in duration-200"
          leaveFrom="opacity-100"
          leaveTo="opacity-0"
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
        </Transition.Child>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6">
                <div>
                  <div className="mt-3 text-center sm:mt-5">
                    <Dialog.Title
                      as="h3"
                      className="text-2xl font-semibold leading-6 text-gray-900"
                    >
                      Edit Form
                    </Dialog.Title>
                  </div>
                </div>
                <div>
                  <form
                    onSubmit={handleSubmit}
                    className="my-4 w-full text-slate-800"
                  >
                    <div className="">
                      <label
                        htmlFor="formName"
                        className="block text-sm font-medium leading-6"
                      >
                        Form Name
                      </label>
                      <div className="mt-2">
                        <input
                          type="text"
                          name="name"
                          id="name"
                          defaultValue={formName}
                          className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                        />
                      </div>
                    </div>
                    <div className="mt-5 sm:mt-6">
                      <input
                        type="submit"
                        value="Save"
                        className="inline-flex w-full cursor-pointer justify-center rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                      />
                      <button
                        onClick={(e) => e.preventDefault()}
                        disabled
                        className="mt-3 inline-flex w-full justify-center rounded-md bg-red-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:cursor-not-allowed disabled:opacity-30"
                      >
                        Delete Form
                      </button>
                    </div>
                  </form>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
