const randomcolor = (colorNum, colors = 1) => {
  return "hsl(" + (colorNum * (360 / colors) % 360) + ",100%,50%)";
}

export default randomcolor;