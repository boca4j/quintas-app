import { useState } from 'react'
import CampoForm from './CampoForm.jsx'
import { validarReserva } from '../utils/validacoes.js'

const valoresIniciais = { inicio: '', fim: '', convidados: '', nome: '', email: '' }

export default function ReservaForm({ espaco, onSubmit }) {
  const [valores, setValores] = useState(valoresIniciais)
  const [visitados, setVisitados] = useState({})

  const erros = validarReserva(valores, espaco.capacidade)
  const temErros = Object.keys(erros).length > 0

  const erroVisivel = (campo) => (visitados[campo] ? erros[campo] : undefined)

  function handleChange(evento) {
    const { name, value } = evento.target
    setValores((atual) => ({ ...atual, [name]: value }))
  }

  function handleBlur(evento) {
    const { name } = evento.target
    setVisitados((atual) => ({ ...atual, [name]: true }))
  }

  function handleSubmit(evento) {
    evento.preventDefault()
    if (temErros) return
    onSubmit({
      itemId: espaco.id,
      dataInicio: valores.inicio,
      dataFim: valores.fim,
      quantidade: Number(valores.convidados),
      nome: valores.nome.trim(),
      email: valores.email.trim(),
    })
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-4">
      <CampoForm
        label="Data de início"
        name="inicio"
        type="date"
        value={valores.inicio}
        onChange={handleChange}
        onBlur={handleBlur}
        erro={erroVisivel('inicio')}
      />
      <CampoForm
        label="Data de fim"
        name="fim"
        type="date"
        value={valores.fim}
        onChange={handleChange}
        onBlur={handleBlur}
        erro={erroVisivel('fim')}
      />
      <CampoForm
        label={`Número de convidados (máx. ${espaco.capacidade})`}
        name="convidados"
        type="number"
        min="1"
        max={espaco.capacidade}
        value={valores.convidados}
        onChange={handleChange}
        onBlur={handleBlur}
        erro={erroVisivel('convidados')}
      />
      <CampoForm
        label="Nome"
        name="nome"
        type="text"
        value={valores.nome}
        onChange={handleChange}
        onBlur={handleBlur}
        erro={erroVisivel('nome')}
      />
      <CampoForm
        label="Email"
        name="email"
        type="email"
        value={valores.email}
        onChange={handleChange}
        onBlur={handleBlur}
        erro={erroVisivel('email')}
      />

      <button type="submit" className="btn-primario w-full">
        Reservar
      </button>
    </form>
  )
}

