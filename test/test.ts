const chai = require("chai");
const chaiEnzyme = require("chai-enzyme");

chai.use(chaiEnzyme());
const expect = chai.expect;

describe("test", () => {
  it("example test", () => {
    const testObject = { key: 1 };
    expect(testObject).to.deep.equal(testObject);
  });
});
