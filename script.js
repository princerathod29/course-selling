// const loginForm = document.getElementById("loginForm")
// const signupForm = document.getElementById("signupForm")
// const dashboard = document.getElementById("dashboard")

// function showSignup(){
// loginForm.classList.add("hidden")
// signupForm.classList.remove("hidden")
// }

// function showLogin(){
// signupForm.classList.add("hidden")
// loginForm.classList.remove("hidden")
// }

// signupForm.addEventListener("submit", async (e)=>{

// e.preventDefault()

// const userName = document.getElementById("signupName").value
// const email = document.getElementById("signupEmail").value
// const password = document.getElementById("signupPassword").value

// try{

// const res = await fetch("http://localhost:3000/api/v1/users/signup",{
// method:"POST",
// headers:{
// "Content-Type":"application/json"
// },
// body: JSON.stringify({ userName, email, password })
// })

// const data = await res.json()

// if(res.ok){

// alert(`${userName} signup successful 🎉`)

// showLogin()

// }else{

// alert(data.message)

// }

// }catch(error){

// alert("Server error")

// }

// })


// loginForm.addEventListener("submit", async (e)=>{

// e.preventDefault()

// const email = document.getElementById("loginEmail").value
// const password = document.getElementById("loginPassword").value

// try{

// const res = await fetch("http://localhost:3000/api/v1/users/login",{
// method:"POST",
// headers:{
// "Content-Type":"application/json"
// },
// body:JSON.stringify({email,password})
// })

// const data = await res.json()

// if(res.ok){

// localStorage.setItem("token",data.token)

// loginForm.classList.add("hidden")
// dashboard.classList.remove("hidden")

// }else{

// alert(data.message)

// }

// }catch(error){

// alert("Login failed")

// }

// })


// async function logout(){

// await fetch("http://localhost:3000/api/v1/users/logout",{
// method:"POST"
// })

// localStorage.removeItem("token")

// dashboard.classList.add("hidden")
// loginForm.classList.remove("hidden")

// }