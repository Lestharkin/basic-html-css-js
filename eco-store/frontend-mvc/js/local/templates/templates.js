const heart = [
    `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart-fill" viewbox="0 0 16 16">
        <path fill-rule="evenodd" d="M8 1.314C12.438-3.248 23.534 4.735 8 15-7.534 4.736 3.562-3.248 8 1.314z"/>
    </svg>
    `,
    `
    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-heart" viewbox="0 0 16 16">
        <path d="m8 2.748-.717-.737C5.6.281 2.514.878 1.4 3.053c-.523 1.023-.641 2.5.314 4.385.92 1.815 2.834 3.989 6.286 6.357 3.452-2.368 5.365-4.542 6.286-6.357.955-1.886.838-3.362.314-4.385C13.486.878 10.4.28 8.717 2.01L8 2.748zM8 15C-7.333 4.868 3.279-3.04 7.824 1.143c.06.055.119.112.176.171a3.12 3.12 0 0 1 .176-.17C12.72-3.042 23.333 4.867 8 15z" />
    </svg>
    `        
];
const cardHTML = item => {
    return `
        <div class="card border border-0 text-center app-showcase-card" id="app-showcase-card-${item.id}">
            <span class="position-absolute badge rounded-pill bg-danger app-showcase-card-badge ${(item.discount) ? '' : 'app-hidden'}" id="app-showcase-card-${item.id}-badge" role="discount">
            ${(item.discountPer)}%<br>${(item.discountUni)}.
            </span>            
            <span class="position-absolute app-showcase-card-heart app-hidden" id="app-showcase-card-${item.id}-heart" role="favourite">
                <a href="#" class="text-decoration-none app-showcase-card-heart-a " id="app-showcase-card-${item.id}-heart-a">
                    ${((item.favourite) ? heart[0]: heart[1])}
                </a>
            </span>
            <a href="#app-showcase-card-${item.id}-img" class="text-decoration-none app-showcase-card-a-box">
                <img src="img/products/${item.id}.jpg" class="card-img-top w-50" alt="img/products/${item.id}.jpg" id="app-showcase-card-${item.id}-img">
            </a>
            <div class="card-body">
                <h6 class="card-title"><strong>${item.title}</strong></h6>
                <p class="card-text"><span class="app-showcase-card-amount">${item.amount}</span></p>
                <div></div>
                <p class="card-text"><span class="app-showcase-card-price">${String(item.price).replace('.', ',')} €</span></p>                
                <a href="#" class="btn btn-primary app-radius app-showcase-card-a app-hidden">
                    <table>
                        <tr>
                            <td><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16"
                                    fill="currentColor" class="bi bi-basket3-fill"
                                    viewbox="0 0 16 16">
                                    <path
                                        d="M5.757 1.071a.5.5 0 0 1 .172.686L3.383 6h9.234L10.07 1.757a.5.5 0 1 1 .858-.514L13.783 6H15.5a.5.5 0 0 1 .5.5v1a.5.5 0 0 1-.5.5H.5a.5.5 0 0 1-.5-.5v-1A.5.5 0 0 1 .5 6h1.717L5.07 1.243a.5.5 0 0 1 .686-.172zM2.468 15.426.943 9h14.114l-1.525 6.426a.75.75 0 0 1-.729.574H3.197a.75.75 0 0 1-.73-.574z" />
                                </svg></td>
                            <td class="ps-2 pt-1">Añadir a la cesta</td>
                        </tr>
                    </table>
                </a>
            </div>            
        </div>     
    `;
}

export {heart, cardHTML};