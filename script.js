const BASE_URL= "https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies";

const dropDown = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("button");
const msg = document.querySelector(".msg");

document.addEventListener("DOMContentLoaded", () => {
    getExchangeRate();
});

for (select of dropDown) {
    for(currCode in countryList) {
    let newOption = document.createElement("option");
    newOption.value = currCode;
    newOption.innerText = currCode;
    select.append(newOption);
    }
        if (select.name === "from" && currCode === "US") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currCode === "INR") {
      newOption.selected = "selected";
    }
    select.addEventListener("change", event => {
    updateFlag(event.target);
})
}

const updateFlag = (el)=>{
    let currCode = el.value;
    let countryCode = countryList[currCode];
    let src_link = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = el.parentElement.querySelector("img");
    img.src = src_link;
}

btn.addEventListener("click", event => {
    event.preventDefault();
    getExchangeRate();
});

const getExchangeRate = async () => {
    const fromCurrency = document.querySelector(".from select").value.toLowerCase();
    const toCurrency = document.querySelector(".to select").value.toLowerCase();
    const amount = document.querySelector(".amount input").value;

    if (amount === "" || amount === "0") {
        alert("Please enter a valid amount");
        return;
    }
    console.log(fromCurrency, toCurrency, amount);
    const URL = `${BASE_URL}/${fromCurrency}.json`;

    let response = await fetch(URL);
    let data = await response.json();
    let exchangeRate = data[fromCurrency][toCurrency];
    let finalAmt = (exchangeRate * amount).toFixed(2);
    // console.log(data);
    // console.log(exchangeRate);
    // console.log(totalExRate);
    msg.innerText = `${amount} ${fromCurrency.toUpperCase()} = ${finalAmt} ${toCurrency.toUpperCase()}`;    
}
