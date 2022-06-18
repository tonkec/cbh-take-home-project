const { deterministicPartitionKey } = require("./dpk");

describe("deterministicPartitionKey", () => {
  it("Returns the literal '0' when given no input", () => {
    const trivialKey = deterministicPartitionKey();
    expect(trivialKey).toBe("0");
  });

  it("should return hash when hash provided", () => {
    const partitionKey = deterministicPartitionKey({partitionKey: "9ed0dc076930aed8f724b6ac79e8ad09aa9073f41fc921911c716b446c840d402e7740371d18fef0ff3ffb58c2ec7b8121963887d730aa6b246823d4295451e3"});
    expect(partitionKey).toBe("9ed0dc076930aed8f724b6ac79e8ad09aa9073f41fc921911c716b446c840d402e7740371d18fef0ff3ffb58c2ec7b8121963887d730aa6b246823d4295451e3");
  });

  it("returns the string if no string is provided", () => {
    const trivialKey = deterministicPartitionKey({partitionKey: 9324324459843065475487680483732984712362784637865423894731492653476932432445984306547548768048373298471236278463786542389473149265347693243244598430654754876804837329847123627846378654238947314926534769324324459843065475487680483732984712362784637865423894731492653476});
    expect(typeof trivialKey).toBe("string");
  });

  it("returns string when number provided", () => {
    const trivialKey = deterministicPartitionKey(4394843905854);
    expect(typeof trivialKey).toBe("string");
  });
});
