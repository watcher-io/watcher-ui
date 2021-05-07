import { Dialog, Transition, Switch } from "@headlessui/react"
import * as React from "react"
import { useFormik, Form } from "formik"
import { useForm } from "react-hook-form"
import { useMutation, useQueryClient } from "react-query"
//@ts-expect-error
import SearchIcon from "~/assets/icons/search.svg"
import { useAuthClient } from "~/context/auth-context"
import { clusterProfile } from "~/utils/api-routes"
import type { Response } from "~/types/common"

interface CreateProfileDialogProps {
  open: boolean
  onClose: () => void
  mode?: "create" | "view"
}

type UploadCertificateInput = {
  ca_file: FileList
  cert_file: FileList
  key_file: FileList
}

type UploadResponseData = {
  ca: string
  cert: string
  key: string
}

interface CreateProfileRequest {
  name: string
  endpoints: string[]
  tls: boolean
  username: string
  password: string
  ca_file: string
  cert_file: string
  key_file: string
}

export default function CreateProfileDialog({
  open,
  onClose,
  mode = "create",
}: CreateProfileDialogProps) {
  const [caFile, setCAFile] = React.useState("CA Certificate")
  const [certFile, setCertFile] = React.useState("SSL Certificate")
  const [keyFile, setKeyFile] = React.useState("SSL Key")
  const queryClient = useQueryClient()

  const [
    uploadResponse,
    setUploadResponse,
  ] = React.useState<UploadResponseData>({ ca: "", cert: "", key: "" })

  const cancelButtonRef = React.useRef()
  const client = useAuthClient()

  const uploadMutation = useMutation(async (data: FormData) => {
    return await client
      .post<Response<UploadResponseData>>(
        clusterProfile.CERTIFICATE_UPLOAD,
        data
      )
      .then((res) => {
        return res.data.data
      })
  })

  const createProfileMutation = useMutation(
    async (data: CreateProfileRequest) => {
      return await client.post(clusterProfile.CREATE_PROFILE, data)
    }
  )

  const uploadFilesForm = useForm<UploadCertificateInput>()
  const formik = useFormik<{
    name: string
    endpoints: string
    tls: boolean
    username: string
    password: string
  }>({
    initialValues: {
      name: "",
      endpoints: "",
      tls: false,
      username: "",
      password: "",
    },
    onSubmit: async (values) => {
      const payload: CreateProfileRequest = {
        name: values.name,
        endpoints: values.endpoints.split(",").map((value) => value.trim()),
        tls: values.tls,
        ca_file: uploadResponse.ca,
        cert_file: uploadResponse.cert,
        key_file: uploadResponse.key,
        username: values.username,
        password: values.password,
      }

      createProfileMutation.mutate(payload, {
        onSuccess: () => {
          queryClient.invalidateQueries("cluster-profile-list")
          onClose()
        },
      })
    },
  })

  const handleCertificateUpload = (data: UploadCertificateInput) => {
    const formData = new FormData()
    formData.append("ca", data.ca_file[0])
    formData.append("cert", data.cert_file[0])
    formData.append("key", data.key_file[0])
    uploadMutation.mutate(formData, {
      onSuccess: (data) => {
        setUploadResponse(data)
      },
    })
  }

  return (
    <>
      <Transition show={open} as={React.Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          initialFocus={cancelButtonRef}
          static
          open={open}
          onClose={onClose}
        >
          <div className="min-h-screen px-4 text-center">
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="fixed inset-0" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={React.Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 scale-95"
              enterTo="opacity-100 scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 scale-100"
              leaveTo="opacity-0 scale-95"
            >
              <div className="inline-block w-full max-w-lg p-4 text-left align-middle transition-all transform bg-skin-main shadow-xl rounded-2xl border border-skin-fill">
                <Dialog.Title
                  as="h3"
                  className="text-lg font-medium leading-6 text-skin-base px-4"
                >
                  Create Profile
                </Dialog.Title>
                <div className="bg-skin-main p-2">
                  <form onSubmit={formik.handleSubmit}>
                    <div className="flex flex-wrap">
                      <div className="w-full md:w-1/2 px-3 py-1">
                        <input
                          className="appearance-none block w-full bg-skin-fill focus:bg-skin-fill text-skin-muted rounded py-1 px-4"
                          type="text"
                          placeholder="Demo Profile"
                          name="name"
                          value={formik.values["name"]}
                          onChange={formik.handleChange}
                        />
                      </div>
                      <div className="w-full md:w-1/2 px-3 py-1">
                        <input
                          className="appearance-none block w-full bg-skin-fill focus:bg-skin-fill text-skin-muted rounded py-1 px-4"
                          id="username"
                          type="text"
                          placeholder="BabyDinosaur"
                          name="username"
                          value={formik.values["username"]}
                          onChange={formik.handleChange}
                        />
                      </div>
                      <div className="w-full md:w-1/2 px-3 py-1">
                        <input
                          className="appearance-none block w-full bg-skin-fill focus:bg-skin-fill text-skin-muted rounded py-1 px-4"
                          placeholder="192.168.1.1, 192.168.1.2, ..."
                          type="text"
                          name="endpoints"
                          value={formik.values["endpoints"]}
                          onChange={formik.handleChange}
                        />
                      </div>
                      <div className="w-full md:w-1/2 px-3 py-1">
                        <input
                          className="appearance-none block w-full bg-skin-fill focus:bg-skin-fill text-skin-muted rounded py-1 px-4"
                          type="text"
                          placeholder="password"
                          name="password"
                          value={formik.values["password"]}
                          onChange={formik.handleChange}
                        />
                      </div>
                    </div>
                    <Switch.Group>
                      <div className="flex items-center px-3 py-1">
                        <Switch
                          name="tls"
                          checked={formik.values["tls"]}
                          onChange={() => {
                            formik.setFieldValue("tls", !formik.values.tls)
                          }}
                          className={`${
                            formik.values.tls
                              ? "bg-skin-button-accent"
                              : "bg-skin-fill"
                          } relative inline-flex items-center h-6 rounded-full w-11 transition-colors focus:outline-none`}
                        >
                          <span
                            className={`transform transition ease-in-out  ${
                              formik.values.tls
                                ? "translate-x-6 bg-skin-main"
                                : "translate-x-1 duration-100 bg-skin-muted"
                            } inline-block w-4 h-4 transform rounded-full transition-transform`}
                          />
                        </Switch>
                        <Switch.Label className="ml-4 text-skin-base" passive>
                          TLS
                        </Switch.Label>
                      </div>
                    </Switch.Group>
                    <Transition
                      show={formik.values.tls}
                      appear
                      enter="transition-opacity ease-linear duration-300"
                      enterFrom="opacity-0"
                      enterTo="opacity-100"
                      leave="transition-opacity ease-linear duration-300"
                      leaveFrom="opacity-100"
                      leaveTo="opacity-0"
                    >
                      <div
                        onChange={({ target }: any) => {
                          /**
                           * TODO: There is probably better approch to do this.
                           * This defeats the purpose of using uncontrolled component
                           * What I want: On selecting the files, the label (which is a div here) should
                           * reflect the selected file and onSubmit, the formvalues should be files and
                           * not just strings
                           */

                          if (target.name === "ca_file") {
                            let value
                            if (typeof target.value === "string") {
                              value = target.value.split("\\").splice(-1)[0]
                            }
                            setCAFile(value)
                          } else if (target.name === "cert_file") {
                            let value
                            if (typeof target.value === "string") {
                              value = target.value.split("\\").splice(-1)[0]
                            }
                            setCertFile(value)
                          } else if (target.name === "key_file") {
                            let value
                            if (typeof target.value === "string") {
                              value = target.value.split("\\").splice(-1)[0]
                            }
                            setKeyFile(value)
                          }
                        }}
                      >
                        <div className="flex flex-wrap">
                          <div className="relative text-gray-600 w-full md:w-1/2 px-3 py-1">
                            <div className="appearance-none block w-full bg-skin-fill focus:bg-skin-fill text-skin-muted rounded py-1 px-4">
                              {caFile}
                            </div>
                            <label
                              className="absolute right-0 top-0 mt-3 mr-4"
                              htmlFor="ca_file"
                            >
                              <SearchIcon className="h-4 w-4 fill-current cursor-pointer" />
                              <input
                                id="ca_file"
                                type="file"
                                className="hidden"
                                required
                                {...uploadFilesForm.register("ca_file", {
                                  required: true,
                                })}
                                accept=".pem"
                              />
                            </label>
                          </div>
                          <div className="w-full md:w-1/2 px-3 py-1 hidden md:block text-skin-base text-sm my-auto">
                            {Boolean(uploadResponse.ca)
                              ? uploadResponse.ca
                              : "Upload the file"}
                          </div>
                        </div>
                        <div className="flex flex-wrap">
                          <div className="relative text-gray-600 w-full md:w-1/2 px-3 py-1">
                            <div className="appearance-none block w-full bg-skin-fill focus:bg-skin-fill text-skin-muted rounded py-1 px-4">
                              {certFile}
                            </div>
                            <label className="absolute right-0 top-0 mt-3 mr-4">
                              <SearchIcon className="h-4 w-4 fill-current cursor-pointer" />
                              <input
                                type="file"
                                className="hidden"
                                required
                                {...uploadFilesForm.register("cert_file", {
                                  required: true,
                                })}
                                accept=".pem"
                              />
                            </label>
                          </div>
                          <div className="w-full md:w-1/2 px-3 py-1 hidden md:block text-skin-base text-sm my-auto">
                            {Boolean(uploadResponse.cert)
                              ? uploadResponse.cert
                              : "Upload the file"}
                          </div>
                        </div>
                        <div className="flex flex-wrap">
                          <div className="relative text-gray-600 w-full md:w-1/2 px-3 py-1">
                            <div className="appearance-none block w-full bg-skin-fill focus:bg-skin-fill text-skin-muted rounded py-1 px-4">
                              {keyFile}
                            </div>
                            <label className="absolute right-0 top-0 mt-3 mr-4">
                              <SearchIcon className="h-4 w-4 fill-current cursor-pointer" />
                              <input
                                type="file"
                                className="hidden"
                                required
                                {...uploadFilesForm.register("key_file", {
                                  required: true,
                                })}
                                accept=".pem"
                              />
                            </label>
                          </div>
                          <div className="w-full md:w-1/2 px-3 py-1 hidden md:block text-skin-base text-sm my-auto">
                            {Boolean(uploadResponse.key)
                              ? uploadResponse.key
                              : "Upload the file"}
                          </div>
                        </div>
                        <div className="flex justify-start w-full px-3 py-1">
                          <button
                            className="bg-skin-button-accent p-1.5 text-xs w-16 font-normal tracking-wider text-skin-base rounded opacity-80 hover:opacity-100"
                            onClick={uploadFilesForm.handleSubmit(
                              handleCertificateUpload
                            )}
                          >
                            upload
                          </button>
                        </div>
                      </div>
                    </Transition>
                    <div className="flex justify-end w-full px-3 py-1">
                      <button
                        className="bg-skin-button-accent p-1.5 text-sm w-16 font-normal tracking-wider text-skin-base rounded opacity-80 hover:opacity-100"
                        type="submit"
                      >
                        save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  )
}
