import Axios from "axios";
import {
  PPRODUCT_ENQUIRY_LIST_FAIL, PPRODUCT_ENQUIRY_LIST_REQUEST, PPRODUCT_ENQUIRY_LIST_SUCCESS, NOTIFICATION_DELETE_FAIL,
  NOTIFICATION_DELETE_REQUEST,
  NOTIFICATION_DELETE_SUCCESS,
  NOTIFICATION_CLEAR_FAIL,
  NOTIFICATION_CLEAR_REQUEST,
  NOTIFICATION_CLEAR_SUCCESS,
  PRODUCT_NOTIFICATION_LIST_REQUEST,
  PRODUCT_NOTIFICATION_LIST_SUCCESS,
  PRODUCT_NOTIFICATION_LIST_FAIL,
  PRODUCT_ENQUIRY_DELETE_FAIL,
  PRODUCT_ENQUIRY_DELETE_REQUEST,
  PRODUCT_ENQUIRY_DELETE_SUCCESS,
} from "../constants/prodEnquiryConstant";

export const prodEnquiryList = () => async (dispatch) => {
  dispatch({
    type: PPRODUCT_ENQUIRY_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/prodenquiry/enquiryList`);
    dispatch({ type: PPRODUCT_ENQUIRY_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PPRODUCT_ENQUIRY_LIST_FAIL, payload: error.message });
  }
};

export const deletenotification = (delId) => async (dispatch) => {
  dispatch({ type: NOTIFICATION_DELETE_REQUEST, payload: delId });

  try {
    await Axios.delete(`/api/prodenquiry/notification/${delId}`);

    dispatch({ type: NOTIFICATION_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: NOTIFICATION_DELETE_FAIL, payload: message });
  }
};

export const clearnotification = (clearid) => async (dispatch) => {
  dispatch({ type: NOTIFICATION_CLEAR_REQUEST, payload: clearid });
  try {
    await Axios.delete(`/api/prodenquiry/clear/`, {
      data: clearid,
    });

    dispatch({ type: NOTIFICATION_CLEAR_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: NOTIFICATION_CLEAR_FAIL, payload: message });
  }
};

export const notificationtest = () => async (dispatch) => {
  dispatch({
    type: PRODUCT_NOTIFICATION_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/prodenquiry/notification`);
    dispatch({ type: PRODUCT_NOTIFICATION_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: PRODUCT_NOTIFICATION_LIST_FAIL, payload: error.message });
  }
};

export const enquiryresponce = (response) => async (dispatch) => {
  dispatch({ type: PPRODUCT_ENQUIRY_LIST_REQUEST, payload: response });
  try {
    const { data } = await Axios.post(
      `/api/prodenquiry/enquiryresponce`,
      response,
    );
    dispatch({ type: PPRODUCT_ENQUIRY_LIST_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PPRODUCT_ENQUIRY_LIST_FAIL, payload: message });
  }
};

export const deleteenquiry = (delId) => async (dispatch) => {
  dispatch({ type: PRODUCT_ENQUIRY_DELETE_REQUEST, payload: delId });
  try {
    const { data } = await Axios.delete(
      `/api/prodenquiry/enquiryList/${delId}`,
    );
    dispatch({ type: PRODUCT_ENQUIRY_DELETE_SUCCESS, payload: data });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: PRODUCT_ENQUIRY_DELETE_FAIL, payload: message });
  }
};


