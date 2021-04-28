function Get() {
  return (
    <div className="flex gap-8 text-skin-base">
      <div className="w-80 h-48 bg-skin-main rounded-lg p-4">
        <p className="mb-2 font-semibold">Get KV Response</p>
        <div>
          <p>Item 1</p>
          <p>Item 2</p>
          <p>Item 3</p>
        </div>
      </div>
      <div className="flex-1 h-96 bg-skin-main rounded-lg p-4">
        <p>Table</p>
      </div>
    </div>
  )
}

export default Get
