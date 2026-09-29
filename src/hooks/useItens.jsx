import { useEffect, useState } from 'react'
import { listarItens } from '../api/quintasApi.js'

export function useItens() {
  const [itens, setItens] = useState([])
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);

  useEffect(() => { //react nao permite que funcao passada ao useEffect seja async
    async function carregar() {
      const dados = await listarItens()
      setItens(dados)
      setLoading(false);
    }
    carregar()
  }, [])

  return { itens, loading, erro }
}