export const randomColor = () => {
  let rgb = []

  for (let i = 0; i < 3; i++) {
    rgb.push(Math.floor(Math.random() * 255))
  }

  return `rgb(${rgb.join(',')})`
}
