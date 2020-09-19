let index = 0;
let imgBanner = document.getElementsByClassName("img")
imgBanner[0].classList.toggle("img-out")
rotationImg();

function rotationImg() {
    if(index > imgBanner.length-1){index = 0}
    index++
    // console.log(index)
    if(index === imgBanner.length){
        imgBanner[imgBanner.length-1].classList.toggle("img-out")
        imgBanner[0].classList.toggle("img-out")
    }
    else{
        imgBanner[index-1].classList.toggle("img-out")
        imgBanner[index].classList.toggle("img-out")
    }
    
    // console.log(index)  
    setTimeout(rotationImg, 5000)
}


function formulario(){
    let log = document.getElementById("log")
    if(log.style.display == "flex"){
        log.style.display = "none"
    }
    else{
            log.style.display = "flex"
    }
}

function userDetails(){
    let detail = document.getElementById("details")
    if(detail.style.display == "flex"){
        detail.style.display = "none"
    }
    else{
            detail.style.display = "flex"
    }
}


function menuResponsive(){
    let ancla = document.getElementsByClassName('lista');
    for(var i = 0; i < ancla.length; i++){
        ancla[i].classList.toggle('desaparece-lista')
    }
}

function closeWindow(){
    document.getElementById("log").style.display = "none"
}

function onlyNumbers(e){
    key = e.keyCode || e.which;

    teclado = String.fromCharCode(key);

    if(!Number(teclado)){
        return false;
    }
}

function userLogin(token){
    if(token === undefined){
        return console.log('No se ha logueado');
    }else{
        // console.log(token)
        localStorage.setItem('userToken', JSON.stringify({token: token})); 
        // var currentUser = JSON.parse(localStorage.getItem('currentUser')); 
        // var token = currentUser.token; // your token 

        // return function() {
        //     const header = new Headers();
        //     header.append('access-token', 'Bearer ' + JSON.parse(localStorage.getItem('userToken')).token)
        //     // console.log(JSON.parse(localStorage.getItem('userToken')).token)
        //     document.headers = header
        //     // console.log(JSON.parse(localStorage.getItem('userToken')))
        //     localStorage.clear()
        // }
        
    }
}



// document.addEventListener("click", (e) => {
//     let div = document.getElementById('log');
//     let noDiv = e.target;
//     console.log(noDiv);
//     if(div !== noDiv && div.style.display === 'flex'){
//         div.style.display = 'none';
//     }
// }, false)

