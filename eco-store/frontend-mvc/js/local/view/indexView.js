import { heart, cardHTML } from "../../../js/local/templates/templates.js";

class View {
    constructor() {
        this.showcaseHTML = this.getElement('#showcase');
        this.paginationHTML = this.getElement('#app-pagination-id .pagination');
        this.range = {
            HTML: this.getElement('#app-filter-range'),
            fromHTML: this.getElement('#from'),
            toHTML: this.getElement('#to'),
            buttonHTML: this.getElement('#app-filter-range-bnt'),
        }
        this.myFavourites = this.getElementAll('.app-header-table-myfavourites')
    }

    createElement = (tag, classNames) => {
        const element = document.createElement(tag);
        if (classNames) element.classList.add(...classNames);
        return element;
    }

    getElement = selector => document.querySelector(selector);
    
    getElementAll = selector => document.querySelectorAll(selector);

    genShowcaseHTML = productsByPage => {
        const showcaseHTML = this.createElement('div', ['container-fluid']);
        showcaseHTML.setAttribute('id', 'app-showcase');
        let i = 0, j = -1, k = productsByPage.length, cols = [];
        productsByPage.forEach((item) => {
            const col = this.createElement('div', ['col-sm-3']);
            col.innerHTML = cardHTML(item);
            col.children[0].addEventListener('mouseover', (e) => {
                e.stopPropagation();
                col.children[0].children[3].children[4].classList.remove('app-hidden');
                col.children[0].children[1].classList.remove('app-hidden');
            });
            col.children[0].addEventListener('mouseleave', (e) => {
                e.stopPropagation();
                col.children[0].children[3].children[4].classList.add('app-hidden');
                col.children[0].children[1].classList.add('app-hidden');
            });
            col.children[0].children[1].children[0].addEventListener('click', () => {
                item.favourite = !item.favourite;
                const card = this.getElement(`#app-showcase-card-${item.id}`);
                card.children[1].children[0].innerHTML = ((item.favourite) ? heart[0] : heart[1]);
            });
            cols.push(col);
            i += 1;
            if (cols.length === 4 || i >= k) {
                j += 1;
                const row = this.createElement('div', ['row']);
                showcaseHTML.appendChild(row);
                cols.forEach((column) => {
                    showcaseHTML.children[j].appendChild(column);
                });
                cols = [];
            }
        });
        this.showcaseHTML.appendChild(showcaseHTML);
    }

    genAlertHTML = (text, reset) => {
        let alert = this.createElement('div', ['alert', 'alert-warning', 'alert-dismissible', 'fade', 'show', 'small']);
        alert.setAttribute('role', 'alert');
        let span = this.createElement('span');
        span.innerHTML = text;
        let button = this.createElement('button', ['btn-close'])
        button.setAttribute('type', 'button');
        button.addEventListener('click', () => {
            reset();
        });
        alert.appendChild(span);
        alert.appendChild(button);
        this.showcaseHTML.appendChild(alert);
    }

    genPaginationLeftArrowHTML = gotoActivePage => {
        const li = this.createElement('li', ['page-item', 'app-page-item']);
        li.setAttribute('id', `app-pagination-id-l`);
        const a = this.createElement('a', ['page-link', 'app-page-link', 'text-decoration-none']);
        a.setAttribute('aria-label', `Previous`);
        a.href = '#';
        a.addEventListener('click', () => {
            gotoActivePage();
        });
        const span = document.createElement('span');
        span.setAttribute('aria-hidden', `true`);
        span.innerHTML = '&lsaquo;';
        a.appendChild(span);
        li.appendChild(a);
        this.paginationHTML.appendChild(li);
    }

    genPaginationNumberHTML = (active, index, gotoActivePage) => {
        const li = this.createElement('li', ['page-item', 'app-page-item']);
        li.setAttribute('id', `app-pagination-id-${index}`);
        const a = this.createElement('a', ['text-decoration-none', 'page-link', 'app-page-link']);
        if (active === index) {
            a.classList.add('app-page-link-active');
        } else {
            a.classList.remove('app-page-link-active');
        }
        a.setAttribute('id', `app-pagination-id-a-${index}`);
        a.href = '#';
        a.innerHTML = `${index}`;
        a.addEventListener('click', () => {
            gotoActivePage(index);
        });
        li.appendChild(a);
        this.paginationHTML.appendChild(li);
    }

    genPaginationRightArrowHTML = gotoActivePage => {
        const li = this.createElement('li', ['page-item', 'app-page-item']);
        li.setAttribute('id', `app-pagination-id-r`);
        const a = this.createElement('a', ['page-link', 'app-page-link', 'text-decoration-none']);
        a.setAttribute('aria-label', `Next`);
        a.href = '#';
        a.addEventListener('click', () => {
            gotoActivePage();
        });
        const span = this.createElement('span', ['aria-hidden', 'true']);
        span.innerHTML = '&rsaquo;';
        a.appendChild(span);
        li.appendChild(a);
        this.paginationHTML.appendChild(li);
    }

    genRangeFilterHTML = products => {        
        const maxPrice = Math.max(...products.map(item => item.price));
        this.range.HTML.oninput = () => this.range.fromHTML.value = this.range.HTML.value;
        this.range.fromHTML.value = 0;
        this.range.toHTML.value = Math.ceil(maxPrice);
        this.range.HTML.setAttribute('max', to.value);
    }

    addRangeButtonEventListener = (filterProducts) => {
        this.range.buttonHTML.addEventListener("click", () => {
            filterProducts();
        });
    }

    addSearchEventListener = searchProducts => {
        const input = this.getElement('#search-input');
        const searchBtn = this.getElement('#search-input-button');
        searchBtn.addEventListener('click', () => {
            searchProducts(input.value);
        });
    }

    addWindowEventListener = (productsByPage, getPagination) => {
        window.addEventListener("resize", () => {
            this.clearTheShowcase();
            this.display(productsByPage);
            getPagination();
        });
    }

    addMyFavouritesEventListener = (filterfavourites) => {
        this.myFavourites.forEach( myFavourite => myFavourite.addEventListener("click", () => {
            filterfavourites();
        }));
    }

    standardizeHeightCards = productsByPage => {
        let i = 0, k = productsByPage.length, cols = [];
        productsByPage.forEach((item) => {
            cols.push(this.getElement(`#app-showcase-card-${item.id}`));
            i += 1;
            if (cols.length === 4 || i >= k) {
                let max = 0, cl = 0;
                cols.forEach((column) => {
                    cl = parseInt(column.clientHeight) + parseInt(column.children[3].clientHeight);
                    max = (max < cl) ? cl : max;
                });
                cols.forEach((column) => {
                    cl = parseInt(column.clientHeight) + parseInt(column.children[3].clientHeight);
                    // issue max === cl
                    column.children[3].children[2].style.height = `${(max - cl) / 2}px`;
                });
                cols = [];
            }
        });
    }

    display = products => {
        this.genShowcaseHTML(products);
        this.standardizeHeightCards(products);
    }

    displayFilter = products => {
        this.genRangeFilterHTML(products);
    }

    clearTheShowcase = () => {
        this.showcaseHTML.innerHTML = "";
        this.paginationHTML.innerHTML = "";
    }
}

export default View;