/*Select elements of html */

const addressForm = document.querySelector("#address-form");
const cepInput = document.querySelector("#cep");
const addressInput = document.querySelector("#address");
const number = document.querySelector('#number');
const complement = document.querySelector('#complement');
const cityInput = document.querySelector("#city");
const neighborhoodInput = document.querySelector("#neighborhood");
const regionInput = document.querySelector("#region");
const formInputs = document.querySelectorAll("[data-input]");

const closeButton = document.querySelector("#close-message");
const fadeElement = document.querySelector("#fade");
const buttonCad = document.querySelector('#save-btn');

//validate cep input
cepInput.addEventListener("keypress", (e) => {
    const onlyNumber = /[0-9]/;
    const key = String.fromCharCode(e.keyCode);

    //allow only numbers
    if(!onlyNumber.test(key)){
        e.preventDefault();
        return;
    }
});

//get address event, when numbers = 8 numbers.
cepInput.addEventListener("keyup", (e) => {
    const inputValue = e.target.value;

    //click if we have the correct length
    if(inputValue.length === 8){
        getAddress(inputValue);
    }
});

//Get customer address from API
const getAddress = async (cep) => {
    toogleLoader(); 

    cepInput.blur();//remove input selection
    const apiUrl = `https://viacep.com.br/ws/${cep}/json/`;
    const response = await fetch(apiUrl);

    const data = await response.json();
    
    //show error and reset form
    if (data.erro === true) {
      if(!addressInput.hasAttribute("disabled")){
        toggleDisabled();
      }

        toogleLoader();
        toggleMessage("CEP Inválido, tente novamente.")
      addressInput.value = "";
      cityInput.value = "";
      neighborhoodInput.value = "";
      regionInput.value = "";
      number.value = "";
      complement.value = "";
        
        return;
      }
    
      // Activate disabled attribute if form is empty
      if (addressInput.value === "") {
      toggleDisabled();
      }

      addressInput.value = data.logradouro;
      cityInput.value = data.localidade;
      neighborhoodInput.value = data.bairro;
      regionInput.value = data.uf;

      toogleLoader();
    };
    
    // Add or remove disable attribute
    const toggleDisabled = () => {
      if (regionInput.hasAttribute("disabled")) {
        formInputs.forEach((input) => {
          input.removeAttribute("disabled");
        });
      } else {
        formInputs.forEach((input) => {
          input.setAttribute("disabled", "disabled");
        });
      }
    };

//show or hide loader
const toogleLoader = () => {
    
    const loaderElement = document.querySelector("#loader");

    fadeElement.classList.toggle("hide");
    loaderElement.classList.toggle("hide");
};

//show or hide message
const toggleMessage = (msg) => {
    const messageElement = document.querySelector("#message");
    const messageElementText = document.querySelector("#message p");

    messageElementText.innerHTML = msg;

    fadeElement.classList.toggle("hide");
    messageElement.classList.toggle("hide");
};      

//event close msg
closeButton.addEventListener("click", () => toggleMessage());



// Save address
buttonCad.addEventListener("click", () => {
    toogleLoader();  

    toggleMessage("Endereço salvo com sucesso!");
    toogleLoader();
    toggleDisabled();
  
    
  });




