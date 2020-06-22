
function getBalancePerCurrency(balance, currency){
    if (balance == null) {
        return 0;
    }
    return (balance.initialBalanceList.find((c)=> {
        return c.currency.toString() == currency.toString()
    } )).initialBalance;
}


export {
    getBalancePerCurrency
}