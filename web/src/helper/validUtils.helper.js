const formatPrice = (price) => {
    price = parseFloat(price)
    let formart_price = ''
    let i = 1
    while(price>=1){
        let num = price%10
        price = parseInt(price/10)
        if(i===3){
            formart_price += `${num}.`
            i=0
        }else{
            formart_price += `${num}`
            i++
        }
    }
    return formart_price.split("").reverse().join("")
}

export default {
    formatPrice
}
