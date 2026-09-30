export default function CampoForm({ label, name, erro, ...propsInput }) {
  const idErro = `${name}-erro`

  return (
    <div className="campo">
      <label htmlFor={name} className="label">
        {label}
      </label>
      <input
        id={name}
        name={name}
        aria-invalid={Boolean(erro)}
        aria-describedby={erro ? idErro : undefined}
        className={erro ? 'input input-invalido' : 'input'}
        {...propsInput}
      />
      {erro && (
        <p id={idErro} className="erro-campo">
          {erro}
        </p>
      )}
    </div>
  )
}

