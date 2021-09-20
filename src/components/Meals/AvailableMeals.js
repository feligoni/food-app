import React from "react";
import classes from "./AvailableMeals.module.css";

import MealItem from "./MealItem/MealItem";
import Card from "../UI/Card";

const DUMMY_MEALS = [
  {
    id: "m1",
    name: "Teahupoo Candle",
    description: "Unique scent created by us!",
    price: 22.99,
  },
  {
    id: "m2",
    name: "Garza Candle",
    description: "Unique scent created by us!",
    price: 16.5,
  },
  {
    id: "m3",
    name: "Mia's Candle",
    description: "Unique scent created by us!",
    price: 12.99,
  },
  {
    id: "m4",
    name: "Manly Candle",
    description: "Unique scent created by us!",
    price: 18.99,
  },
];

const AvailableMeals = () => {
  const mealsList = DUMMY_MEALS.map((meals) => (
    <MealItem
      id={meals.id}
      key={meals.id}
      name={meals.name}
      description={meals.description}
      price={meals.price}
    />
  ));

  return (
    <section className={classes.meals}>
      <Card>
        <ul>{mealsList}</ul>
      </Card>
    </section>
  );
};

export default AvailableMeals;
