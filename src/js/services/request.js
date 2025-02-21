import axios from "axios";
import { API_URL } from "./api.js";

async function getAll(endpoint) {
  const result = {
    data: null,
    loading: true,
    error: null,
  };

  await axios
    .get(API_URL + endpoint)
    .then((response) => {
      console.log("axios response: ", response);
      result.data = response.data;
    })
    .catch((err) => {
      result.error = err;
    })
    .finally(() => {
      result.loading = false;
    });

  return result;
}

async function getByID(endpoint, id) {
  const result = {
    data: null,
    loading: true,
    error: null,
  };

  await axios
    .get(API_URL + endpoint + `/${id}`)
    .then((response) => {
      console.log("axios response: ", response);
      result.data = response.data;
    })
    .catch((err) => {
      result.error = err;
    })
    .finally(() => {
      result.loading = false;
    });

  return result;
}

async function post(endpoint, payload) {
  const result = {
    data: null,
    loading: true,
    error: null,
  };
  await axios
    .post(API_URL + endpoint, payload)
    .then((response) => {
      console.log("axios response: ", response);
      result.data = response.data;
    })
    .catch((err) => {
      result.error = err;
    })
    .finally(() => {
      result.loading = false;
    });

  return result;
}

async function updateOne(endpoint, payload, id) {
  const result = {
    data: null,
    loading: true,
    error: null,
  };
  await axios
    .patch(API_URL + endpoint + `/${id}`, payload)
    .then((response) => {
      console.log("axios response: ", response);
      result.data = response.data;
    })
    .catch((err) => {
      result.error = err;
    })
    .finally(() => {
      result.loading = false;
    });

  return result;
}

async function deleteOne(endpoint, id) {
  const result = {
    data: null,
    loading: true,
    error: null,
  };
  await axios
    .delete(API_URL + endpoint + `/${id}`)
    .then((response) => {
      console.log("axios response: ", response);
      result.data = response.data;
    })
    .catch((err) => {
      result.error = err;
    })
    .finally(() => {
      result.loading = false;
    });

  return result;
}

const controller = {
  getAll: getAll,
  getByID: getByID,
  post: post,
  deleteOne: deleteOne,
  updateOne: updateOne,
};

export default controller;
