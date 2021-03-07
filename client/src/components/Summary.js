import React, { useState } from "react";
import styled from "styled-components";
import { Button } from "reactstrap";
import { Link, Redirect } from "react-router-dom";
import StyledInputFormSection from "./styled/StyledInputFormSection";
import StyledHeader from "./styled/StyledHeader";
import StyledProfileImage from "./styled/StyledProfileImage";
import axios from "axios";

const StyledSummaryItemContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const StyledSummarySectionTitle = styled.p`
  font-weight: 700;
  padding-right: 0.5rem;
`;

const StyledSummaryInnerContainer = styled.div`
  @media (min-width: 52rem) {
    width: 50%;
  }
`;

const Summary = (props) => {
  const {
    name,
    sport,
    gender,
    date,
    description,
    locationName,
    team,
    profileImageBlob,
    profileImageCompressedString,
    firstSectionDone,
    secondSectionDone,
  } = props;

  const [successfulProfileCreation, changeSuccessfulProfileCreation] = useState(
    false
  );

  const redirectFunction = () => {
    if (!firstSectionDone) {
      return <Redirect to="/" />;
    } else {
      if (!secondSectionDone) {
        return <Redirect to="/about" />;
      } else {
        if (successfulProfileCreation) {
          return <Redirect to="/profiles" />;
        }
      }
    }
  };

  const submitNewAthleteProfile = () => {
    axios({
      method: "post",
      url:
        process.env.REACT_APP_ENV === "production"
          ? `${process.env.REACT_APP_PRODUCTION_CLIENT_URL}/api/create`
          : "http://localhost:4000/api/create",
      data: {
        name,
        sport,
        gender,
        date,
        description,
        location: locationName,
        team,
        profileImage: profileImageCompressedString,
      },
    }).then((res) => {
      console.log(res);

      if (res.data) {
        if (!successfulProfileCreation) {
          changeSuccessfulProfileCreation(true);
        }
      }
    });
  };

  return (
    <StyledInputFormSection>
      {redirectFunction()}
      <StyledSummaryInnerContainer>
        <StyledHeader>Summary</StyledHeader>
        <StyledSummaryItemContainer>
          <StyledSummarySectionTitle>Full Name:</StyledSummarySectionTitle>
          <p>{name}</p>
        </StyledSummaryItemContainer>

        <StyledSummaryItemContainer>
          <StyledSummarySectionTitle>Sport(s):</StyledSummarySectionTitle>
          <p>{sport.join(", ")}</p>
        </StyledSummaryItemContainer>

        <StyledSummaryItemContainer>
          <StyledSummarySectionTitle>Gender:</StyledSummarySectionTitle>
          <p>{gender}</p>
        </StyledSummaryItemContainer>

        <StyledSummaryItemContainer>
          <StyledSummarySectionTitle>Date of Birth:</StyledSummarySectionTitle>
          <p>{date}</p>
        </StyledSummaryItemContainer>

        <StyledSummaryItemContainer>
          <StyledSummarySectionTitle>About:</StyledSummarySectionTitle>
          <p>{description}</p>
        </StyledSummaryItemContainer>

        <StyledSummaryItemContainer>
          <StyledSummarySectionTitle>Location Name:</StyledSummarySectionTitle>
          <p>{locationName}</p>
        </StyledSummaryItemContainer>

        <StyledSummaryItemContainer>
          <StyledSummarySectionTitle>Team Name:</StyledSummarySectionTitle>
          <p>{team}</p>
        </StyledSummaryItemContainer>

        <StyledSummaryItemContainer>
          <StyledSummarySectionTitle>Profile Image:</StyledSummarySectionTitle>
          {profileImageBlob ? (
            <StyledProfileImage
              alt="Profile"
              src={URL.createObjectURL(profileImageBlob)}
            />
          ) : (
            "None selected"
          )}
        </StyledSummaryItemContainer>
        <Button color="secondary" size="lg" block>
          <Link to={"/about"}>Back to About Section</Link>
        </Button>
        <Button
          color="primary"
          size="lg"
          block
          onClick={submitNewAthleteProfile}
        >
          Submit
        </Button>
      </StyledSummaryInnerContainer>
    </StyledInputFormSection>
  );
};

export default Summary;
