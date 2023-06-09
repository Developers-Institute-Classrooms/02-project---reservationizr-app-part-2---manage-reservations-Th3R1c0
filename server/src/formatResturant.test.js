const formatResturant = require("./formatResturant");

describe("formatResturant", () => {
  it("should format a Resturant from Mongoose to API spec", () => {
    const validResturants = {
      description: "Mock description",
      name: "Mock description",
      image: "Mock description",
    };
    const received = formatResturant({
      _id: "abc",
      __v: "this-should-be-removed",
      ...validResturants,
    });
    const expected = {
      ...validResturants,
      id: "abc",
    };
    expect(received).toEqual(expected);
  });
});
