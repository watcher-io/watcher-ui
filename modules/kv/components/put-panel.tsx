function PutPanel() {
  return (
    <div className="flex-1 flex gap-2">
      <input
        key="key"
        className="appearance-none block w-64 bg-skin-fill focus:bg-skin-fill text-skin-muted rounded py-1 px-4"
        name="key"
        type="text"
        placeholder="foo"
      />
      <input
        key="value"
        className="appearance-none block w-64 bg-skin-fill focus:bg-skin-fill text-skin-muted rounded py-1 px-4"
        name="value"
        type="text"
        placeholder="bar"
      />
    </div>
  )
}

export default PutPanel
