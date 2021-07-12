import React from 'react'
import './Modal.css'

export default class Modal extends React.Component {
    state = {
        isOpen: false
    }
    render() {
        return (
            <>
                <button onClick={() => this.setState({isOpen: true})}>open modal</button>

                {this.state.isOpen && <div className="modal">
                    <div className="modal-body">
                        <h1>modal title</h1>
                        <p>i am awesome modal</p>
                        <button onClick={() => this.setState({isOpen: false})}>Close</button>
                    </div>
                </div>}
            </>
        )
    }
}