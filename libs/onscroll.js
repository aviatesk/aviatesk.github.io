const pageInfo = document.getElementById('page-info')
const name = pageInfo.innerText

const h1s = document.getElementsByTagName('h1')
const h1Heights = []
for (let i = 0; i < h1s.length; i++) {
  h1Heights.push(h1s[i].offsetTop)
}

const h2s = document.getElementsByTagName('h2')
const h2Heights = []
for (let i = 0; i < h2s.length; i++) {
  h2Heights.push(h2s[i].offsetTop)
}

function onScroll() {
  const h1Index = h1Heights.length === 0 ? undefined : getCurrentIndex(h1Heights)
  const h2Index = h2Heights.length === 0 ? undefined : getCurrentIndex(h2Heights)
  pageInfo.innerText = h2Index && h1Index ? `${name} / ${h1s[h1Index].innerText} / ${h2s[h2Index].innerText}` :
                       h1Index ? `${name} / ${h1s[h1Index].innerText}` :
                       name
}

function getCurrentIndex(hhs) {
  if (window.scrollY < hhs[0] / 2) { return }

  const pos = window.scrollY + window.screen.height / 2

  for (let i = 0; i < hhs.length; i++) {
    if (i === hhs.length-1) { return }

    const hh = hhs[i]

    const nextHH = hhs[i+1]
    if (hh < pos && pos < nextHH) {
      return [i]
    }
  }

  return
}

window.onscroll = _.throttle(onScroll, 500)
onScroll() // initialize
