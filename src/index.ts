import { HomePage } from './pages/home/home'

window.addEventListener('DOMContentLoaded', () => {
    const root = document.querySelector('#app')!;

    const homePage = new HomePage();

    root.append(homePage.getContent()!);

    homePage.dispatchComponentDidMount();
});
