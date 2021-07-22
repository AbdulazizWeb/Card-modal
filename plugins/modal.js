Element.prototype.appendAfter = function (element) {
    element.parentNode.insertBefore(this, element.nextSibling)
}

function _createModalFooter(buttons = []) {
    if (buttons.length === 0) {
        return  document.createElement('div')
    }

    const wrap = document.createElement('div')
    wrap.classList.add('modal-footer')

    buttons.forEach(btn => {
       const $btn = document.createElement('button')
        $btn.classList.add('btn')
        $btn.textContent = btn.text
        $btn.classList.add(btn.type || 'secondary')
        $btn.onclick = btn.handler || noop

        wrap.appendChild($btn)
    })

    return wrap
}



function _createModal(options) {
    const DEFAULT_WIDTH =  '600px'
const  modal = document.createElement('div')
    modal.classList.add('vmodal')
    modal.insertAdjacentHTML('afterbegin', `
        <div class="Modal-overlay" data-close="true">
            <div class="modal-window" style="width: ${options.width || DEFAULT_WIDTH}">
                <div class="modal-header">
                    <span class="Modal-title">${options.title || 'окно'  }</span>
                    ${options.closable ? `<span class="Modal-close" data-close="true">&times;</span>` : ''}
                </div>
                <div class="modal-body" data-content>
                    ${options.content || ''}
                </div>
                
            </div>
        </div>
    `)
    const footer = _createModalFooter(options.footerButtons)
    footer.appendAfter(modal.querySelector('[data-content]'))
    document.body.appendChild(modal)
    return modal
}



$.modal = function (options) {
    const ANIMATION_SPEED = 200
    let closing = false
    let destroyed = false
    $modal = _createModal(options)

    const modal = {
        open() {
            if (destroyed) {
                return console.log('Modal is destroyed')
            }
            !closing && $modal.classList.add('open')
        },
        close() {
            closing = true
            $modal.classList.remove('open')
            $modal.classList.add('modal-hide')
            setTimeout( () => {
                $modal.classList.remove('modal-hide')
                closing = false
                if (typeof options.onClose === 'function') {
                    options.onClose()
                }
            }, ANIMATION_SPEED)
        },
    }

    const listener = event => {
        if (event.target.dataset.close) {
            modal.close()
        }
    }
    $modal.addEventListener('click', listener)

    return Object.assign(modal, {
        destroy() {
            $modal.parentNode.removeChild($modal)
            $modal.removeEventListener('click', listener)
            destroyed = true
        },
        setContent(html) {
            $modal.querySelector('[data-content]').innerHTML = html
        }
    })
}