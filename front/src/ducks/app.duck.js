import { createAction } from 'redux-actions';

export const OPEN_MODAL = 'OPEN_MODAL';
export const TRIGGER_DRAWER = 'TRIGGER_DRAWER';
export const CLOSE_MODAL = 'CLOSE_MODAL';

export const openModal = createAction(OPEN_MODAL);
export const triggerDrawer = createAction(TRIGGER_DRAWER);
export const closeModal = createAction(CLOSE_MODAL);

const initialState = {
  modalOpen: false,
  drawerOpen: false,
  popupContent: null
};

export default function appReducer(state = initialState, { type, payload }) {
  switch (type) {
    case TRIGGER_DRAWER:
      return { ...state, ...{ drawerOpen: !state.drawerOpen } };
    case OPEN_MODAL:
      return { ...state, ...{ modalOpen: true, popupContent: payload.content } };
    case CLOSE_MODAL:
      return { ...state, ...{ modalOpen: false, popupContent: null } };
    default:
      return state;
  }
}
