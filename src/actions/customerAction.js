import Axios from "axios";
import {
  CUSTOMER_ADDRESS_DELETE_FAIL,
  CUSTOMER_ADDRESS_DELETE_REQUEST,
  CUSTOMER_ADDRESS_DELETE_SUCCESS,
  CUSTOMER_ADDRESS_FAIL,
  CUSTOMER_ADDRESS_LIST_FAIL,
  CUSTOMER_ADDRESS_LIST_REQUEST,
  CUSTOMER_ADDRESS_LIST_SUCCESS,
  CUSTOMER_ADDRESS_REQUEST,
  CUSTOMER_ADDRESS_SUCCESS,
  CUSTOMER_ADDRESS_UPDATE_FAIL,
  CUSTOMER_ADDRESS_UPDATE_REQUEST,
  CUSTOMER_ADDRESS_UPDATE_SUCCESS,
  CUSTOMER_PRODUCT_ACTIVE_UPDATE_REQUEST,
  CUSTOMER_PRODUCT_ACTIVE_UPDATE_SUCCESS,
  CUSTOMER_PRODUCT_ACTIVE_UPDATE_FAIL,
  CUSTOMER_ADDRESS_BULK_DELETE_REQUEST,
  CUSTOMER_ADDRESS_BULK_DELETE_SUCCESS,
  CUSTOMER_ADDRESS_BULK_DELETE_FAIL,
  CUSTOMER_ADDRESS_ENABLE_UPDATE_REQUEST,
  CUSTOMER_ADDRESS_ENABLE_UPDATE_SUCCESS,
  CUSTOMER_ADDRESS_ENABLE_UPDATE_FAIL,
} from "../constants/customerConstant";

export const saveCustomerAddress =
  (custAddress) => async (dispatch, getState) => {
    dispatch({ type: CUSTOMER_ADDRESS_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.post("/api/customerAddress", custAddress, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({
        type: CUSTOMER_ADDRESS_SUCCESS,
        payload: data.appsetting,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: CUSTOMER_ADDRESS_FAIL, payload: message });
    }
  };

export const customerAddressList = () => async (dispatch) => {
  dispatch({
    type: CUSTOMER_ADDRESS_LIST_REQUEST,
  });
  try {
    const { data } = await Axios.get(`/api/customerAddress/customerAddList`);
    dispatch({ type: CUSTOMER_ADDRESS_LIST_SUCCESS, payload: data });
  } catch (error) {
    dispatch({ type: CUSTOMER_ADDRESS_LIST_FAIL, payload: error.message });
  }
};

export const deletecustomerAddress =
  (cusAddId) => async (dispatch, getState) => {
    dispatch({ type: CUSTOMER_ADDRESS_DELETE_REQUEST, payload: cusAddId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      await Axios.delete(`/api/customerAddress/${cusAddId}`, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });

      dispatch({ type: CUSTOMER_ADDRESS_DELETE_SUCCESS });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: CUSTOMER_ADDRESS_DELETE_FAIL, payload: message });
    }
  };

export const updatecustomerAddress =
  (customAddressUpdate) => async (dispatch, getState) => {
    dispatch({ type: CUSTOMER_ADDRESS_UPDATE_REQUEST });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.put(
        `/api/customerAddress/${customAddressUpdate._id}`,
        customAddressUpdate,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: CUSTOMER_ADDRESS_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: CUSTOMER_ADDRESS_UPDATE_FAIL, error: message });
    }
  };

export const updatecustomeraddressactive =
  (attId) => async (dispatch, getState) => {
    dispatch({ type: CUSTOMER_PRODUCT_ACTIVE_UPDATE_REQUEST, payload: attId });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.put(
        `/api/customerAddress/addresscust/${attId.checkboxId}`,
        attId,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({ type: CUSTOMER_PRODUCT_ACTIVE_UPDATE_SUCCESS, payload: data });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: CUSTOMER_PRODUCT_ACTIVE_UPDATE_FAIL, error: message });
    }
  };

export const deleteMultipleaddress = (empId) => async (dispatch, getState) => {
  dispatch({ type: CUSTOMER_ADDRESS_BULK_DELETE_REQUEST, payload: empId });
  const {
    userSignin: { userInfo },
  } = getState();
  try {
    await Axios.delete(
      "/api/customerAddress/addresmasterdelete/" + empId,
      { data: empId },
      {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      }
    );
    dispatch({ type: CUSTOMER_ADDRESS_BULK_DELETE_SUCCESS });
  } catch (error) {
    const message =
      error.response && error.response.data.message
        ? error.response.data.message
        : error.message;
    dispatch({ type: CUSTOMER_ADDRESS_BULK_DELETE_FAIL, payload: message });
  }
};

export const updatecustomeraddressEnable =
  (EnableId) => async (dispatch, getState) => {
    console.log("EnableId", EnableId);
    dispatch({
      type: CUSTOMER_ADDRESS_ENABLE_UPDATE_REQUEST,
      payload: EnableId,
    });
    const {
      userSignin: { userInfo },
    } = getState();
    try {
      const { data } = await Axios.put(
        `/api/customerAddress/customeraddressupdateEnables/${EnableId.id}`,
        EnableId,
        {
          headers: { Authorization: `Bearer ${userInfo.token}` },
        }
      );
      dispatch({
        type: CUSTOMER_ADDRESS_ENABLE_UPDATE_SUCCESS,
        payload: data.Attmaster,
      });
    } catch (error) {
      const message =
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message;
      dispatch({ type: CUSTOMER_ADDRESS_ENABLE_UPDATE_FAIL, error: message });
    }
  };
