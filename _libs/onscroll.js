const pageInfo = document.getElementById('page-info')
const pageInfoText = pageInfo.innerText

const h1s = Array(...document.getElementsByTagName('h1'))
const h2s = Array(...document.getElementsByTagName('h2'))

let h1Offsets, h2Offsets
function getHeights() {
  // console.log(`getHeights`)

  h1Offsets = h1s.map(h1 => h1.offsetTop)
  h2Offsets = h2s.map(h2 => h2.offsetTop)
}

function onScroll() {
  // console.log(`onScroll`)

  const h1Index = h1Offsets.length === 0 ? undefined : getCurrentIndex(h1Offsets)
  let h2Index = h2Offsets.length === 0 ? undefined : getCurrentIndex(h2Offsets)

  // throw away maybe invalid indexing
  if (h1Index !== undefined && h2Index !== undefined) {
    if (h1Offsets[h1Index] > h2Offsets[h2Index]) {
      h2Index = undefined
    }
  }

  pageInfo.innerText = (h2Index !== undefined && h1Index !== undefined) ? `${pageInfoText} / ${h1s[h1Index].innerText} / ${h2s[h2Index].innerText}` :
                       (h1Index !== undefined) ? `${pageInfoText} / ${h1s[h1Index].innerText}` :
                       pageInfoText
}

function getCurrentIndex(offsets) {
  const pos = window.scrollY + window.innerHeight / 2

  if (pos < offsets[0]) { return }

  for (let i = 0; i < offsets.length; i++) {
    if (i < offsets.length-1 && offsets[i] < pos && pos < offsets[i+1]) {
      return i
    }
  }

  return offsets.length-1 // last index
}

getHeights() // XXX: we need this, otherwise `onScroll` can be called before height initalization
window.addEventListener('resize', _.throttle(getHeights, 500))
window.addEventListener('scroll', _.throttle(onScroll, 500))
window.addEventListener('load', () => {
  getHeights()
  onScroll()
})
