import { useCallback, useEffect, useState } from 'react'
import { listarReservas, listarItens, cancelarReserva } from '../api/quintasApi.js'
export function useReservas() {
    const [reservas, setReservas] = useState([])
    const [loading, setLoading] = useState(true)
    const [erro, setErro] = useState(null)

    const carregar = useCallback(async () => {
    setLoading(true)
    setErro(null)
    try {
      const [listaReservas, listaItens] = await Promise.all([
        listarReservas(),
        listarItens(),
      ])
      const itensPorId = new Map(listaItens.map((item) => [item.id, item]))
      
      setReservas(
        listaReservas.map((reserva) => ({
          ...reserva,
          espaco: itensPorId.get(Number(reserva.itemId)) ?? null,
        })),
      )
    } catch (e) {
      setErro(e.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    carregar()
  }, [carregar])

    async function cancelar(id) {
        await cancelarReserva(id)
        setReservas((atual) => atual.filter((reserva) => reserva.id !== id))
  }

  return { reservas, loading, erro, cancelar, recarregar: carregar }
}