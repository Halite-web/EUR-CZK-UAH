const eurInput = document.getElementById("eur");
const czkInput = document.getElementById("czk");
const uahInput = document.getElementById("uah");

let rates = {};

// Загружаем курсы валют
async function loadRates() {
    try {
        const response = await fetch("https://api.exchangerate.host/latest?base=EUR&symbols=CZK,UAH");
        const data = await response.json();
        rates = data.rates;
    } catch (error) {
        alert("Ошибка загрузки курсов валют. Проверьте подключение к интернету.");
    }
}

function convertFromEUR(value) {
    czkInput.value = (value * rates.CZK).toFixed(2);
    uahInput.value = (value * rates.UAH).toFixed(2);
}

function convertFromCZK(value) {
    const eur = value / rates.CZK;
    eurInput.value = eur.toFixed(2);
    uahInput.value = (eur * rates.UAH).toFixed(2);
}

function convertFromUAH(value) {
    const eur = value / rates.UAH;
    eurInput.value = eur.toFixed(2);
    czkInput.value = (eur * rates.CZK).toFixed(2);
}

eurInput.addEventListener("input", () => {
    if (eurInput.value) convertFromEUR(parseFloat(eurInput.value));
});

czkInput.addEventListener("input", () => {
    if (czkInput.value) convertFromCZK(parseFloat(czkInput.value));
});

uahInput.addEventListener("input", () => {
    if (uahInput.value) convertFromUAH(parseFloat(uahInput.value));
});

loadRates();