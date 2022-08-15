import { logout } from './api/users.js'
import {page , render} from './lib.js'
import { getUserData } from './util.js'
import { catalogView } from './views/catalog.js'
import { createView } from './views/create.js'
import { detailsView } from './views/details.js'
import { eiditView } from './views/edit.js'
import { homeView } from './views/home.js'
import { loginView } from './views/login.js'
import { profileView } from './views/profile.js'
import { registerView } from './views/register.js'

const main = document.querySelector('main')

document.getElementById('logoutBtn').addEventListener('click', onLogout)

page(decorateContext) //0
page('/', homeView) // 1, connected with 3 
page('/memes', catalogView) // 2
page('/memes/:id', detailsView) // 6 
page('/edit/:id', eiditView) // 7 
page('/login', loginView) // 3
page('/register', registerView) // 4
page('/create', createView) // 5
page('/profile', profileView) // 8

//start App
updateNav()
page.start()

function decorateContext(ctx, next){
    ctx.render = renderMain;
    ctx.updateNav = updateNav
    next()
}
   

function renderMain(templateResult){
  render(templateResult, main)
}
function updateNav(){
   const userData = getUserData();
   if(userData){
document.querySelector('.user').style.display = 'block'
document.querySelector('.guest').style.display = 'none'
document.querySelector('.user span').textContent = `Welcome, ${userData.email}`

   }else {
    document.querySelector('.user').style.display = 'none'
    document.querySelector('.guest').style.display = 'block'
   }
}
function onLogout(){
  logout();
  updateNav();
  page.redirect('/')
}