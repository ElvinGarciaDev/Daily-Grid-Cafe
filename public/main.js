let btn = document.querySelectorAll(".bi-check-circle")

let btnArray = Array.from(btn)

btnArray.forEach(element => {

    element.addEventListener("click", () => {

        // We'll get back something like name: elvin
        let name = element.parentNode.parentNode.parentNode.childNodes[3].childNodes[1].innerText
        

        // We only want elvin. so we can turn the string into an array and remove the first element name:  This leaves us with only the name
        let nameArr = name.split(" ")
        
        // Remove the first element from the array which should be name:
        nameArr.shift()

        // Only element in the array should be the customers name. SO turn the array into a string
        let nameStr = nameArr.join()


        let orderReady = new SpeechSynthesisUtterance()
        orderReady.text = `order for  ${nameStr}  is ready`
        window.speechSynthesis.speak(orderReady)
        window.location.reload(true)
    })
})
