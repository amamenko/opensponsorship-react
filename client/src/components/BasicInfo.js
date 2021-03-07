import React from "react";
import { Button, Form, FormGroup, Label, Input } from "reactstrap";
import StyledHeader from "./styled/StyledHeader";
import StyledInputFormSection from "./styled/StyledInputFormSection";
import { Link } from "react-router-dom";

const BasicInfo = (props) => {
  const {
    name,
    changeName,
    sport,
    changeSport,
    gender,
    changeGender,
    date,
    changeDate,
    firstSectionDone,
  } = props;

  const sportsArr = [
    "Golf",
    "Tennis",
    "Cricket",
    "Basketball",
    "Baseball",
    "American Football",
    "Aquatics",
    "Archery",
    "Automobile Racing",
    "Badminton",
    "Beach Volleyball",
    "Bobsleigh",
    "Body Building",
    "Boxing",
    "Cross Country Running",
    "Cross Country Skiing",
    "Curling",
    "Cycling",
    "Darts",
    "Decathlon",
    "Down Hill Skiing",
    "Equestrianism",
    "eSports",
    "Fencing",
    "Field Hockey",
    "Figure Skating",
    "Gymnastics",
    "Ice Hockey",
    "Martial Arts",
    "Mixed Martial Arts",
    "Modern Pentathlon",
    "Motorcycle Racing",
    "Netball",
    "Polo",
    "Racquetball",
    "Rowing",
    "Rugby",
    "Sailing",
    "Softball",
    "Shooting",
    "Skateboarding",
    "Skeet Shooting",
    "Skeleton",
    "Snow Boarding",
    "Soccer (Football)",
    "Squash",
    "Surfing",
    "Swimming",
    "Track and Field",
  ];

  const handleContinueClick = (e) => {
    e.preventDefault();
  };

  const handleSportSelect = (e) => {
    changeSport(
      [...e.target.options]
        .filter((option) => option.selected)
        .map((option) => option.value)
    );
  };

  return (
    <StyledInputFormSection>
      <StyledHeader>Basic Athlete Info</StyledHeader>
      <Form>
        <FormGroup>
          <Label for="name">Name</Label>
          <Input
            value={name}
            type="text"
            name="text"
            id="name"
            placeholder="Enter your full name here"
            onChange={(e) => changeName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="sport">Sport</Label>
          <Input
            value={sport}
            type="select"
            name="select"
            id="sport"
            multiple
            onChange={handleSportSelect}
          >
            <option value="" disabled>
              Select your sport(s) below
            </option>
            {/* Using index as key here is fine since sportsArr will never change */}
            {sportsArr.map((sport, i) => (
              <option key={i} value={sport}>
                {sport}
              </option>
            ))}
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="gender">Gender</Label>
          <Input
            value={gender}
            type="select"
            name="select"
            id="gender"
            onChange={(e) => changeGender(e.target.value)}
          >
            <option value="" disabled>
              Select your gender below
            </option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </Input>
        </FormGroup>
        <FormGroup>
          <Label for="dateOfBirth">Date of Birth</Label>
          <Input
            value={date}
            type="date"
            name="date"
            id="dateOfBirth"
            onChange={(e) => changeDate(e.target.value)}
          />
        </FormGroup>
        <Button
          disabled={!firstSectionDone}
          color="primary"
          size="lg"
          block
          onClick={handleContinueClick}
        >
          <Link
            to={"/about"}
            className={!firstSectionDone ? "disabled_link" : ""}
          >
            Continue to About Section
          </Link>
        </Button>
      </Form>
    </StyledInputFormSection>
  );
};

export default BasicInfo;
