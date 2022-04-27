window.onload = function() {
    main();
};

function main(){
    info = {
        name: "User Name",
        permiso: "administrador",
        visits: 1000,
        users: 200,
        storage: 16,
        documents: [
            {type:"document", name:"Document 1"},
            {type:"document", name:"Document 2"},
            {type:"document", name:"Document 3"},
            {type:"document", name:"Document 4"},
    
        ],
        activities:[
            {type:"activity", name:"Activity 1"},
            {type:"activity", name:"Activity 2"},
            {type:"activity", name:"Activity 3"},
        ]
    
    }

    if(info.permiso!="administrador"){
        let element = document.getElementById("conteiner");
        element.classList.add("noAdmin");
        return;
    }usuario

    usuario=document.getElementById('usuario');
    visits=document.getElementById('visits');
    users=document.getElementById('users');
    storage=document.getElementById('storage');

    usuario.innerHTML=info.name;
    visits.innerHTML=info.visits;
    users.innerHTML=info.users;
    storage.innerHTML=info.storage+" GB";

    documentBox=document.getElementById('documentsElements');
    activityBox=document.getElementById('activitiesElements');

    listdocument='';
    for (let index = 0; index < info.documents.length; index++) {
        listdocument += `<li>${info.documents[index].name}</li>`;
    }

    listactivity='';
    for (let index = 0; index < info.activities.length; index++) {
        listactivity += `<li>${info.activities[index].name}</li>`
    }


    documentBox.innerHTML=listdocument;
    activityBox.innerHTML=listactivity;
}