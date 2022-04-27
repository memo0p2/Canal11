window.onload = function() {
    main();
};

function main(){
    accounts = [
        { email: "correo1@gmail.com", owner: false },
        { email: "correo2@gmail.com", owner: false },
        { email: "correo3@gmail.com", owner: false },
        { email: "correo4@gmail.com", owner: false },
        { email: "correo5@gmail.com", owner: true }
    ]
    let text=''
    let aux=0
    accounts.forEach(correo => {
        if(correo.owner){
            let burbuja=accounts[0];
            accounts[0]=accounts[aux];
            accounts[aux]=burbuja;
            console.log('hola')
        }
        aux++
    });
    aux=0
    accounts.forEach(correo => {
        let opacidad=1-aux/5
        text+=`
            <div class="offset-1 col-8" style="opacity: ${opacidad}">
                <span>${correo.email}</span>
            </div>
        `
        if(correo.owner){
            text+=`
            <div class="col-1">
                <span>YOU</span>
            </div>
            <div class="col-1">
                <span class="bullet material-icons float-right">
                    radio_button_checked
                </span>
            </div>
            `
        }else{
            text+=`
            <div class="col-1"></div>
            <div class="col-2">
                <span class="bullet material-icons float-right style="opacity: ${opacidad}"">
                    radio_button_unchecked
                </span>
            </div>
            `
        }
        aux++
    });

    document.getElementById('correos').innerHTML=text;
}