import { Modal } from "@mui/base";
import React, { useContext, useState } from "react";
import { setPokeContext } from "../App";

const CardItemModal = (props) => {
    const [isOpenModal, setIsOpenModal] = useState(true)

    const pokemonCtx = useContext(setPokeContext);

    const handleClose = () => {
        return setIsOpenModal(!isOpenModal);
    };

    return (
        <Modal
            open={isOpenModal}
            onClose={handleClose}
        >
            {pokemonCtx.name}
        </Modal>
    )
};

export default CardItemModal;