class IndexController {
    constructor(model, view, itemsNumberPerSheet = 12) {
        this.model = model;
        this.view = view;
        this.products = this.model.data;
        this.pagination = {
            itemsNumberPerSheet: itemsNumberPerSheet,
            activePage: 1,
            startpag: 1
        }
        this.getPagination();
        this.view.displayFilter(this.products);
        this.view.display(this.getProductsByPage());

        this.view.addSearchEventListener(this.searchProducts);
        this.view.addMyFavouritesEventListener(this.filterfavourites);
        this.view.addRangeButtonEventListener(this.filterProducts);
        this.view.addWindowEventListener(this.getProductsByPage(), this.getPagination);
    }

    getProductsByPage = () => this.products.slice(0 + (this.pagination.itemsNumberPerSheet * (this.pagination.activePage - 1)),
        this.pagination.itemsNumberPerSheet + (this.pagination.itemsNumberPerSheet * (this.pagination.activePage - 1)));

    getNumberOfSheets = () => Math.ceil(this.products.length / this.pagination.itemsNumberPerSheet);

    getPagination = () => {
        const nSheets = this.getNumberOfSheets();

        if (nSheets > 5) {
            this.view.genPaginationLeftArrowHTML(() => {
                if (this.pagination.startpag <= 5 && this.pagination.startpag > 1) {
                    this.pagination.startpag -= 1;
                    this.pagination.activePage -= 1;
                }
                this.refresh();
            });
        }

        for (let index = this.pagination.startpag;
            index < ((nSheets < 5) ? this.pagination.startpag + nSheets : this.pagination.startpag + 5);
            index++) {
            this.view.genPaginationNumberHTML(this.pagination.activePage, index, activePage => {
                this.pagination.activePage = activePage;
                this.refresh();
            })
        }

        if (nSheets > 5) {
            this.view.genPaginationRightArrowHTML(() => {
                if (this.pagination.startpag + 5 <= nSheets) {
                    this.pagination.startpag += 1;
                    this.pagination.activePage += 1;
                }
                this.refresh();
            });
        }
    }

    switchToFavoriteHeart = (item) => {
        item.favourite = !item.favourite;
    }

    filter = (text, exp, alert, filterFunction) => {
        this.view.clearTheShowcase();
        if (exp) {
            const products = filterFunction(text);
            if (products.length > 0) {
                this.products = products;
                this.getPagination();
                this.view.display(this.getProductsByPage());
                return
            }
        }
        this.view.genAlertHTML(alert, this.reset);
    }

    searchProducts = (text) => {
        this.filter(
            text,
            text,
            `${text}: No obtuvo resultados.`,
            text => {
                const reg = new RegExp(text.toLowerCase().trim());
                return this.model.data.filter((item) => reg.test(item.title.toLowerCase().trim()) || reg.test(item.description.toLowerCase().trim()));
            }
        );
    }

    filterProducts = () => {
        this.filter(
            '',
            this.view.range.fromHTML.value && this.view.range.toHTML.value,
            `El rango de precios [DESDE: ${this.view.range.fromHTML.value}€ EN: ${this.view.range.toHTML.value}€] no obtuvo resultados.`,
            () => this.model.data.filter(item => item.price >= parseFloat(this.view.range.fromHTML.value) && item.price <= (this.view.range.toHTML.value))
        );
    }

    filterfavourites = () => {
        this.filter(
            '',
            true,
            `No obtuvo resultados.`,
            () => this.model.data.filter(item => item.favourite)
        );
    }

    refresh = () => {
        this.view.clearTheShowcase();
        this.getPagination();
        this.view.display(this.getProductsByPage());
    }

    reset = () => {
        this.pagination.activePage = 1;
        this.pagination.startpag = 1;
        this.refresh();
    }
}

export default IndexController;