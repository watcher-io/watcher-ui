function Compact() {
  return (
    <div className="flex-1 flex gap-2">
      <input
        key="revision"
        className="appearance-none block w-64 bg-skin-fill focus:bg-skin-fill text-skin-muted rounded py-1 px-4"
        name="revision"
        type="text"
        placeholder="2"
      />
    </div>
  )
}

export default Compact
