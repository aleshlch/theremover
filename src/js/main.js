import '../scss/main.scss'

import { serverPath } from './serverPath'

// Burger animation

const iconBurger = document.querySelector('.burger')
const menu = document.querySelector('.header__menu')

if(iconBurger) {
    iconBurger.addEventListener('click', function() {
        document.body.classList.toggle('scroll-lock')
        iconBurger.classList.toggle('burger--active')
        menu.classList.toggle('header__menu--active')
    })
}

// Smooth scroll

const menuLinkArray = document.querySelectorAll('.menu__link')

if (menuLinkArray.length > 0) {
    menuLinkArray.forEach((link)=> {
        link.addEventListener('click', function(e) {
            const menuLink = e.target
            if (menuLink.dataset.to && document.querySelector(menuLink.dataset.to)) {
                const toBlock = document.querySelector(menuLink.dataset.to)
                const toBlockValue = toBlock.getBoundingClientRect().top + scrollY - document.querySelector('.header').offsetHeight

                if(menu.classList.contains('header__menu-active')) {
                    document.body.classList.remove('scroll-lock')
                    iconBurger.classList.remove('burger--active')
                    menu.classList.remove('header__menu--active')
                }

                window.scrollTo({
                    top: toBlockValue,
                    behavior: "smooth"
                })
            }
            e.preventDefault()
        })
    })
}


//Upload image 

const input = document.querySelector('#uploadFile')
const img = document.querySelector('#dwnl-img')
const btnBefore = document.querySelector('#orig')
const btnAfter = document.querySelector('#removed')
const uploadLabel = document.querySelector('#uploadLabel')
const exampleBtn = document.querySelectorAll('.example__img')


input.addEventListener('change', async function () {

    if(this.files[0]) {

    const toBlock = document.querySelector('.upload')

    window.scrollTo({
        top: toBlock.getBoundingClientRect().top + scrollY - document.querySelector('.header').offsetHeight,
        behavior: "smooth"
    })   

    // Get upload image

    const beforeImage = this.files[0]
    const beforeImageSRC = URL.createObjectURL(beforeImage)

    const afterImageSRC = await sendImage(beforeImage)

    img.src = afterImageSRC

    downImage(beforeImageSRC, afterImageSRC)

    }
})

exampleBtn.forEach(btn => {
    btn.addEventListener('click', async (e) => {

        let beforeImage

        const beforeImageSRC = e.target.src

        await toDataURL(beforeImageSRC)
        .then(dataUrl => {
        let fileData = dataURLtoFile(dataUrl, "imageName.jpg")
        beforeImage = fileData
        })

        const afterImageSRC = await sendImage(beforeImage)

        img.src = afterImageSRC

        downImage(beforeImageSRC, afterImageSRC)
    })
})

const sendImage = async (beforeImage) => {

    // Display change

    document.querySelector('.example').classList.add('none')

    input.setAttribute("disabled", "disabled")
    uploadLabel.innerText = 'Loading...'
    uploadLabel.classList.add('disabled')


    // API

    const formData = new FormData();
    formData.append("image_file", beforeImage);

    const response = await fetch("https://clipdrop-api.co/remove-background/v1", {
        method: "POST",
        headers: {
            "x-api-key": process.env.API_KEY
        },
        body: formData
    })

    const outputBlob = await response.blob()

    const afterImageSRC = URL.createObjectURL(outputBlob)

    return afterImageSRC
}

const downImage = (beforeImageSRC, afterImageSRC) => {

    // Show section download image
    document.querySelector('.download__image').classList.remove('none')

    input.removeAttribute("disabled")
    uploadLabel.innerText = 'Upload image'
    uploadLabel.classList.remove('disabled')

    btnBefore.addEventListener('click', () => {
        img.src = beforeImageSRC
        btnAfter.classList.remove('dwnl-text--active')
        btnBefore.classList.add('dwnl-text--active')
    })

    btnAfter.addEventListener('click', () => {
        img.src = afterImageSRC
        btnBefore.classList.remove('dwnl-text--active')
        btnAfter.classList.add('dwnl-text--active')
    })

    // Download image

    const getImg = document.createElement("a")
    const downBtn = document.querySelector("#downBtn")

    downBtn.appendChild(getImg)

    getImg.href = img.src
    getImg.style.display = "none";
    getImg.download = "theremover-image";

    downBtn.addEventListener('click', () => {
        document.body.appendChild(getImg)
        getImg.click()
        document.body.removeChild(getImg)
    })
}

const toDataURL = url => fetch(url)
    .then(response => response.blob())
    .then(blob => new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onloadend = () => resolve(reader.result)
    reader.onerror = reject
    reader.readAsDataURL(blob)
}))

const dataURLtoFile = (dataurl, filename) => {
    var arr = dataurl.split(','), mime = arr[0].match(/:(.*?);/)[1],
    bstr = atob(arr[1]), n = bstr.length, u8arr = new Uint8Array(n);
    while(n--){
    u8arr[n] = bstr.charCodeAt(n);
    }
  return new File([u8arr], filename, {type:mime});
}

//Close download image

const btnCloseImage = document.querySelector('#closeDwnlImage')

btnCloseImage.addEventListener('click', (e) => {
    e.preventDefault()
    document.querySelector('.download__image').classList.add('none')
    document.querySelector('.example').classList.remove('none')
})



//Slider

const slider = document.getElementById("slider")

const slide = () => {
    let slideValue = slider.value;
    document.getElementById("my-img").style.clipPath = "polygon(0 0," + slideValue + "% 0," + slideValue + "% 100%, 0 100%)";
}

slider.addEventListener("input", slide)


//Popup

const  btnOpen = document.querySelector('#modalShow')
const btnClose = document.querySelector('#closePopup')
const popup = document.querySelector('.popup')
const form = document.querySelector('.popup__form')
const nameInput = document.querySelector('#form-name')
const emailInput = document.querySelector('#form-email')
const errorText = 'Please enter a valid value'


btnOpen.addEventListener('click', () => {
    popup.classList.add('popup-visible')
})


btnClose.addEventListener('click', () => {
    hideModal()
    clearStyle()
    clearInput()
})

popup.addEventListener('click', (e) => {
    if(e.target.closest('.popup__wrapper')) {
        return
    } else {
        hideModal()
        clearStyle()
        clearInput()
    }
})


form.addEventListener('submit', (e) => {
    e.preventDefault()

    const data = {
        name: nameInput.value, 
        email: emailInput.value
    }


    if (validateEmail(data.email) && data.name.length > 0) {

        fetch(serverPath + 'requests', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
        })

        clearStyle()
        clearInput()
        hideModal()
       
    } else {
        if (!data.name.length > 0) {
            nameInput.classList.add('error-input')
            nameInput.parentNode.querySelector('.error-message').innerText = errorText
        }
        if(!validateEmail(data.email)) {
            emailInput.classList.add('error-input')
            emailInput.parentNode.querySelector('.error-message').innerText = errorText
        }
    }
})


const hideModal = () => {
    popup.classList.remove('popup-visible')
}


const validateEmail = (email) => {
    const pattern = /^[\w-\.]+@[\w-]+\.[a-z]{2,4}$/i
    return pattern.test(email)
}

const clearStyle = () => {
    emailInput.classList.remove('error-input')
    nameInput.classList.remove('error-input')
    document.querySelectorAll('.error-message').forEach((err) => {
        err.innerText = ''
    })
}

const clearInput = () => {
    emailInput.value = ''
    nameInput.value = ''
}