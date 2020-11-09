const els = document.getElementsByClassName("collapsible-header")
for (const el of els) {
  el.addEventListener("click", function () {
    el.classList.toggle("collapsible-header-active")
    const content = el.nextElementSibling
    if (content.style.maxHeight) {
      content.style.maxHeight = null
    } else {
      content.style.maxHeight = content.scrollHeight + "px"
    }
  })
}
