export function Checkbox({ onChange, checked }) {
  return (
    <input
      onChange={onChange}
      className="checkbox"
      type="checkbox"
      checked={checked}
    />
  );
}
