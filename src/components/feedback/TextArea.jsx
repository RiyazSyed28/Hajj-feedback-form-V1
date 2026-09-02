function TextArea({
  label,
  register,
  name,
  rows = 4,
}) {
  return (
    <div className="space-y-2">
      <label className="font-semibold">{label}</label>

      <textarea
        rows={rows}
        {...register(name)}
        className="w-auto border rounded-lg p-4"
      />
    </div>
  );
}

export default TextArea;