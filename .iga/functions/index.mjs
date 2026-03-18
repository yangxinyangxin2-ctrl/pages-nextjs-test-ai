import { createRequire } from 'module'; const require = createRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// ../../.npm-global/lib/node_modules/@iga-pages/cli/dist/request-handler.js
var require_request_handler = __commonJS({
  "../../.npm-global/lib/node_modules/@iga-pages/cli/dist/request-handler.js"(exports) {
    "use strict";
    var __webpack_require__ = {};
    (() => {
      __webpack_require__.d = (exports1, definition) => {
        for (var key in definition)
          if (__webpack_require__.o(definition, key) && !__webpack_require__.o(exports1, key))
            Object.defineProperty(exports1, key, {
              enumerable: true,
              get: definition[key]
            });
      };
    })();
    (() => {
      __webpack_require__.o = (obj, prop) => Object.prototype.hasOwnProperty.call(obj, prop);
    })();
    (() => {
      __webpack_require__.r = (exports1) => {
        if ("u" > typeof Symbol && Symbol.toStringTag)
          Object.defineProperty(exports1, Symbol.toStringTag, {
            value: "Module"
          });
        Object.defineProperty(exports1, "__esModule", {
          value: true
        });
      };
    })();
    var __webpack_exports__ = {};
    __webpack_require__.r(__webpack_exports__);
    __webpack_require__.d(__webpack_exports__, {
      RequestHandler: () => RequestHandler2,
      calculateRoutePrefix: () => calculateRoutePrefix
    });
    function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
      try {
        var info = gen[key](arg);
        var value = info.value;
      } catch (error) {
        reject(error);
        return;
      }
      if (info.done)
        resolve(value);
      else
        Promise.resolve(value).then(_next, _throw);
    }
    function _async_to_generator(fn) {
      return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
          var gen = fn.apply(self, args);
          function _next(value) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
          }
          function _throw(err) {
            asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
          }
          _next(void 0);
        });
      };
    }
    function _define_property(obj, key, value) {
      if (key in obj)
        Object.defineProperty(obj, key, {
          value,
          enumerable: true,
          configurable: true,
          writable: true
        });
      else
        obj[key] = value;
      return obj;
    }
    function _object_spread(target) {
      for (var i = 1; i < arguments.length; i++) {
        var source = null != arguments[i] ? arguments[i] : {};
        var ownKeys = Object.keys(source);
        if ("function" == typeof Object.getOwnPropertySymbols)
          ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function(sym) {
            return Object.getOwnPropertyDescriptor(source, sym).enumerable;
          }));
        ownKeys.forEach(function(key) {
          _define_property(target, key, source[key]);
        });
      }
      return target;
    }
    var RequestHandler2 = class {
      execute(handler, context) {
        return _async_to_generator(function* () {
          const { req, res, params, routePrefix, method } = context;
          try {
            if (handler[method] && "function" == typeof handler[method]) {
              const webRequest = yield this.createWebRequest(req, params);
              const webResponse = yield handler[method](webRequest);
              yield this.sendWebResponse(webResponse, res);
              return true;
            }
            if (handler.fetch && "function" == typeof handler.fetch) {
              const webRequest = yield this.createWebRequest(req, params);
              const webResponse = yield handler.fetch(webRequest);
              yield this.sendWebResponse(webResponse, res);
              return true;
            }
            if (this.isFrameworkInstance(handler)) {
              yield this.handleFramework(handler, req, res, params, routePrefix);
              return true;
            }
            if ("function" == typeof handler) {
              yield this.handleLegacy(handler, req, res, params);
              return true;
            }
            return false;
          } catch (error) {
            throw error;
          }
        }).call(this);
      }
      isFrameworkInstance(handler) {
        return "function" == typeof handler && (handler.handle || handler._router);
      }
      handleFramework(app, req, res, params, routePrefix) {
        return _async_to_generator(function* () {
          return new Promise((resolve, reject) => {
            req.params = _object_spread({}, req.params, params);
            const originalUrl = req.url || "/";
            if (routePrefix && "/" !== routePrefix) {
              const pathname = originalUrl.split("?")[0];
              const queryString = originalUrl.includes("?") ? originalUrl.substring(originalUrl.indexOf("?")) : "";
              let newPath = pathname.replace(new RegExp(`^${routePrefix}`), "") || "/";
              if (!newPath.startsWith("/"))
                newPath = "/" + newPath;
              req.url = newPath + queryString;
            }
            const originalEnd = res.end.bind(res);
            res.end = function(...args) {
              originalEnd(...args);
              resolve();
              return res;
            };
            res.on("error", reject);
            try {
              app(req, res, (err) => {
                if (err)
                  reject(err);
              });
            } catch (error) {
              reject(error);
            }
          });
        })();
      }
      handleLegacy(handler, req, res, params) {
        return _async_to_generator(function* () {
          req.query = this.parseQuery(req.url || "");
          req.params = params;
          req.body = {};
          this.enhanceResponse(res);
          yield handler(req, res);
        }).call(this);
      }
      createWebRequest(req, params) {
        return _async_to_generator(function* () {
          const protocol = "http";
          const host = req.headers.host || "localhost";
          const url = `${protocol}://${host}${req.url}`;
          let body;
          if (req.method && [
            "POST",
            "PUT",
            "PATCH",
            "DELETE"
          ].includes(req.method))
            body = yield this.readRequestBody(req);
          const requestInit = {
            method: req.method || "GET",
            headers: req.headers
          };
          if (body)
            requestInit.body = body;
          const request = new Request(url, requestInit);
          request.params = params;
          return request;
        }).call(this);
      }
      sendWebResponse(webResponse, res) {
        return _async_to_generator(function* () {
          res.statusCode = webResponse.status;
          webResponse.headers.forEach((value, key) => {
            res.setHeader(key, value);
          });
          if (webResponse.body) {
            const reader = webResponse.body.getReader();
            const decoder = new TextDecoder();
            let result = "";
            while (true) {
              const { done, value } = yield reader.read();
              if (done)
                break;
              result += decoder.decode(value, {
                stream: true
              });
            }
            res.end(result);
          } else
            res.end();
        })();
      }
      readRequestBody(req) {
        return new Promise((resolve, reject) => {
          let body = "";
          req.on("data", (chunk) => {
            body += chunk.toString();
          });
          req.on("end", () => {
            resolve(body);
          });
          req.on("error", (error) => {
            reject(error);
          });
        });
      }
      parseQuery(url) {
        const queryString = url.split("?")[1];
        if (!queryString)
          return {};
        const params = {};
        queryString.split("&").forEach((param) => {
          const [key, value] = param.split("=");
          if (key)
            params[decodeURIComponent(key)] = decodeURIComponent(value || "");
        });
        return params;
      }
      enhanceResponse(res) {
        res.json = function(data) {
          this.setHeader("Content-Type", "application/json");
          this.end(JSON.stringify(data));
          return this;
        };
        res.status = function(code) {
          this.statusCode = code;
          return this;
        };
        res.send = function(data) {
          if ("object" == typeof data)
            return this.json(data);
          if ("string" == typeof data) {
            this.setHeader("Content-Type", "text/html");
            this.end(data);
          } else
            this.end(String(data));
          return this;
        };
      }
    };
    function calculateRoutePrefix(route) {
      let prefix = route.replace(/\/\[\[.*?\]\]$/, "");
      prefix = prefix.replace(/\/\[\.\.\..*?\]$/, "");
      return prefix || "/";
    }
    exports.RequestHandler = __webpack_exports__.RequestHandler;
    exports.calculateRoutePrefix = __webpack_exports__.calculateRoutePrefix;
    for (__rspack_i in __webpack_exports__)
      if (-1 === [
        "RequestHandler",
        "calculateRoutePrefix"
      ].indexOf(__rspack_i))
        exports[__rspack_i] = __webpack_exports__[__rspack_i];
    var __rspack_i;
    Object.defineProperty(exports, "__esModule", {
      value: true
    });
  }
});

// .iga-temp-functions-entry.mjs
var import_request_handler = __toESM(require_request_handler(), 1);
import { createServer } from "http";

// api/basicMath.ts
var basicMath_exports = {};
__export(basicMath_exports, {
  add: () => add,
  calculate: () => calculate,
  divide: () => divide,
  multiply: () => multiply,
  subtract: () => subtract
});
function add(a, b) {
  return a + b;
}
function subtract(a, b) {
  return a - b;
}
function multiply(a, b) {
  return a * b;
}
function divide(a, b) {
  if (b === 0) {
    throw new Error("\u9664\u6570\u4E0D\u80FD\u4E3A\u96F6");
  }
  return a / b;
}
function calculate(a, b, operator) {
  switch (operator) {
    case "+":
      return add(a, b);
    case "-":
      return subtract(a, b);
    case "*":
      return multiply(a, b);
    case "/":
      return divide(a, b);
    default:
      throw new Error("\u4E0D\u652F\u6301\u7684\u8FD0\u7B97\u7B26");
  }
}

// api/hello.js
var hello_exports = {};
__export(hello_exports, {
  GET: () => GET
});
async function GET(request) {
  return Response.json({
    message: "Hello from IGA Pages!",
    timestamp: (/* @__PURE__ */ new Date()).toISOString()
  });
}

// api/helpers.ts
var helpers_exports = {};
__export(helpers_exports, {
  formatCurrency: () => formatCurrency,
  formatNumber: () => formatNumber,
  isNumber: () => isNumber,
  round: () => round
});
function formatCurrency(amount) {
  return new Intl.NumberFormat("zh-CN", {
    style: "currency",
    currency: "CNY"
  }).format(amount);
}
function formatNumber(num) {
  return new Intl.NumberFormat("zh-CN").format(num);
}
function round(num, decimalPlaces = 2) {
  return Math.round(num * Math.pow(10, decimalPlaces)) / Math.pow(10, decimalPlaces);
}
function isNumber(value) {
  return !isNaN(parseFloat(value)) && isFinite(value);
}

// api/index.ts
var api_exports = {};
__export(api_exports, {
  add: () => add,
  calculate: () => calculate,
  calculateEqualPrincipal: () => calculateEqualPrincipal,
  calculateEqualPrincipalAndInterest: () => calculateEqualPrincipalAndInterest,
  divide: () => divide,
  formatCurrency: () => formatCurrency,
  formatNumber: () => formatNumber,
  isNumber: () => isNumber,
  multiply: () => multiply,
  round: () => round,
  subtract: () => subtract
});

// api/mortgage.ts
var mortgage_exports = {};
__export(mortgage_exports, {
  calculateEqualPrincipal: () => calculateEqualPrincipal,
  calculateEqualPrincipalAndInterest: () => calculateEqualPrincipalAndInterest
});
function calculateEqualPrincipalAndInterest(params) {
  const principal = params.loanAmount * 1e4;
  const months = params.years * 12;
  const monthlyRate = params.rate / 100 / 12;
  const monthlyPayment = principal * monthlyRate * Math.pow(1 + monthlyRate, months) / (Math.pow(1 + monthlyRate, months) - 1);
  const totalPayment = monthlyPayment * months;
  const totalInterest = totalPayment - principal;
  return {
    monthlyPayment,
    totalPayment,
    totalInterest
  };
}
function calculateEqualPrincipal(params) {
  const principal = params.loanAmount * 1e4;
  const months = params.years * 12;
  const monthlyRate = params.rate / 100 / 12;
  const monthlyPrincipal = principal / months;
  let totalInterest = 0;
  for (let i = 0; i < months; i++) {
    const remainingPrincipal = principal - monthlyPrincipal * i;
    totalInterest += remainingPrincipal * monthlyRate;
  }
  const totalPayment = principal + totalInterest;
  return {
    monthlyPayment: monthlyPrincipal + principal * monthlyRate,
    totalPayment,
    totalInterest
  };
}

// .iga-temp-functions-entry.mjs
var requestHandler = new import_request_handler.RequestHandler();
var handler0 = void 0 || basicMath_exports;
var handler1 = void 0 || hello_exports;
var handler2 = void 0 || helpers_exports;
var handler3 = void 0 || api_exports;
var handler4 = void 0 || mortgage_exports;
var routes = [
  {
    route: "/api/basicMath",
    routePrefix: "/api/basicMath",
    pattern: new RegExp("^/api/basicMath/?$"),
    params: [],
    type: "static",
    priority: 100,
    handler: handler0
  },
  {
    route: "/api/hello",
    routePrefix: "/api/hello",
    pattern: new RegExp("^/api/hello/?$"),
    params: [],
    type: "static",
    priority: 100,
    handler: handler1
  },
  {
    route: "/api/helpers",
    routePrefix: "/api/helpers",
    pattern: new RegExp("^/api/helpers/?$"),
    params: [],
    type: "static",
    priority: 100,
    handler: handler2
  },
  {
    route: "/api/mortgage",
    routePrefix: "/api/mortgage",
    pattern: new RegExp("^/api/mortgage/?$"),
    params: [],
    type: "static",
    priority: 100,
    handler: handler4
  },
  {
    route: "/api",
    routePrefix: "/api",
    pattern: new RegExp("^/api/?$"),
    params: [],
    type: "static",
    priority: 100,
    handler: handler3
  }
];
async function handleRequest(req, res) {
  const url = new URL(req.url, `http://${req.headers.host}`);
  let pathname = url.pathname;
  if (pathname.length > 1 && pathname.endsWith("/")) {
    pathname = pathname.slice(0, -1);
  }
  for (const route of routes) {
    const match = pathname.match(route.pattern);
    if (match) {
      try {
        const pathParams = {};
        route.params.forEach((param, index) => {
          pathParams[param] = match[index + 1] || "";
        });
        const handler = route.handler;
        const method = (req.method || "GET").toUpperCase();
        const context = {
          req,
          res,
          params: pathParams,
          routePrefix: route.routePrefix,
          method
        };
        const handled = await requestHandler.execute(handler, context);
        if (!handled) {
          res.statusCode = 500;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({
            error: "Invalid handler",
            message: "Handler must export GET/POST/etc., fetch method, framework instance, or default function"
          }));
        }
        return;
      } catch (error) {
        console.error("Error handling request:", error);
        res.statusCode = 500;
        res.setHeader("Content-Type", "application/json");
        res.end(JSON.stringify({
          error: "Internal Server Error",
          message: error.message
        }));
        return;
      }
    }
  }
  res.statusCode = 404;
  res.setHeader("Content-Type", "application/json");
  res.end(JSON.stringify({
    error: "Not Found",
    path: pathname
  }));
}
var isMainModule = process.argv[1] && import.meta.url.endsWith(process.argv[1].replace(/\\/g, "/"));
if (isMainModule) {
  const PORT = process.env.PORT || 3e3;
  const server = createServer(handleRequest);
  server.listen(PORT, () => {
    console.log(`\u{1F680} Serverless Functions running on http://localhost:${PORT}`);
  });
}
export {
  handleRequest,
  routes
};
