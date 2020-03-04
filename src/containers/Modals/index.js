import React from 'react'

import { Modal } from 'antd'

class Modal1 extends React.Component {

  handleOk = () => {
    const { onClose, onOk } = this.props
    onOk()
    onClose()
  };

  render () {
    return (
      <div>
        <Modal
          title='Image Replacement Alert'
          visible={this.props.visible}
          onOk={this.handleOk}
          onCancel={this.props.onClose}
        >
          <p>Are you sure you want to swap images?</p>
        </Modal>
      </div>
    )
  }
}

export default Modal1
