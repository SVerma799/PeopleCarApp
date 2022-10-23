import { useQuery } from "@apollo/client";
import React from "react";
import { GET_PEOPLE_AND_CARS } from "../queries";
import AddCar from "./forms/AddCar";
import Add from "./forms/Person/Add.jsx";
import People from "./ListFolder/People.jsx";

export default function Home() {
  const { loading, error, data } = useQuery(GET_PEOPLE_AND_CARS);
  if (loading) return "Loading...";
  if (error) return `Error! ${error.message}`;
  const peopleWithCars = data.people.map((person) => {
    return {
      ...person,
      ownCars: data.cars.filter((car) => car.personId === person.id),
    };
  });
  return (
    <div>
      <h1>Person and Car Application</h1>
      <Add />
      {data.people.length > 0 ? (
        <AddCar />
      ) : (
        "Cannot add any cars at the moment. Try adding a person first."
      )}
      <People peopleWithCars={peopleWithCars} />
    </div>
  );
}
