const PLACEHOLDER = 'https://placehold.co/600x400?text=Sem+imagem'

function ImagemEspaco({ src, alt }) {
  return (
    <img
      src={src || PLACEHOLDER}
      alt={alt}
      className="h-full w-full object-cover"
    />
  )
}

export default ImagemEspaco
