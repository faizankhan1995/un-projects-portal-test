import React, { Fragment, ReactNode, useState } from "react";
import { Modal } from "antd";
import { useHistory } from "react-router-dom";

interface FormModalProps {
  children?: ReactNode;
  formTitle?: string;
}

const ContentModal: React.FC<FormModalProps> = (props: FormModalProps) => {
  let history = useHistory();

  const [modalVisibility, setModalVisibility] = useState<boolean>(true);

  function addCandidateOnCancel() {
    history.goBack();
    setModalVisibility(false);
  }

  return (
    <Fragment>
      <Modal
        visible={modalVisibility}
        className="form-input-modal"
        centered
        title={props.formTitle}
        footer={[]}
        onCancel={addCandidateOnCancel}
      >
        {props.children}
      </Modal>
    </Fragment>
  );
};
export default ContentModal;
