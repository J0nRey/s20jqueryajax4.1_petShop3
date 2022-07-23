$(document).ready( function(){
    $(".content-wrapper").load("./views/home.html")
    loadView("/s20jqueryajax4.1_petShop3/views/home.html", "home")
})




$(".navbar-nav a").click( event => {
    event.preventDefault()

  let view = event.target.dataset.viewTarget
  console.log(view)

  let url = `/s20jqueryajax4.1_petShop3/views/${view}.html`
    console.log(url)

    console.log(event.target) // = a
    $(".nav-item").removeClass("active") 
    $(event.target).closest(".nav-item").addClass("active")

  loadView(url, view)

})

// Cambio de vistas
const loadView = (url, view) => {

  $('.content-wrapper').load(url, () => {
    console.log(view)
    switch ( view ){

        case "home" :
        //alert("cargando home")
        getAllPets()
        break

        case "user" :
        //alert("cargando Candidatos")
        getAllUsers()
        break
        
        case "pets" :
        //alert("cargando pets")
        break
        
        case "users" :
        //alert("cargando users")
        break
        
        default:
        //alert("cargando home...")
    }
  })

}


const printPets = petCollection => {

  console.log("imprimiento mascotas")
  console.log(petCollection)
  $(".pets-wrapper").empty()

  Object.keys ( petCollection ).forEach( pet => {
    let { name, description, picture, owner } = petCollection[pet]

    if(!owner){

      let petCard = `
        <div class="col-12 col-md-6">
          <div class="card">
            <img src="${ picture }" alt="">
            <div class="card-body">
              <h2 class="card-title">${ name }</h2>
              <p>${ description }</p>
            </div>
            <button data-pet-key="${pet}" type="button" class="btn btn-primary adopt-pet">Adóptame!</button>
          </div>
        </div>
`

      $(".pets-wrapper").append(petCard)

    }

  })
}

const printUser = userCollection => {

  console.log("imprimiento Usuarios")
  console.log(userCollection)
  $(".user-wrapper").empty()

  Object.keys ( userCollection ).forEach( user => {
    let { name, id, picture } = userCollection[user]

      let userCard = `
        <div class="col-12 col-md-6">
          <div class="card">
            <img src="${ picture }" alt="">
            <div class="card-body">
              <h2 class="card-title">${ name }</h2>
              <p>${ id }</p>
            </div>
            <button data-user-key="${user}" type="button" class="btn btn-primary adopt-pet">Quiero adoptar!</button>
          </div>
        </div>
`

      $(".user-wrapper").append(userCard)

  })
}




// Event-handlers //

$(".content-wrapper").on("click", ".add-user", () => {
  console.log("Agregando Nuevo Usuario")
})


$(".content-wrapper").on("click", ".delete-user", () => {
  console.log("Borrando Nuevo Usuario")
})


const getUserData = () => {
  let userObject = {}
  $(".user-form input").each( function () {
    let property = this.name
    let value = this.value

    userObject = {...userObject, [property]:value}
  } )
  userObject = {...userObject, id: new Date().getTime()}
  console.log(userObject)
  saveUser( userObject )
}


const getPetData = () => {
  let petObject = {}
  $(".pet-form input").each( function () {
    let property = this.name
    let value = this.value

    petObject = {...petObject, [property]:value}
  } )
  petObject = {...petObject, id: new Date().getTime()}
  console.log(petObject)
  savePet( petObject )
}


const saveUser = userData => {
  $.ajax({
    method:"post",
    url:"https://ajaxclass-1ca34-91895-default-rtdb.firebaseio.com/11g/jonathan/owners/.json",
    data:JSON.stringify( userData ),
    success: response => {
      console.log( response )
    },
    error: error => {
      console.log( error )
    }
  })
}


const savePet = petData => {
  $.ajax({
    method:"post",
    url:"https://ajaxclass-1ca34-91895-default-rtdb.firebaseio.com/11g/jonathan/pets/.json",
    data:JSON.stringify( petData ),
    success: response => {
      console.log( response )
    },
    error: error => {
      console.log( error )
    }
  })
}

const getAllPets = () => {
  console.log("getting Pets")
  $.ajax({
    method:"GET",
    url:"https://ajaxclass-1ca34-91895-default-rtdb.firebaseio.com/11g/jonathan/pets/.json",
    success: response => {
      console.log( response )
      printPets( response )
    },
    error: error => {
      console.log( error )
    }
  })
}

const getAllUsers = () => {
  console.log("getting users")
  $.ajax({
    method:"GET",
    url:"https://ajaxclass-1ca34-91895-default-rtdb.firebaseio.com/11g/jonathan/owners/.json",
    success: response => {
      console.log( response )
      printUser( response )
    },
    error: error => {
      console.log( error )
    }
  })
}


const adoptPet = event => {
  let petKey =  event.target.dataset.petKey
    $.ajax({
      method:"PATCH",
      data:JSON.stringify({owner:"1650407176513"}),
      url:`https://ajaxclass-1ca34-91895-default-rtdb.firebaseio.com/11g/jonathan/pets/${petKey}.json`,
      success: response => {
        console.log(response)
        getAllPets()
      }, 
      error: error => {
        console.log(error)
      }
    })
}




$(".content-wrapper").on("click", ".save-user", () => {
  getUserData()
})

$(".content-wrapper").on("click", ".save-pet", () => {
  getPetData()
})

$(".content-wrapper").on("click", ".adopt-pet", () => {
  adoptPet( event )
})

