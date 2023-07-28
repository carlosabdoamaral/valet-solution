import axios from "axios";

const defaultConfig = {
  headers: {
    Authorization: "",
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
    Accept: "application/json",
  },
};

export default class HttpService {
  constructor() {
    this.initConfig();
  }

  initConfig() {
    this.config = {
      ...this.config,
      headers: {
        Authorization: "",
        "Content-Type": "application/json",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Methods": "GET,PUT,POST,DELETE,PATCH,OPTIONS",
        Accept: "application/json",
      },
    };
  }

  updateConfig(newConfig) {
    return { ...this.config, newConfig };
  }

  doPost(url, body, config) {
    axios
      .post(url, body, this.updateConfig(config))
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }

  doGet(url, config) {
    axios
      .get(url, this.updateConfig(config))
      .then((res) => {
        return res;
      })
      .catch((err) => {
        return err;
      });
  }
}
