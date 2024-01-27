export const uploadFile = async (file: File) => {
  const url = new Promise<string>((resolve) => {
    setTimeout(() => {
      resolve(URL.createObjectURL(file))
    }, 2000)
  })

  return url
}
