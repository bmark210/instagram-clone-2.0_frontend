import { AnyAction } from "redux";

const initialState = {
  createModal: false,
  avatarModal: false,
};

const OPEN_MODAL = "OPEN_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";

export const openModal = (modalName: string) => ({
  type: OPEN_MODAL,
  payload: modalName,
});

export const closeModal = (modalName: string) => ({
  type: CLOSE_MODAL,
  payload: modalName,
});

const modalReducer = (state = initialState, action: AnyAction) => {
  switch (action.type) {
    case OPEN_MODAL:
      return {
        ...state,
        [action.payload]: true,
      };
    case CLOSE_MODAL:
      return {
        ...state,
        [action.payload]: false,
      };
    default:
      return state;
  }
};

export default modalReducer;
