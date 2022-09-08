class Model {
    constructor(data, itemsNumberPerSheet) {
        this.data = JSON.parse(localStorage.getItem('data')) || data;
    }

    commit = (data) => {
        localStorage.setItem('data', JSON.stringify(data))
    }

    selectItemById = (id) => {
        return this.data.filter((item) => {
            return item.id === id;
        })[0];
    }
}

export default Model;