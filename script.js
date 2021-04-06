let cursor = document.querySelector('.cursor');
let clickables = document.getElementsByClassName('clickables');
let shop = document.querySelector('.shop');
let pickableShoe = document.querySelector('.pickable-shoe');
let bagWhite = document.querySelector('.bag-white');

// changing elements
let main = document.querySelector('.main');
let circle = document.querySelector('.circle');
let floatingImage = document.getElementsByClassName('float');
let leftContainer = document.querySelector('.leftContainer');
let rightContainer = document.querySelector('.rightContainer');

// used for parsing shoes
let i = 0;


class Shoes{
    constructor(main, circle, floatingImage, leftContainer, rightContainer){
        this.shoesCollection = [
            {
                image: "./images/shoe1.png",
                bgColor: "#7e3dd3",
                height: "10rem",
                width: "20rem"
            },
            {
                image: "./images/shoe3.png",
                bgColor: "#7485d4",
                height: "12rem",
                width: "18rem"
            },
            {
                image: "./images/shoe2.png",
                bgColor: "#5acc80",
                height: "20rem",
                width: "20rem"
            }
        ];
        
        this.main = main;
        this.circle = circle;
        this.floatingImage = Array.from(floatingImage);
        this.leftContainer = leftContainer;
        this.rightContainer = rightContainer;
    }
    
    prev(){
        this.circle.style.backgroundColor = this.shoesCollection[i].bgColor;

        this.main.style.backgroundColor = this.shoesCollection[i].bgColor;
        
        this.floatingImage.forEach(element=>{
            element.src = this.shoesCollection[i].image;
            element.style.height = this.shoesCollection[i].height;
            element.style.width = this.shoesCollection[i].width;
        });
    }

    next(){

        this.circle.style.backgroundColor = this.shoesCollection[i].bgColor;
        this.main.style.backgroundColor = this.shoesCollection[i].bgColor;

        this.floatingImage.forEach(element=>{
            element.src = this.shoesCollection[i].image;
            element.style.height = this.shoesCollection[i].height;
            element.style.width = this.shoesCollection[i].width;
        });
    }

    leftMoveIn(){
        this.leftContainer.addEventListener('animationend', ()=>{
            this.leftContainer.style.left = "30%";
            this.leftContainer.style.animation = 'rotateLeft 15s infinite';
        });
    }

    moveOutIn(callback){
        this.leftContainer.style.animation = 'leftMoveOut 1s';
        this.leftContainer.addEventListener('animationend', ()=>{
            this.leftContainer.style.animation = 'leftMoveIn 1s';
            this.leftMoveIn();
        });

        this.rightContainer.style.animation = 'rightMoveOut 1s';
        this.rightContainer.addEventListener('animationend', ()=>{
            callback();
            this.rightContainer.style.animation = 'rightMoveIn 1s';
            this.rightMoveIn();
        });
    }

    rightMoveIn(){
        this.rightContainer.addEventListener('animationend', ()=>{
            this.rightContainer.style.right = "30%";
            this.rightContainer.style.animation = 'rotateRight 15s infinite';
        });
    }

}

    clickables = Array.from(clickables);

let shoes = new Shoes(main,
    circle,
    floatingImage,
    leftContainer,
    rightContainer
);

shoes.leftMoveIn();
shoes.rightMoveIn();

//left btn
clickables[2].addEventListener('click', ()=> {
    if (i == 0)
        return;
    i--;
    shoes.moveOutIn(()=>{
        shoes.prev();
    });
});

//right btn
clickables[3].addEventListener('click', ()=> {
    if (i == shoes.shoesCollection.length - 1 )
        return;
    i++;
    shoes.moveOutIn(()=>{
        shoes.next();
    });
    
});


clickables.forEach(element => {
    element.addEventListener('mousedown', e =>{
        cursor.classList.add("cursorDown");
    });

    element.addEventListener('mouseup', e =>{
        cursor.classList.remove("cursorDown");
    });
});

clickables[2].addEventListener('mousedown', arrowDown);
clickables[3].addEventListener('mousedown', arrowDown);

clickables[2].addEventListener('mouseup', arrowUp);
clickables[3].addEventListener('mouseup', arrowUp);


function arrowDown(e) {
    let element = e.target.parentElement; 
    element.style.backgroundColor = "#585656";
}

function arrowUp(e) {
    let element = e.target.parentElement; 
    element.style.backgroundColor = "#ffffff";
}


/* div.shop animation */
shop.addEventListener('mouseenter',()=>{
    pickableShoe.classList.add('shoe-picked');
    bagWhite.style.transform = "translateY(0%)";
});

shop.addEventListener('mouseleave',()=>{
    pickableShoe.classList.remove('shoe-picked');
    bagWhite.style.transform = "translateY(-100%)";
});

/* cursor */
window.addEventListener('mousemove',(e)=>{
    cursor.style.top = e.pageY + 'px';
    cursor.style.left = e.pageX + 'px';
});
