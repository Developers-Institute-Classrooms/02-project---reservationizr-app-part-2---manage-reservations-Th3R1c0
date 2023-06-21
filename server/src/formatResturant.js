const formatResturant = (resturant) => {
  return {
    id: resturant._id,
    description: resturant.description,
    name: resturant.name,
    image: resturant.image,
  };
};

module.exports = formatResturant;
