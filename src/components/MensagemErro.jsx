function MensagemErro({ mensagem }) {
  if (!mensagem) return null

  return (
    <div className="rounded-md border border-red-300 bg-red-50 px-4 py-3 text-red-700">
      {mensagem}
    </div>
  )
}

export default MensagemErro
