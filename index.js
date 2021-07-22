let fruits = [
    {id: 1, title: 'Яблоки', price: 20, img: './img/1345.jpg'},
    {id: 2, title: 'Апельсин', price: 30, img: './img/3cbf3bd41c_1000.jpg'},
    {id: 3, title: 'Манго', price: 40, img: './img/Mango-1.jpg'}
]

const toHtml = fruit => `
    <div class="col-12 col-md-4">
        <div class="card">
        <img src=${fruit.img} class="card-img-top" style="height: 300px"  alt=${fruit.title}>
            <div class="card-body">
             <h5 class="card-title">${fruit.title}</h5>
             <a href="" class="btn btn-primary" data-btn="price" data-id=${fruit.id}>посмотреть цену</a>
            <a href="" class="btn btn-danger" data-btn="remove" data-id=${fruit.id}>удалить</a>
         </div>
    </div>
</div>
    
`




function render() {
    const html = fruits.map(toHtml).join('')
    document.querySelector('#fruits').innerHTML = html

}

render()




const priceModal = $.modal({
    title: 'Цена на товар',
    closable: false,
    width: '600px',
    footerButtons: [
        {text: 'Закрыть', type: 'btn-danger', handler() {
            priceModal.close()
                console.log('primary btn clicked')
            }},

    ]
})


document.addEventListener('click', (event) => {
    const btnType = event.target.dataset.btn
    const id = +event.target.dataset.id
    const fruit = fruits.find(f => f.id === id)
    event.preventDefault()
    if (btnType === 'price') {
        priceModal.setContent(`
            <p> цена на ${fruit.title} <strong>${fruit.price}$</strong></p>
        `)
        priceModal.open()
        console.log(fruit, id)
    }else if (btnType === 'remove') {
        console.log('clicked')
        $.confirm({
            title: 'Вы уверены?',
            content: `<p>Вы удаляете фрукт: <strong>${fruit.title}</strong></p>`
        }).then(() => {
            fruits = fruits.filter(f => f.id !== id)
            render()
        }).catch( () => {
            console.log('Cancel')
        })
    }
})