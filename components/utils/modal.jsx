import React from 'react';

class Modal extends React.Component {
	constructor(props){
		super(props);
		this.state = {
		}
	}
	componentDidMount(){
        document.body.addEventListener('modalClose',this.closeThis.bind(this));
        document.body.addEventListener('modalOpen',this.openModal.bind(this));
        
	}
    openModal(e){
        var elem= e.data.id;
        if(this.refs[elem]){
         this.refs[elem].className="modal-overlay fade-in";
        }
    }
    closeThis(e){
        if(e.target.id == this.props.id){
            this.refs[this.props.id].className="modal-overlay fade-out";
        }
    }
    render(){
        return(<div ref={this.props.id} id={this.props.id} onClick={this.closeThis.bind(this)} className={(this.props.open)?"modal-overlay fade-in":"modal-overlay fade-out"}>
        <div className={"modal-content  "+this.props.css}>
            <div className="modal-header">
                <h3>{this.props.headText}</h3>
            </div>              
            {this.props.content}
        </div>
        </div>)
    }
};
export default Modal;