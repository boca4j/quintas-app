function CampoForm({ label, name, ...propsInput }) {
  return (
    <div className="campo">
      <label htmlFor={name} className="label">
        {label}
      </label>
      <input id={name} name={name} className="input" {...propsInput} />
    </div>
  )
}

export default CampoForm