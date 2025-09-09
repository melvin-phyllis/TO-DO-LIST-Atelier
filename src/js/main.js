
let tache = document.getElementById("tache")
let tache_info = document.getElementById("tache_info")
let liste = document.getElementById("liste")
let descripton = document.getElementById("descripton")
let descripton_info = document.getElementById("descripton_info")
let deadline_info = document.getElementById("deadline_info")
let aa =  document.querySelector("form")
let form = document.getElementById("form")
let btn_supp = document.getElementById("btn_supp")

let n =0



let tableau = []

function stcokage(info){
    info.push({
        id:n,
        tache:tache.value,
        descripton: descripton.value,
        deadline: deadline.value,
        statut: "en cours",
        nombre:1

    })
}

function afficher(array){

    liste.innerHTML ="";
    for(let item of array){
        liste.innerHTML +=`
            <tr class="px-2 py-1" id="${item.id}_tr">
                <td class="px-2">${item.id}</td>
                <td class="px-2">${item.tache}</td>
                <td  class="px-2">${item.descripton}</td>
                <td class="px-2">${item.deadline}</td>
                <td id="status_info" class="px-2">
                    <select name="" id="${item.id}">
                        <option value="${item.statut}">${item.statut}</option>
                       
                     </select>
                </td>
                <td  class="px-2">
                    <button type="button" id="btn_modif" onclick="modifier(${item.id})"class="bg-red-100  border border-black/20">modifier</button>
                    <button type="button" id="btn_supp" onclick="delete_(${item.id})" data-id="${item.id}" class="bg-red-100  border border-black/20">supprimer</button>
                </td>
            </tr>`
    }
    
  total_liste() 

}



btn_add.addEventListener("click", function () {
  if (form.checkValidity()) {
   
     stcokage(tableau)  
    n++;
    afficher(tableau);
    form.reset();        
  } else {
    
    form.reportValidity();
  }
});



function delete_(id){
 
    let  new_tableau = tableau.filter((a)=> a.id !== id)
    
    tableau = new_tableau

    afficher(tableau)
    total_liste()
            
}

function modifier(id){
    let tr_list = document.getElementById(`${id}_tr`)
    for(let item of tableau){
        

        if(item.id == id){
            tr_list.innerHTML =`
            <tr>
                <td class="px-2">${item.id}</td>
                <td class="px-2 ">
                    <input type="text" value="${item.tache}" id="tache_modifer"  ">
                </td>
                <td  class="px-2 ">
                    <input type="text" class="bg-gray-100" value="${item.descripton}" id="descripton_modifer" ">
                </td>
                <td class="px-2 ">
                    <input type="time" class="bg-gray-100" id="deadline_info" value="${item.deadline}" border-solid" ">
                </td>
                <td id="status_modifier" class="px-2">
                    <select name="" class="bg-gray-100" id="${item.id}_statut">
                        <option value="en cours">En cours</option>
                        <option value="en attente">En attente</option>
                        <option value="terminer">Terminer</option>
                     </select>
                </td>
                <td  class="px-2">
                    <button type="button" id="btn_valider" onclick="valider(${item.id})"class="bg-red-100  border border-black/20">Valider</button>
                    <button type="button" id="btn_annuler" onclick="annuler()"class="bg-red-100  border border-black/20">Annuler</button>
                </td>
            </tr>`
             

        }
        
    }
    
}

function valider(id){
        let staut_id = document.getElementById(`${id}_statut`)
        let tache_modifer = document.getElementById("tache_modifer")
        let descripton_modifer = document.getElementById("descripton_modifer")
        let deadline_info = document.getElementById("deadline_info")
        console.log(staut_id.value)
        tableau[id].statut=staut_id.value
        tableau[id].tache=tache_modifer.value
        tableau[id].descripton=descripton_modifer.value
        tableau[id].deadline=deadline_info.value
        
        afficher(tableau)
}


function annuler(){
    afficher(tableau)
}

function total_liste() {
  // Regrouper par statut
  const tableau_total = [];
  for (const item of tableau) {
    const existant = tableau_total.find(x => x.tache === item.statut);
    if (existant) {
      existant.nombre += item.nombre;
    } else {
      tableau_total.push({ tache: item.statut, nombre: item.nombre });
    }
  }

  // Afficher les totaux
  function afficher_total() {
    const tache_terminer   = document.getElementById("terminer");
    const tache_en_cours   = document.getElementById("en_cours");
    const tache_en_attente = document.getElementById("en_attente");

    // Remise à zéro à chaque recalcul
    tache_terminer.textContent   = 0;
    tache_en_cours.textContent   = 0;
    tache_en_attente.textContent = 0;

    for (const item of tableau_total) {
      if (item.tache === "terminer") {
        tache_terminer.textContent = item.nombre;
      } else if (item.tache === "en cours") {
        tache_en_cours.textContent = item.nombre;
      } else if (item.tache === "en attente") {
        tache_en_attente.textContent = item.nombre;
      }
    }
  }

  afficher_total();
}


    

    

    
    

window.modifier = modifier
window.delete_ = delete_;
window.valider = valider;
window.annuler = annuler;
