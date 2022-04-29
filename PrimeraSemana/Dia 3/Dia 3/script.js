window.onload = function() {
    main();
};

async function fetchDataAsync(url) {
    const response = await fetch(url);
    const valores =response.json();
    return valores;
}

function join (obj1,obj2) {
    let mergedArray = [];

    for(let item1 of Object.values(obj1)){

          let findItem = Object.values(obj2).find(function(item2){return item2.user_id === item1.id});//===
          if(!findItem){
            continue;
          }

          let {id, ...item2} = findItem;
          let cmp = {...item1, ...item2};
          mergedArray.push(cmp);
    }

    return mergedArray;
}

function getFecha(fecha){
    fecha=fecha.split('T')[0];
    fecha= fecha.split("-").reverse().join("/");    
    return fecha;
}

function cargarDatosViejo(users,dicc){
    let titulosUsersInfoViejo="";

    users.forEach(user => {
        namepartido=user.name.split(" ")
        titulosUsersInfoViejo+=`<tr>`
        titulosUsersInfoViejo+=`<th scope="row">${user.id}</th>`
        titulosUsersInfoViejo+=`<td>${namepartido[0]} ${namepartido[1]}</td>`
        titulosUsersInfoViejo+=`<td>${user.email.toUpperCase()}</td>`
        titulosUsersInfoViejo+=`<td>${dicc[user.gender]}</td>`
        titulosUsersInfoViejo+=`<td>${dicc[user.status]}</td>`
        titulosUsersInfoViejo+=`</tr>`
    });
    return titulosUsersInfoViejo
}

function cargarDatosNuevo(nuevosDatos,dicc){
    let titulosUsersInfoNuevo=""
    nuevosDatos.forEach(dato => {
        namepartido=dato.name.split(" ")
        titulosUsersInfoNuevo+=`<tr>`
        titulosUsersInfoNuevo+=`<th scope="row">${dato.id}</th>`
        titulosUsersInfoNuevo+=`<td>${namepartido[0]} ${namepartido[1]}</td>`
        titulosUsersInfoNuevo+=`<td>${dato.email.toUpperCase()}</td>`
        titulosUsersInfoNuevo+=`<td>${dicc[dato.gender]}</td>`
        titulosUsersInfoNuevo+=`<td>${dicc[dato.status]}</td>`
        titulosUsersInfoNuevo+=`<td>${dato.title.toUpperCase()}</td>`
        titulosUsersInfoNuevo+=`<td>${getFecha(dato.due_on)}</td>`
        titulosUsersInfoNuevo+=`<td>${dicc[dato.status2]}</td>`
        titulosUsersInfoNuevo+=`</tr>`
    });

    return titulosUsersInfoNuevo;

}

function ordenarAsc(p_array_json, p_key) {
    p_array_json.sort(function(a, b) {
    var textA = a.p_key;
    var textB = b.p_key;
    return (textA < textB) ? -1 : (textA > textB) ? 1 : 0;
    });
    return p_array_json
}

function ordenarDesc(p_array_json, p_key) {
    ordenarAsc(p_array_json, p_key); 
    return p_array_json.reverse(); 
}

function agregarBotonName(contadorName,users,dicc){
    let BotonName=document.getElementById("BotonName");
    BotonName.addEventListener("click", ()=>{
        
        console.log(contadorName%2==0)
        if (contadorName%2===0) {
            
            aux=ordenarAsc(users,"name")
            usersnames.innerHTML=cargarDatosViejo(aux,dicc);
            scroll(0, 0) 
        }else{
            aux=ordenarDesc(users,"name")
            usersnames.innerHTML=cargarDatosViejo(aux,dicc);
            scroll(0, 0) 
        }
        contadorName+=2
        
    });
    return contadorName
}

async function main(){
    const dicc={
        "inactive":"inactivo",
        "active":"activo",
        "male":"hombre",
        "female":"femenino",
        "completed":"completado",
        "pending":"pendiente"
    }
    const info = {
        name: "Guillermo R"
    }

    let users=await fetchDataAsync('https://gorest.co.in/public/v2/users');

    const todosOriginal=await fetchDataAsync('https://gorest.co.in/public/v2/todos');

    const todos = JSON.parse(JSON.stringify(todosOriginal).split('"status":').join('"status2":'));


    let nuevosDatos =join(users,todos)

    titulos=document.getElementById('titulosTH');
    usersnames=document.getElementById('names');

    viejosTitulos=`
    <th scope="col">Id</th>
    <th scope="col"><button class="btn btn-outline-dark" id="BotonName">Name</button></th>
    <th scope="col">Email</th>
    <th scope="col">Gender</th>
    <th scope="col">Status</th>
    `

    
    nuevosTitulos=`
    <th scope="col">Id</th>
    <th scope="col"><button class="btn btn-outline-dark" id="BotonName">Name</button></th>
    <th scope="col">Email</th>
    <th scope="col">Gender</th>
    <th scope="col">Status</th>
    <th scope="col"><button class="btn btn-outline-dark" id="BotonTitle">Title</button></th>
    <th scope="col">Due_on</th>
    <th scope="col">Status2</th>
    `
    
    usersnames.innerHTML=cargarDatosViejo(users,dicc);

    titulosUsersInfoNuevo=cargarDatosNuevo(nuevosDatos,dicc);
    
    usuario=document.getElementById('usuario');

    usuario.innerHTML=info.name;

    const inputShow=document.getElementById("inputShow");
    const buttonShow=document.getElementById("buttonShow");
    inputShow.style.display = "none"
    buttonShow.style.display = "none"

    
    contadorName=1
    contadorName=agregarBotonName(contadorName,users,dicc);


    const boton=document.getElementById("botonInfo");
    boton.addEventListener("click", ()=>{
        let list =[inputShow,buttonShow]
        list.forEach(element => {
            if (element.style.display === "none") {
                element.style.display = "block";
            } else {
                element.style.display = "none";
            }
        });

        if(buttonShow.style.display == "none"){
            document.getElementById("mensaje").innerHTML="Info"
            boton.innerHTML="+"
            titulos.innerHTML=viejosTitulos
            usersnames.innerHTML=cargarDatosViejo(users,dicc);
            contadorName=1
            contadorName=agregarBotonName(contadorName,users,dicc);
            scroll(0, 0)
        }else{
            if (!titulosUsersInfoNuevo) {
                document.getElementById("mensaje").innerHTML="No hay coincidencias"
            }
            boton.innerHTML="-"
            titulos.innerHTML=nuevosTitulos 
            usersnames.innerHTML=cargarDatosNuevo(nuevosDatos,dicc);
            const BotonTitle=document.getElementById("BotonTitle");

            contadorName=1
            contadorName=agregarBotonName(contadorName);

            contadorTitle=1
            BotonTitle.addEventListener("click", ()=>{
                alert("wenas")
                if (contadorTitle%2===0) {

                    aux=ordenarAsc(nuevosDatos,"title")
                    usersnames.innerHTML=cargarDatosNuevo(aux,dicc);
                    scroll(0, 0) 
                }else{
                    aux=ordenarDesc(nuevosDatos,"title")
                    usersnames.innerHTML=cargarDatosNuevo(aux,dicc);
                    scroll(0, 0) 
                }
                contadorTitle+=2

            });
            scroll(0, 0)
        }

    });
}