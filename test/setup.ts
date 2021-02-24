import Enzyme from "enzyme";
import Adapter from "enzyme-adapter-react-16";
import path from "path";

Enzyme.configure({ adapter: new Adapter() });

const dotEnvPath = path.resolve(".env");

require("dotenv").config({
  path: dotEnvPath,
});

const { JSDOM } = require("jsdom");

const jsdom = new JSDOM("<!doctype html><html><body></body></html>");
const { window } = jsdom;

const copyProps = (src: any, target: any) => {
  const props = Object.getOwnPropertyNames(src)
    .filter((prop) => {
      return typeof target[prop] === "undefined";
    })
    .map((prop) => {
      return Object.getOwnPropertyDescriptor(src, prop);
    });

  const propsAsUnknown = props as unknown;
  const propsAsPropertyDescriptorMap = propsAsUnknown as PropertyDescriptorMap;
  Object.defineProperties(target, propsAsPropertyDescriptorMap);
};

let temp: any = null;
const localS = {
  getItem() {
    return temp;
  },
  setItem(key: any, value: any) {
    temp = value;
  },
};

(global as any).HTMLElement = window.HTMLElement;
(global as any).localStorage = localS;
(global as any).XMLHttpRequest = window.XMLHttpRequest;

(global as any).window = window;
(global as any).document = window.document;
(global as any).navigator = {
  userAgent: "node.js",
};
copyProps(window, global);
