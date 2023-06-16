const request = require("supertest");
const app = require("./app");

describe("app", () => {
  test("POST /reservations creates a new reservation", async () => {
    const expectedStatus = 201;
    const body = {
      partySize: 1,
      date: "string",
      restaurantName: "string",
    };

    await request(app)
      .post("/reservations")
      .send(body)
      .expect(expectedStatus)
      .expect((response) => {
        expect(response.body).toEqual(expect.objectContaining(body));
        expect(response.body.id).toBeTruthy();
      });
  });

  test("POST /reservations returns a 400 when an invalid request body is provided", async () => {
    const expectedStatus = 400;
    const body = {};

    await request(app).post("/reservations").send(body).expect(expectedStatus);
  });

  test("POST /reservations returns a 400 when a zero or negative party size is used", async () => {
    const expectedStatus = 400;
    const body = {
      partySize: -1000,
      date: "string",
      restaurantName: "string",
    };

    await request(app).post("/reservations").send(body).expect(expectedStatus);
  });

  test("GET /restaurants returns a list of restaurants", async () => {
    const expectedStatus = 200;
    const expectedBody = [
      {
        id: "616005cae3c8e880c13dc0b9",
        description:
          "Bringing you the spirits of India in the form of best authentic grandma's recipe dishes handcrafted with love by our chefs!",
        name: "Curry Place",
        image: "https://i.ibb.co/yftcRcF/indian.jpg",
      },
      {
        id: "616005e26d59890f8f1e619b",
        description:
          "We offer guests a modern dining experience featuring the authentic taste of Thailand. Food is prepared fresh from quality ingredients and presented with sophisticated elegance in a stunning dining setting filled with all the richness of Thai colour, sound and art.",
        name: "Thai Isaan",
        image: "https://i.ibb.co/HPjd2jR/thai.jpg",
      },
      {
        id: "616bd284bae351bc447ace5b",
        description:
          "From the Italian classics, to our one-of-a-kind delicious Italian favourites, all of our offerings are handcrafted from the finest, freshest ingredients available locally. Whether you're craving Italian comfort food like our Ravioli, Pappardelle or something with a little more Flavour like our famous Fettuccine Carbonara.",
        name: "Italian Feast",
        image: "https://i.ibb.co/0r7ywJg/italian.jpg",
      },
    ];

    await request(app)
      .get("/restaurants")
      .expect(expectedStatus)
      .expect((response) => {
        expect(response.body).toEqual(expectedBody);
      });
  });

  test("GET /reservations returns a list of all reservations", async () => {
    const expectedStatus = 200;
    const expectedBody = [
      {
        id: "507f1f77bcf86cd799439011",
        partySize: 4,
        date: "2023-11-17T06:30:00.000Z",
        userId: "mock-user-id",
        restaurantName: "Island Grill",
      },
      {
        id: "614abf0a93e8e80ace792ac6",
        partySize: 2,
        date: "2023-12-03T07:00:00.000Z",
        userId: "mock-user-id",
        restaurantName: "Green Curry",
      },
    ];

    await request(app)
      .get("/reservations")
      .expect(expectedStatus)
      .expect((response) => {
        expect(response.body).toEqual(expectedBody);
      });
  });

  test("GET /restaurants/:id returns a single restaurant", async () => {
    const expectedStatus = 200;
    const expectedBody = {
      id: "616005e26d59890f8f1e619b",
      description:
        "We offer guests a modern dining experience featuring the authentic taste of Thailand. Food is prepared fresh from quality ingredients and presented with sophisticated elegance in a stunning dining setting filled with all the richness of Thai colour, sound and art.",
      name: "Thai Isaan",
      image: "https://i.ibb.co/HPjd2jR/thai.jpg",
    };

    await request(app)
      .get("/restaurants/616005e26d59890f8f1e619b")
      .expect(expectedStatus)
      .expect((response) => {
        expect(response.body).toEqual(expectedBody);
      });
  });

  test("GET /restaurants/:id returns 404 when you supply a restaurant id that doesn’t exist in the database", async () => {
    const expectedStatus = 404;
    const expectedBody = {
      "error": "restaurant not found"
  }
    await request(app)
      .get("/restaurants/616005e26d59880f8f1e619b")
      .expect(expectedStatus)
      .expect((response) => {
        expect(response.body).toEqual(expectedBody);
      });
      
  });

  test("GET /restaurants/:id returns 400 when you supply an invalid restaurant id", async () => {
    const expectedStatus = 400;
    const expectedBody = {
      "error": "invalid id provided"
  }
    await request(app).get("/restaurants/bad-id")
    .expect(expectedStatus)
    .expect((response) => {
      expect(response.body).toEqual(expectedBody);
    });
    
  });

  test("GET /reservations/:id returns a single reservation", async () => {
    const expectedStatus = 200;
    const expectedBody = {
      id: "616005e26d59890f8f1e619b",
      description:
        "We offer guests a modern dining experience featuring the authentic taste of Thailand. Food is prepared fresh from quality ingredients and presented with sophisticated elegance in a stunning dining setting filled with all the richness of Thai colour, sound and art.",
      name: "Thai Isaan",
      image: "https://i.ibb.co/HPjd2jR/thai.jpg",
    };

    await request(app)
      .get("/restaurants/616005e26d59890f8f1e619b")
      .expect(expectedStatus)
      .expect((response) => {
        expect(response.body).toEqual(expectedBody);
      });
  });
  test("GET /reservations/invalid_id returns a 400 status and error message", async () => {
    const expectedStatus = 400;
    const expectedBody = {
      error: "invalid id provided",
    };

    await request(app)
      .get("/reservations/507f1f77bcf86cd799439d011")
      .expect(expectedStatus)
      .expect((response) => {
        expect(response.body).toEqual(expectedBody);
      });
  });
  test("GET /reservations/non_exsistent_id returns 404 status and error message", async () => {
    const expectedStatus = 404;
    const expectedBody = {
      error: "not found",
    };

    await request(app)
      .get("/reservations/6486603b7641aff87ac6580a")
      .expect(expectedStatus)
      .expect((response) => {
        expect(response.body).toEqual(expectedBody);
      });
  });
});
