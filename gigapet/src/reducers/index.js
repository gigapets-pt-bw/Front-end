const initialState = {
  users: [
    {
      username: "Ronny",
      password: "password1234",
      children: [
        {
          name: "Ludwick",
          gigapet: {},
          savedFoods: [
            {
              name: "tomato",
              date: "4/23/19",
              category: "vegetable"
            }
          ]
        }
      ]
    }
  ],
  foods: ["fruit", "vegetable", "meat", "dairy", "candy", "greasy"]
};

export const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    default:
      return state;
  }
};

export default rootReducer;
