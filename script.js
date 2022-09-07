/*!
* Start Bootstrap - Shop Homepage v5.0.5 (https://startbootstrap.com/template/shop-homepage)
* Copyright 2013-2022 Start Bootstrap
* Licensed under MIT (https://github.com/StartBootstrap/startbootstrap-shop-homepage/blob/master/LICENSE)
*/
// This file is intentionally blank
// Use this file to add JavaScript to your project

//this function is called on clicking cart button
function handleSubmit(event){
    event.preventDefault();

    let cartSec = document.getElementsByClassName("cart-section")[0];
    let cartRow = cartSec.getElementsByClassName("row")[0];
    console.log(cartRow.children.length);

    //display cart is empty if cart length is 0
    if(cartRow.children.length){
        document.getElementsByClassName("cart-header")[0].innerText="Your cart";
    }
    else{
        document.getElementsByClassName("cart-header")[0].innerText="Your cart is empty!!";
    }

    //hide cards in home page when clicked on cart and show only cart items put in cart-section
    document.getElementsByClassName("product-section")[0].style.display="none";
    document.getElementsByClassName("cart-section")[0].style.display="block";

    removeItemsFromCart();
}

function handleHome(event){
    event.preventDefault();

    document.getElementsByClassName("cart-section")[0].style.display="none";
    document.getElementsByClassName("product-section")[0].style.display="block";
    
}

//get all cards in home page
let productSection = document.getElementsByClassName("product-section")[0];
let addToCartElement = productSection.getElementsByClassName("card-footer");
let addedToCartItems=[];


for(let i=0;i<addToCartElement.length;i++){
    let addToCartCard = addToCartElement[i];
    //get add to cart button of cards in home page
    let addToCartButton = addToCartCard.getElementsByClassName("btn")[0];

    if(addToCartButton.innerText === "Add to cart"){
        
        addToCartButton.addEventListener("click",() =>{
            // console.log(i);
            //get the whole card element
            let colElement = addToCartCard.parentElement.parentElement;
            //add card id for each card
            colElement.dataset.card_id ="card"+i;
            //clone the card - one copy displayed in home page -another copy moved to cart page
            let cloneElement = colElement.cloneNode(true);

            //add the cloned element ot cart
            addtoCartSection(cloneElement);

            //disable the add to cart button
            addToCartButton.classList.add("disabled");

        })
    }
}


function updateCartValue(value){
     //get count icon
    let cartDiv = document.getElementsByClassName("rounded-pill")[0];
    //set value to innerText
    cartDiv.innerText=value;
}

function addtoCartSection(cloneElement){
    let getSection=document.getElementsByClassName("cart-section")[0];
    let getRow = getSection.getElementsByClassName("row")[0];

    //add the cloned card to the cart section
    getRow.appendChild(cloneElement);

    let getCol = getRow.getElementsByClassName("col");

    //get the number of cards in cart page and update cart value
    let colLength = getCol.length;
    updateCartValue(colLength);

    for(let i=0;i<colLength;i++){
    let columnElement = getCol[i];
    let getCard= columnElement.getElementsByClassName("card")[0];
    let cardFooter = getCard.getElementsByClassName("card-footer")[0];
    let getButton = cardFooter.getElementsByClassName("btn")[0];
    //add style to remove button
    getButton.innerText="Remove";
    getButton.classList.add("bg-danger");
    getButton.classList.add("text-white");
    getButton.classList.remove("btn-outline-dark");
    }
}


function removeItemsFromCart(){
//remove elements from cart on clicking remove button

let cartSectionElements = document.getElementsByClassName("cart-section")[0];
//get all the cards in cart page
let cartSectionColumns = cartSectionElements.getElementsByClassName("col");

for(let i=0;i<cartSectionColumns.length;i++){

    // console.log(`length is  - ${cartSectionColumns.length}`);
    let getCartCol = cartSectionColumns[i];

    //get the card id
    let datasetId = getCartCol.getAttribute('data-card_id');
    // console.log(`data set id ${datasetId}`);
    let cartCard = getCartCol.getElementsByClassName("card")[0];
    let cartCardFooter = cartCard.getElementsByClassName("card-footer")[0];
    //get the remove button in card
    let removeButton = cartCardFooter.getElementsByClassName("btn")[0];

    console.log(removeButton);
    //adding event listener to the button
    removeButton.addEventListener("click", () =>{
        //remove the div
        getCartCol.remove();

        // console.log(`data set id in remove ${datasetId}`);

        //update cart value as item is removed
        //number of cards passed as argument
        updateCartValue(cartSectionColumns.length);

        enableAddToCartButton(datasetId);
    })
}

}

//once item is removed from cart enable add to card button in home page
function enableAddToCartButton(cardId){
    let cartSectionElements = document.getElementsByClassName("product-section")[0];
    let cartSectionColumns = cartSectionElements.getElementsByClassName("col");
    
    for(let i=0;i<cartSectionColumns.length;i++){
        let cartElement = cartSectionColumns[i];
        let getDisabledButton = cartElement.getElementsByClassName("btn")[0];
        let getDataSetID =  cartElement.getAttribute('data-card_id');
 
        //get all cards from home page identify the card id removed from cart
        //remove the disabled attribute to enable add to cart button
        if(getDataSetID === cardId){
            getDisabledButton.classList.remove("disabled");
        }
    }
}


function rating(event){
    let findSibling = event.target;
    let currentSiblingClassName = findSibling.classList.value;
        
    //fill the selected star
    //when gicing rating for the first time
    if(currentSiblingClassName !== "bi-star-fill"){
        findSibling.classList.replace("bi-star","bi-star-fill");
    }

    let cloneSibling = findSibling;

    //get all the previous stars and fill them till the selected star
    //when rating is increased
    while(findSibling.previousElementSibling){
        let prevSibling = findSibling.previousElementSibling;
        let className = prevSibling.classList.value;
        
        if(className !== "bi-star-fill"){
             prevSibling.classList.replace("bi-star","bi-star-fill");
        }
         findSibling = prevSibling;
        
    }
    
    //get all the stars after the clicked star
    //empty the stars if filled
    //when rating is reduced 
    while(cloneSibling.nextElementSibling){
        let nextSibling = cloneSibling.nextElementSibling;
        let className = nextSibling.classList.value;
        
        if(className !== "bi-star"){
            nextSibling.classList.replace("bi-star-fill","bi-star");
        }
        cloneSibling=nextSibling;
    }
}