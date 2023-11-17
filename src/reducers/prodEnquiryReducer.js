import {
  NOTIFICATION_CLEAR_FAIL,
  NOTIFICATION_CLEAR_REQUEST,
  NOTIFICATION_CLEAR_RESET,
  NOTIFICATION_CLEAR_SUCCESS,
  NOTIFICATION_DELETE_FAIL,
  NOTIFICATION_DELETE_REQUEST,
  NOTIFICATION_DELETE_RESET,
  NOTIFICATION_DELETE_SUCCESS,
  PPRODUCT_ENQUIRY_LIST_FAIL,
  PPRODUCT_ENQUIRY_LIST_REQUEST,
  PPRODUCT_ENQUIRY_LIST_SUCCESS,
  PRODUCT_ENQUIRY_DELETE_FAIL,
  PRODUCT_ENQUIRY_DELETE_REQUEST,
  PRODUCT_ENQUIRY_DELETE_RESET,
  PRODUCT_ENQUIRY_DELETE_SUCCESS,
  PRODUCT_NOTIFICATION_LIST_FAIL,
  PRODUCT_NOTIFICATION_LIST_REQUEST,
  PRODUCT_NOTIFICATION_LIST_SUCCESS,
} from "../constants/prodEnquiryConstant";

export const productEnquiryListReducer = (
  state = { loading: true, prodEnqList: [] },
  action,
) => {
  switch (action.type) {
    case PPRODUCT_ENQUIRY_LIST_REQUEST:
      return { loading: true };
    case PPRODUCT_ENQUIRY_LIST_SUCCESS:
      return {
        loading: false,
        prodEnqList: action.payload,
      };
    case PPRODUCT_ENQUIRY_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const enquiryDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_ENQUIRY_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_ENQUIRY_DELETE_SUCCESS:
      return { loading: false, success: true };
    case PRODUCT_ENQUIRY_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case PRODUCT_ENQUIRY_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const productNotificationListReducer = (
  state = { loading: true, notificationlist: [] },
  action,
) => {
  switch (action.type) {
    case PRODUCT_NOTIFICATION_LIST_REQUEST:
      return { loading: true };
    case PRODUCT_NOTIFICATION_LIST_SUCCESS:
      return {
        loading: false,
        notificationlist: action.payload,
      };
    case PRODUCT_NOTIFICATION_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const notificationDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTIFICATION_DELETE_REQUEST:
      return { loading: true };
    case NOTIFICATION_DELETE_SUCCESS:
      return { loading: false, success: true };
    case NOTIFICATION_DELETE_FAIL:
      return { loading: false, error: action.payload };
    case NOTIFICATION_DELETE_RESET:
      return {};
    default:
      return state;
  }
};

export const notificationClearallReducer = (state = {}, action) => {
  switch (action.type) {
    case NOTIFICATION_CLEAR_REQUEST:
      return { loading: true };
    case NOTIFICATION_CLEAR_SUCCESS:
      return { loading: false, success: true };
    case NOTIFICATION_CLEAR_FAIL:
      return { loading: false, error: action.payload };
    case NOTIFICATION_CLEAR_RESET:
      return {};
    default:
      return state;
  }
};

