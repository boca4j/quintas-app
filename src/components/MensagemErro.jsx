function MensagemErro({ mensagem, onTentarNovamente }) {
  if (!mensagem) return null

  return (
    <div role="alert" className="alerta-erro flex flex-wrap items-center justify-between gap-3">
      <span>{mensagem}</span>
      {onTentarNovamente && (
        <button type="button" onClick={onTentarNovamente} className="btn-secundario">
          Tentar novamente
        </button>
      )}
    </div>
  )
}

export default MensagemErro