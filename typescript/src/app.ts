console.log("types");

// Types
let _num: number = 0;
document.write(_num.toString() + " ");
let _boo: boolean = true;
document.write(_boo.toString() + " ");
let _str: string = "text";
document.write(_str + " ");
let _any: any = "any";
document.write(_any.toString() + " ");
_any = false;
document.write(_any.toString() + " ");
const PI: number = 3.1416;

// Conver num to string
_str = 123 + "";
document.write(_str);


// Arrays
let _numArray: number[] = [0, 1, 2];
let _booArray: boolean[] = [true, false];
let _strArray: string[] = ["text0", "text1", "test2"];
let _arrayAny: any[] = [0, true, "text0", [1, 2, 3], { attr: "value" }];

// Tuple
let _tuple: [string, number] = ["text", 1];

//void, undefined, null
let _void: void = undefined;
document.write(typeof (_void));
let _null: null = null;
document.write(typeof (_null));
let _undefined: undefined = undefined;
document.write(typeof (_undefined));

// Functions
function add(n1: number, n2: number): number {
    return n1 + n2;
}

function getName (
    firsName: string,
    // parametros opcionales
    lastName?: string
): string {
    if(lastName == undefined) {
        return firsName;
    }
    return `${firsName} ${lastName}`;
}

let _fun = function add (
    n1: number | string,
    // decide el tipo
    n2: number | string
): number {
    if (typeof (n1) === "string") {
        n1 = parseInt(n1)
    }
    if (typeof (n2) === "string") {
        n2 = parseInt(n2);
    }
    return n1 + n2;
}

function _funcvoid ():void {

}

// interface
interface ITodo {
    title: string;
    text: string
}
function showTodo(todo: ITodo) {
    console.log(`${todo.title} - ${todo.text}`);
}

showTodo({
    title: 'titulo',
    text: "ejemplo texto"
});

let otro: ITodo = {
    title: 'titulo',
    text: "ejemplo texto"
};

// Class
class User {
    private name: string;
    public email: string;
    protected age: number;

    constructor(name: string) {
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

    id: number;

    constructor(id: number, name:string) {
        super(name);
        this.id = id;
    }

    payHijo() {
        super.payInvoice();
    }

}

let juan = new User("juan");






