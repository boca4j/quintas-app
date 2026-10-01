import { useState } from 'react'

const PLACEHOLDER = 'https://placehold.co/600x400/f3efe6/6b665c?text=Sem+imagem'

function ImagemEspaco({ src, alt, className = '' }) {
  const [falhou, setFalhou] = useState(false)
  const semImagem = !src || falhou

  return (
    <img
      src={semImagem ? PLACEHOLDER : src}
      alt={semImagem ? `${alt} (sem imagem)` : alt}
      loading="lazy"
      onError={() => setFalhou(true)}
      className={`h-full w-full object-cover ${className}`}
    />
  )
}

export default ImagemEspaco