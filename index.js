const fruits = [
    {id: 1, title: 'Яблоки', price: 20, img: './img/1345.jpg'},
    {id: 2, title: 'Апельсин', price: 30, img: './img/3cbf3bd41c_1000.jpg'},
    {id: 3, title: 'Манго', price: 40, img: './img/Mango-1.jpg'}
]

const toHtml = fruit => `
    <div class="col-md-4">
        <div class="card">
        <img src=${fruit.img} class="card-img-top" style="height: 300px"  alt=${fruit.title}>
            <div class="card-body">
             <h5 class="card-title">${fruit.title}</h5>
             <a href="" class="btn btn-primary">посмотреть цену</a>
            <a href="" class="btn btn-danger">удалить</a>
         </div>
    </div>
</div>
    
`




function render() {
    const html = fruits.map(toHtml).join('')
    document.querySelector('#fruits').innerHTML = html

}

render()




const modal = $.modal({
    title: 'My modal',
    closable: false,
    content: `
        <h4>Modal is working</h4>
        <p>modal is true</p>
    `,
    width: '600px',
    footerButtons: [
        {text: 'Ok', type: 'btn-primary', handler() {
            modal.close()
                console.log('primary btn clicked')
            }},
        {text: 'Cancel', type: 'btn-danger', handler() {
                modal.close()
                console.log('Danger btn clicked')
            }}
    ]
})