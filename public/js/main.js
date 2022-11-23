// Select all checkmark icons

let checkMark = document.querySelectorAll(".bi-check-circle")

let arr = Array.from(checkMark)
console.log(arr)


arr.forEach(element => {
    
    element.addEventListener('click', () => {

        console.log(this.parentNode.childNodes[3].innerText)
    })
})