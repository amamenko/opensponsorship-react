import React, { useState, useEffect } from "react";
import BasicInfo from "./components/BasicInfo";
import About from "./components/About";
import Summary from "./components/Summary";
import Profiles from "./components/Profiles";
import styled from "styled-components";
import { Switch, Route, useLocation, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const StyledFormContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  position: relative;

  a {
    color: inherit;
    text-decoration: inherit;
  }

  button {
    margin-top: 2rem;
  }

  @media (min-width: 1074px) {
    h3 {
      font-size: 1.5rem;
    }
    form {
      width: 50%;
    }
  }
`;

const StyledNavigationContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-evenly;
  background: #fff;
  width: 100%;

  h3 {
    text-align: center;
    font-size: 1rem;
    padding-top: 2rem;

    &:first-child {
      opacity: ${(props) => (props.createProfileActive ? 1 : 0.5)};
    }

    &:nth-child(2) {
      opacity: ${(props) => (props.createProfileActive ? 0.5 : 1)};
    }

    &:hover {
      opacity: 1;
      cursor: pointer;
    }

    transition: opacity 0.5s ease;
  }

  @media (max-width: 330px) {
    padding-top: 3rem;
  }

  @media (min-width: 52rem) {
    width: 50%;
  }
`;

const App = () => {
  const location = useLocation();

  // Basic Info Section
  const [name, changeName] = useState("");
  const [sport, changeSport] = useState([]);
  const [gender, changeGender] = useState("");
  const [date, changeDate] = useState("");
  const [firstSectionDone, changeFirstSectionDone] = useState(false);

  // About Section
  const [description, changeDescription] = useState("");
  const [locationName, changeLocationName] = useState("");
  const [team, changeTeam] = useState("");
  const [profileImageName, changeProfileImageName] = useState("");
  const [profileImageBlob, changeProfileImageBlob] = useState("");
  const [
    profileImageCompressedString,
    changeProfileImageCompressedString,
  ] = useState("");
  const [profileImageType, changeProfileImageType] = useState("");
  const [secondSectionDone, changeSecondSectionDone] = useState(false);

  useEffect(() => {
    if (name) {
      if (sport) {
        if (sport.length > 0) {
          if (gender) {
            if (date) {
              if (!firstSectionDone) {
                changeFirstSectionDone(true);
              }
            }
          }
        }
      }
    }
  }, [date, firstSectionDone, gender, name, sport]);

  useEffect(() => {
    if (description) {
      if (locationName) {
        if (team) {
          if (
            !profileImageName ||
            (profileImageName &&
              profileImageCompressedString &&
              ["png", "jpg", "jpeg"].includes(profileImageType))
          ) {
            if (!secondSectionDone) {
              changeSecondSectionDone(true);
            }
          }
        }
      }
    }
  }, [
    description,
    locationName,
    profileImageCompressedString,
    profileImageName,
    profileImageType,
    team,
    secondSectionDone,
  ]);

  return (
    <StyledFormContainer>
      <StyledNavigationContainer
        createProfileActive={
          location.pathname === "/" ||
          location.pathname === "/summary" ||
          location.pathname === "/about"
        }
      >
        <h3>
          <Link to={"/"}>Create Profile</Link>
        </h3>
        <h3>
          <Link to={"/profiles"}>View All Profiles</Link>
        </h3>
      </StyledNavigationContainer>
      <Switch>
        <Route path="/" exact>
          <BasicInfo
            name={name}
            changeName={changeName}
            sport={sport}
            changeSport={changeSport}
            gender={gender}
            changeGender={changeGender}
            date={date}
            changeDate={changeDate}
            firstSectionDone={firstSectionDone}
          />
        </Route>
        <Route path="/about" exact>
          <About
            firstSectionDone={firstSectionDone}
            description={description}
            changeDescription={changeDescription}
            locationName={locationName}
            changeLocationName={changeLocationName}
            team={team}
            changeTeam={changeTeam}
            profileImageName={profileImageName}
            changeProfileImageName={changeProfileImageName}
            profileImageBlob={profileImageBlob}
            changeProfileImageBlob={changeProfileImageBlob}
            profileImageCompressedString={profileImageCompressedString}
            changeProfileImageCompressedString={
              changeProfileImageCompressedString
            }
            profileImageType={profileImageType}
            changeProfileImageType={changeProfileImageType}
            secondSectionDone={secondSectionDone}
          />
        </Route>
        <Route path="/summary" exact>
          <Summary
            firstSectionDone={firstSectionDone}
            secondSectionDone={secondSectionDone}
            name={name}
            sport={sport}
            gender={gender}
            date={date}
            description={description}
            locationName={locationName}
            team={team}
            profileImageName={profileImageName}
            profileImageCompressedString={profileImageCompressedString}
            profileImageBlob={profileImageBlob}
          />
        </Route>
        <Route path="/profiles" exact>
          <Profiles
            changeName={changeName}
            changeSport={changeSport}
            changeGender={changeGender}
            changeDate={changeDate}
            changeFirstSectionDone={changeFirstSectionDone}
            changeDescription={changeDescription}
            changeLocationName={changeLocationName}
            changeTeam={changeTeam}
            changeProfileImageName={changeProfileImageName}
            changeProfileImageBlob={changeProfileImageBlob}
            changeProfileImageCompressedString={
              changeProfileImageCompressedString
            }
            changeProfileImageType={changeProfileImageType}
            changeSecondSectionDone={changeSecondSectionDone}
          />
        </Route>
      </Switch>
    </StyledFormContainer>
  );
};

export default App;
