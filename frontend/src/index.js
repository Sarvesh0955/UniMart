import HomeScreen from './srceens/HomeScreen';
import ProductScreen from './srceens/ProductScreen';
import { parseRequestUrl, showLoading, hideLoading } from './utils';
import Error404Screen from './srceens/Error404Screen';
import CartScreen from './srceens/CartScreen';
import SigninScreen from './srceens/SigninScreen';
import Header from './components/Header';
import RegisterScreen from './srceens/RegisterScreen';
import ProfileScreen from './srceens/ProfileScreen';
import ProductListScreen from './srceens/ProductListScreen';
import ProductEditScreen from './srceens/ProductEditScreen';
import Aside from './components/Aside';

const routes = {
    '/': HomeScreen,
    '/product/:id/edit': ProductEditScreen,
    '/product/:id': ProductScreen,
    '/cart/:id': CartScreen,
    '/cart': CartScreen,
    '/signin': SigninScreen,
    '/register': RegisterScreen,
    '/profile': ProfileScreen,
    '/productlist': ProductListScreen,
};

const router = async () => {
	showLoading();
	const request = parseRequestUrl();
	const parseUrl =
		(request.resource ? `/${request.resource}` : '/') +
		(request.id ? '/:id' : '') +
		(request.verb ? `/${request.verb}` : '');
	console.log(request);
	const screen = routes[parseUrl] ? routes[parseUrl] : Error404Screen;
	const header = document.getElementById('header-container');
	header.innerHTML = await Header.render();
	await Header.after_render();

	const aside = document.getElementById('aside-container');
	aside.innerHTML = await Aside.render();
	await Aside.after_render();

	const main = document.getElementById('main-container');
	main.innerHTML = await screen.render();
	if (screen.after_render) await screen.after_render();
	hideLoading();
};

window.addEventListener('load', router);
window.addEventListener('hashchange', router);
