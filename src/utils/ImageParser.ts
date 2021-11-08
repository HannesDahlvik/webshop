const ImageParser = (imgName: string): string => {
    if (imgName.includes('.png')) return `/images/${imgName}`
    if (imgName) return `/images/${imgName}.png`
    else return '/images/placeholder.png'
}

export default ImageParser
