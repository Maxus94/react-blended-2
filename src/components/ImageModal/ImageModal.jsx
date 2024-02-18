import {Overlay} from "../Overlay/Overlay.styled";
import {Component} from "react";

export class ImageModal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handlePressKey);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handlePressKey);
  }

  handlePressKey = (e) => {
    if(e.code === 'Escape') {
      this.props.onClose();
    }
  }

  handleOverlayClick = (e) => {
    if(e.target === e.currentTarget) {
      this.props.onClose();
    }
  }

  render() {
    return (
      <Overlay onClick={this.handleOverlayClick}>
        <img src={this.props.img} alt={this.props.text} width={'70%'} />
      </Overlay>
    );
  }
}
