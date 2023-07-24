interface OpenModalAction {
  type: typeof OPEN_MODAL;
  payload: string;
}

interface CloseModalAction {
  type: typeof CLOSE_MODAL;
  payload: string;
}

type ModalActionTypes = OpenModalAction | CloseModalAction;

const initialState = {
  createModal: false,
  avatarModal: false,
};

// Action Types
const OPEN_MODAL = "OPEN_MODAL";
const CLOSE_MODAL = "CLOSE_MODAL";

// Action Creators
export const openModal = (modalName: string) => ({
  type: OPEN_MODAL,
  payload: modalName,
});

export const closeModal = (modalName: string) => ({
  type: CLOSE_MODAL,
  payload: modalName,
});

const modalReducer = (state = initialState, action: ModalActionTypes) => {
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
