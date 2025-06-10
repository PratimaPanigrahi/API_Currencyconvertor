//const BASE_URL = "https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies";

const BASE_URL = `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies`

const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const resulttxt = document.querySelector(".exchangeResult #resulttxt");

/*
for(let code in CountryList)
{
	console.log(code, CountryList[code]);
}
*/

for(let select of dropdowns)
{
	for(let currCode in CountryList)
	{
		let newOpt = document.createElement("option");
		newOpt.innerText = currCode;
		newOpt.value = currCode;
		
		if(select.name === "from" && currCode === "INR")
		{
			newOpt.selected = "selected";
		}
		else if(select.name === "to" && currCode === "USD")
		{
			newOpt.selected = "selected";
		}
		select.append(newOpt);
	}
	select.addEventListener("change",(event) =>{
		updateFlag(event.target);
	});
}

const updateFlag = (elem) =>
{
	let currCode = elem.value;
	let countryCode = CountryList[currCode];
	let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`
	let img = elem.parentElement.querySelector("img");
	img.src = newSrc;
};

window.addEventListener("load", (event) => {
  currencyConvert();
});

btn.addEventListener("click", (event) =>{
	event.preventDefault();
	currencyConvert();
});

async function currencyConvert()
{
	let amount = document.querySelector(".amountdiv input");
	let amtVal = amount.value;
	if(amtVal === "" || amtVal < 1)
	{
		amtVal = 1;
		amount.value = "1";
	}
	//console.log(fromCurr.value,  toCurr.value);
	//const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}/${toCurr.value.toLowerCase()}.json`; //old link
	
	const URL = `${BASE_URL}/${fromCurr.value.toLowerCase()}.json`;
	
	let response = await fetch(URL);
	let data = await response.json();
	let rate = data[fromCurr.value.toLowerCase()][toCurr.value.toLowerCase()];
	let finalAmt = amtVal * rate;
	//console.log(rate);

	resulttxt.innerText = `${amtVal} ${fromCurr.value} = ${finalAmt.toFixed(2)} ${toCurr.value}`;
}