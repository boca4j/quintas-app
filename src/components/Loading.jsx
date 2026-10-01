function Loading({ mensagem = 'A carregar...' }) {
  return (
    <div role="status" className="carregando flex-col gap-3">
      <span className="h-8 w-8 animate-spin rounded-full border-4 border-areia-200 border-t-primaria-600" />
      <p>{mensagem}</p>
    </div>
  )
}

export default Loading