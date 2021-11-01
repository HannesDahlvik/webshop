const ImageParser = (imgName: string): string => {
    if (imgName) return `/api/image/${imgName}`
    else return '/api/image/placeholder'
}

export default ImageParser
