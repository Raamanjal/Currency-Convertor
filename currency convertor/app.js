const API_KEY="fca_live_HXZqnmnqPLbNpEYaGoW8iEIa7ZAXHBUJSYVkrn1J"
const BaseURL=`https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}`;
const dropdowns=document.querySelectorAll(".dropdown select");
const sub=document.querySelector("button");
const fromCurr=document.querySelector(".from select");
const toCurr=document.querySelector(".to select");
const msg=document.querySelector(".msg");
 
for(let select of dropdowns){
    for(code in countryList){
       let newOption=document.createElement("option");
       newOption.innerText=code;
       newOption.value=code;
       if(select.name==="from" && code==="INR"){
        newOption.selected="selected";
       }
       else if(select.name==="to" && code==="USD"){
        newOption.selected="selected";
       }
       select.append(newOption);
    }
    select.addEventListener("change", (evt)=>{
        updateFlag(evt.target);
    });
}

const updateFlag=(element)=>{
    let currCode=element.value;
    let countryCode=countryList[code];
    let newSrc=`https://flagsapi.com/${countryCode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");
    img.src=newSrc;
};

sub.addEventListener("click",async(evt)=>{
    evt.preventDefault();
    let amount=document.querySelector(".amount input");
    let amtVal=amount.value;

    if(amtVal===""||amtVal<1){
        amtVal=1;
        amount.value="1";
    }
    try {
        let response = await fetch(BaseURL);
        let data = await response.json();

        // Extract conversion rate
        let fromRate = data.data[fromCurr.value]; // Exchange rate of fromCurr relative to USD
        let toRate = data.data[toCurr.value]; // Exchange rate of toCurr relative to USD

        if (!fromRate || !toRate) {
            msg.innerText = "Exchange rate not available!";
            return;
        }

        // Convert properly: (amount in fromCurr) * (1/fromRate) * toRate
        let finalAmount = ((amtVal / fromRate) * toRate).toFixed(2);
        msg.innerText = `${amtVal} ${fromCurr.value} = ${finalAmount} ${toCurr.value}`;
    } catch (error) {
        msg.innerText = "Error fetching exchange rate!";
        console.error("Error:", error);
    }
});