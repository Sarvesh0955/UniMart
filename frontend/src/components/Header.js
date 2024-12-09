import { getUserInfo } from '../localStorage';
import { parseRequestUrl } from '../utils';

const Header = {
  render: () => {
    const { name, isAdmin } = getUserInfo();
    const { value } = parseRequestUrl();
    return ` 
  <div class="brand">
    <button id="aside-open-button" style="margin-left:20px;">
      &#9776;
    </button>
    <a href="/#/"><img src="/images/logo.png" alt="logo" width="160px"></a>
  </div>

  <div id="collection" style="margin-left:0px">
  <div id="Clothing"><a href="/#/?q=Clothing">Clothing</a></div>
  <div id="Stationary"><a href="/#/?q=Stationary">Stationary</a></div>
  <div id="Groceries"><a href="/#/?q=Groceries">Groceries</a></div>
  <div id="Appliances"><a href="/#/?q=Appliances">Appliances</a></div>
  </div>
  <div class="search" style="width:300px">
  <form class="search-form"  id="search-form">
    <input type="text" name="q" id="q" value="${value || ''}" /> 
    <button type="submit"><i class="fa fa-search"></i></button>
  </form>        
  </div>
  <div style="font-size: 24px; margin-right:20px;">
  ${
    name
      ? `<a href="/#/profile">Hi ${name}!</a>`
      : `<a href="/#/signin"><i class="fa fa-user" aria-hidden="true"></i></a>`
  }    
  ${isAdmin ? `<a href="/#/productlist">Dashboard</a>` : ''}
  ${!isAdmin ? `<a href="/#/cart"><i class="fa fa-shopping-cart" aria-hidden="true"></i></a>` : ''}
    
    
  </div>`;
  },
  after_render: () => {
    document
      .getElementById('search-form')
      .addEventListener('submit', async (e) => {
        e.preventDefault();
        const searchKeyword = document.getElementById('q').value;
        document.location.hash = `/?q=${searchKeyword}`;
      });

    document
      .getElementById('aside-open-button')
      .addEventListener('click', async () => {
        document.getElementById('aside-container').classList.add('open');
      });
  },
};
export default Header;
