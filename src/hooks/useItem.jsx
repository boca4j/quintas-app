import { useEffect, useState } from 'react'
import { obterItem } from '../api/quintasApi'

export function useItem(id) {
    const [item, setItem] = useState(null)
    const [loading, setLoading] = useState(true)
    const [erro, setErro] = useState(null)

    useEffect(() => {
        let cancelado = false

        setLoading(true)
        setErro(null)

        obterItem(id)
            .then((dados) => {
                if (!cancelado) setItem(dados)
            })
            .catch((erro) => {
                if (!cancelado) setErro(erro)
            })
            .finally(() => {
                if (!cancelado) setLoading(false)
            })

        return () => {
            cancelado = true
        }
    }, [id])

    return { item, loading, erro }
}