const formatReservation = require("./formatReservation");

describe("formatReservation", () => {
  it("should format a reservation from Mongoose to API spec", () => {
    const validReservation = {
      partySize: "Mock description",
      restaurantName: "Mock description",
      date: "Mock description",
      userId: "Mock description",
    };
    const received = formatReservation({
      _id: "abc",
      __v: "this-should-be-removed",
      ...validReservation,
    });
    const expected = {
      ...validReservation,
      id: "abc",
    };
    expect(received).toEqual(expected);
  });
});
