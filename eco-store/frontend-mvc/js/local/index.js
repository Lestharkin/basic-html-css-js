import listProducts from "../../js/local/db/products.js";

import Model from "../../js/local/model/model.js";
import IndexView from "../../js/local/view/indexView.js";
import IndexController from "../../js/local/controller/indexController.js";

const index = new IndexController(new Model(listProducts()), new IndexView());
