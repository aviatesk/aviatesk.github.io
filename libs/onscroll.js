const pageInfo = document.getElementById('page-info')
const name = pageInfo.innerText

const h1s = Array(...document.getElementsByTagName('h1'))
const h2s = Array(...document.getElementsByTagName('h2'))

let h1Heights, h2Heights
function getHeights() {
  // console.log(`getHeights`)

  h1Heights = h1s.map(h1 => h1.offsetTop)
  h2Heights = h2s.map(h2 => h2.offsetTop)
}

function onScroll() {
  // console.log(`onScroll`)

  const h1Index = h1Heights.length === 0 ? undefined : getCurrentIndex(h1Heights)
  let h2Index = h2Heights.length === 0 ? undefined : getCurrentIndex(h2Heights)

  // throw away maybe invalid indexing
  if (h1Index !== undefined && h2Index !== undefined) {
    if (h1Heights[h1Index] > h2Heights[h2Index]) {
      h2Index = undefined
    }
  }

  pageInfo.innerText = (h2Index !== undefined && h1Index !== undefined) ? `${name} / ${h1s[h1Index].innerText} / ${h2s[h2Index].innerText}` :
                       (h1Index !== undefined) ? `${name} / ${h1s[h1Index].innerText}` :
                       name
}

function getCurrentIndex(heights) {
  if (window.scrollY < heights[0] / 2) { return }

  const pos = window.scrollY + window.innerHeight / 2

  for (let i = 0; i < heights.length; i++) {
    if (i < heights.length-1 && heights[i] < pos && pos < heights[i+1]) {
      return i
    }
  }

  return heights.length-1 // last index
}

getHeights() // XXX: we need this, otherwise `onScroll` can be called before height initalization
window.addEventListener('resize', _.throttle(getHeights, 500))
window.addEventListener('scroll', _.throttle(onScroll, 500))
window.addEventListener('load', () => {
  getHeights()
  onScroll()
})
