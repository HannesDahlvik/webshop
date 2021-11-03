const ImageParser = (imgName: string): string => {
    if (imgName) return `/images/${imgName}.png`
    else return '/images/placeholder.png'
}

export default ImageParser
