import { useFormik } from "formik"
import { useRouter } from "next/router"

import { useKVContext } from "../context"
import { useCompactMutation } from "../query-utils"

import { TCompactRequest } from "~/types/kv"

function Compact() {
  const router = useRouter()
  const { setResponse } = useKVContext()
  const { mutate } = useCompactMutation(router.query["profileId"] as string)
  const formik = useFormik<TCompactRequest>({
    initialValues: {
      revision: 1,
    },
    onSubmit: (data) => {
      mutate(data, {
        onSuccess: (res) => {
          setResponse(res.data)
        },
      })
    },
  })
  return (
    <form className="flex-1 flex gap-2" onSubmit={formik.handleSubmit}>
      <input
        key="revision"
        className="appearance-none block w-64 bg-skin-fill focus:bg-skin-fill text-skin-muted rounded py-1 px-4"
        name="revision"
        placeholder="2"
        value={formik.values.revision}
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
      />
      <div className="ml-auto my-auto px-2">
        <button
          className="bg-skin-button-accent p-1.5 text-sm w-24 font-normal tracking-wider text-skin-base rounded opacity-80 hover:opacity-100"
          type="submit"
        >
          Apply
        </button>
      </div>
    </form>
  )
}

export default Compact
