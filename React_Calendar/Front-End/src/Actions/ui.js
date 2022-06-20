import { types } from "../Types/types"

export const openModal = () => ({
    type: types.uiOpenModal
});

export const closeModal = () => ({
    type: types.uiCloseModal
});
