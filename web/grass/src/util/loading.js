export default function loading(action) {
  // const node = document.querySelector('#loading') 
  // if (node !== undefined && node !== null) {
  //   let style = node["style"];
  //   if (style !== undefined) {
  //     style.display = action === 'add' ? 'block' : 'none'
  //   }
  const node = document.querySelector('#loading')
  if (node && node.style && node.style.display) {
    node.style.display = action === 'add' ? 'block' : 'none'
  }
}
