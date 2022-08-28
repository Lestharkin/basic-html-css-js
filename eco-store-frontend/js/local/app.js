import listProducts from "../../js/local/db/products.js";
import {heart, cardHTML} from "../../js/local/templates/cardHTML.js";

const products = listProducts();

const pagination = {
    activepag: 1,
    startpag: 1,
    getNumberOfSheets: () => Math.ceil(products.length / 12)
}

const getProductsByPage = () => products.slice(0 + (12 * (pagination.activepag - 1)), 12 + (12 * (pagination.activepag - 1)));

const chFavouriteHeart = (id) => {
    const product = products.filter((item) => {
        return item.id === id;
    })[0];
    product.favourite = !product.favourite;
    const card = document.querySelector(`#app-showcase-card-${product.id}`);
    card.children[1].children[0].innerHTML = ((product.favourite) ? heart[0]: heart[1]);
    console.log(card.children[1].children[0].children[0]);
}

const genShowcaseHTML = () => {
    const productsByPage = getProductsByPage();
    const showcaseHTML = document.createElement('div');
    showcaseHTML.classList.add('container-fluid');
    showcaseHTML.setAttribute('id', 'app-showcase');
    let i = 0, j = -1, k = productsByPage.length, cols = [];
    productsByPage.forEach((item) => {
        const col = document.createElement('div');
        col.classList.add('col-sm-3');
        col.innerHTML = cardHTML(item);
        col.children[0].addEventListener('mouseover', (e) => {
            e.stopPropagation();
            col.children[0].children[3].children[4].classList.remove('app-hidden');
            console.log(col.children[0].children[1]);
            col.children[0].children[1].classList.remove('app-hidden');
        });
        col.children[0].addEventListener('mouseleave', (e) => {
            e.stopPropagation();
            col.children[0].children[3].children[4].classList.add('app-hidden');
            col.children[0].children[1].classList.add('app-hidden');
        });        
        col.children[0].children[1].children[0].addEventListener('click', () => {
            chFavouriteHeart(item.id);
        });
        cols.push(col);
        i += 1;
        if (cols.length === 4 || i >= k) {
            j += 1;
            const row = document.createElement('div');
            row.classList.add('row');
            showcaseHTML.appendChild(row);
            cols.forEach((column) => {
                showcaseHTML.children[j].appendChild(column);
            });
            cols = [];
        }
    });
    document.querySelector('#showcase').appendChild(showcaseHTML);
}

const standardizeHeightCards = () => {
    const productsByPage = getProductsByPage();
    let i = 0, k = productsByPage.length, cols = [];
    productsByPage.forEach((item) => {
        cols.push(document.querySelector(`#app-showcase-card-${item.id}`));
        i += 1;
        if (cols.length === 4 || i >= k) {
            let max = 0, cl = 0;
            cols.forEach((column) => {
                cl = parseInt(column.clientHeight) + parseInt(column.children[3].clientHeight);
                max = (max < cl) ? cl : max;
            });
            cols.forEach((column) => {
                cl = parseInt(column.clientHeight) + parseInt(column.children[3].clientHeight);
                column.children[3].children[2].style.height = `${(max - cl) / 2}px`;
            });
            cols = [];
        }
    });
}

const genHTMLPagination = () => {
    const nSheets = pagination.getNumberOfSheets();
    const paginationHTML = document.querySelector('#app-pagination-id .pagination');

    if (nSheets > 5) {
        let li = document.createElement('li');
        li.classList.add('page-item', 'app-page-item');
        li.setAttribute('id', `app-pagination-id-l`);
        let a = document.createElement('a');
        a.classList.add('page-link', 'app-page-link', 'text-decoration-none');
        a.setAttribute('aria-label', `Previous`);
        a.href = '#';
        a.addEventListener('click', () => {
            if (pagination.startpag <= 5 && pagination.startpag > 1) {
                pagination.startpag -= 1;
                pagination.activepag -= 1;
            }
            gointopag(pagination.activepag);
        });
        let span = document.createElement('span');
        span.setAttribute('aria-hidden', `true`);
        span.innerHTML = '&lsaquo;';
        a.appendChild(span);
        li.appendChild(a);
        paginationHTML.appendChild(li);
    }

    for (let i = pagination.startpag; i < ((nSheets < 5) ? pagination.startpag + nSheets : pagination.startpag + 5); i++) {
        let li = document.createElement('li');
        li.classList.add('page-item', 'app-page-item');
        li.setAttribute('id', `app-pagination-id-${i}`);
        let a = document.createElement('a');
        a.classList.add('text-decoration-none', 'page-link', 'app-page-link');
        if (pagination.activepag === i) {
            a.classList.add('app-page-link-active');
        } else {
            a.classList.remove('app-page-link-active');
        }
        a.setAttribute('id', `app-pagination-id-a-${i}`);
        a.href = '#';
        a.innerHTML = `${i}`;
        a.addEventListener('click', () => {
            gointopag(i);
        });
        li.appendChild(a);
        paginationHTML.appendChild(li);
    }

    if (nSheets > 5) {
        let li = document.createElement('li');
        li.classList.add('page-item', 'app-page-item');
        li.setAttribute('id', `app-pagination-id-r`);
        let a = document.createElement('a');
        a.classList.add('page-link', 'app-page-link', 'text-decoration-none');
        a.setAttribute('aria-label', `Next`);
        a.href = '#';
        a.addEventListener('click', () => {
            if (pagination.startpag + 5 <= nSheets) {
                pagination.startpag += 1;
                pagination.activepag += 1;
            }
            gointopag(pagination.activepag);
        });
        let span = document.createElement('span');
        span.setAttribute('aria-hidden', `true`);
        span.innerHTML = '&rsaquo;';
        a.appendChild(span);
        li.appendChild(a);
        paginationHTML.appendChild(li);
    }
}

function gointopag(index) {
    pagination.activepag = index;
    clearHTMLAll();
    init();
}

const clearHTMLAll = () => {
    document.querySelector('#showcase').innerHTML = "";
    document.querySelector('#app-pagination-id .pagination').innerHTML = "";
}

const init = () => {
    genShowcaseHTML();
    genHTMLPagination();
    standardizeHeightCards();
}

init();

window.addEventListener("resize", () => {
    clearHTMLAll();
    init();
});
