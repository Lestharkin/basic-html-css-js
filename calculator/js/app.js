const display = {
    memory: '',
    nchars: 0,
    limit: 15,
    go: function () {return this.nchars < this.limit;}
}

function addToDisplay (key) {
    if (display.go()) {
        const dis = document.getElementById('display');
        display.memory = (dis.innerHTML === '0') ? key : dis.innerHTML + key ;
        dis.innerHTML = display.memory;
        display.nchars++;
        console.log(display.memory);
    }    
}
