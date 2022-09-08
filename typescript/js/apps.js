console.log("types");
// Types
let _num = 0;
document.write(_num.toString() + "z ");
let _boo = true;
document.write(_boo.toString() + " ");
let _str = "text";
document.write(_str + " ");
let _any = "any";
document.write(_any.toString() + " ");
_any = false;
document.write(_any.toString() + " ");
const PI = 3.1416;
// Conver num to string
_str = 123 + "";
document.write(_str);
// Arrays
let _numArray = [0, 1, 2];
let _booArray = [true, false];
let _strArray = ["text0", "text1", "test2"];
let _arrayAny = [0, true, "text0", [1, 2, 3], { attr: "value" }];
// Tuple
let _tuple = ["text", 1];
//void, undefined, null
let _void = undefined;
document.write(typeof (_void));
let _null = null;
document.write(typeof (_null));
let _undefined = undefined;
document.write(typeof (_undefined));
// Functions
function add(n1, n2) {
    return n1 + n2;
}
function getName(firsName, 
// parametros opcionales
lastName) {
    if (lastName == undefined) {
        return firsName;
    }
    return `${firsName} ${lastName}`;
}
let _fun = function add(n1, 
// decide el tipo
n2) {
    if (typeof (n1) === "string") {
        n1 = parseInt(n1);
    }
    if (typeof (n2) === "string") {
        n2 = parseInt(n2);
    }
    return n1 + n2;
};
function _funcvoid() {
}
function showTodo(todo) {
    console.log(`${todo.title} - ${todo.text}`);
}
showTodo({
    title: 'titulo',
    text: "ejemplo texto"
});
let otro = {
    title: 'titulo',
    text: "ejemplo texto"
};
// Class
class User {
    constructor(name) {
        this.name;
    }
    regiter() {
        console.log(`${this.name} ${this.email}`);
    }
    payInvoice() {
        console.log(`${this.name} paide invoice`);
    }
}
class hijo extends User {
    constructor(id, name) {
        super(name);
        this.id = id;
    }
    payHijo() {
        super.payInvoice();
    }
}
let juan = new User("juan");
