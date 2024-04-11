import Taro from "@tarojs/taro";
import { omit } from "lodash";


const defaultParams = {
  header: {
    "Content-type": "application/json",
  },
};

function createAPI(baseURL) {
  return function (conf) {
    const opts = (conf.opts || {});

    const paramsSerializer = opts.paramsSerializer;

    const requestData = opts.data;

    return Taro.request(
      Object.assign(
        {},
        defaultParams,
        {
          url: `${baseURL}${conf.url}`,
          method: conf.method,
        },
        omit(opts, ["path", "paramsSerializer"]),
        !!paramsSerializer
          ? {
              data: paramsSerializer(requestData) || requestData,
            }
          : {}
      )
    );
  };
}

function convertRESTAPI(url, opts) {
  if (!opts || !opts.path) return url;

  const pathKeys = Object.keys(opts.path);

  pathKeys.forEach((key) => {
    const r = new RegExp("(:" + key + "|{" + key + "})", "g");
    url = url.replace(r, opts.path[key]);
  });

  return url;
}
const REACT_APP_XCJ_DJC_GATEWAY = 'http://localhost:8080'

export { createAPI, convertRESTAPI, REACT_APP_XCJ_DJC_GATEWAY };
