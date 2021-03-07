import React, { useEffect, useState } from "react";
import axios from "axios";
import styled from "styled-components";
import LZString from "lz-string";
import StyledInputFormSection from "./styled/StyledInputFormSection";
import StyledProfileImage from "./styled/StyledProfileImage";
import { IoChevronDownOutline, IoChevronUpOutline } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { SiZeromq } from "react-icons/si";
import ClipLoader from "react-spinners/ClipLoader";
import { css } from "@emotion/core";

const override = css`
  display: block;
  margin: 0 auto;
  position: absolute;
  top: 40%;
  left: 0;
  right: 0;
`;

const StyledProfileContainer = styled.div`
  margin-bottom: 2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-around;

  @media (min-width: 1200px) {
    width: 70%;
  }
`;

const StyledProfileListItem = styled.div`
  padding: 0.5rem;
  background: rgb(225, 225, 225);
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;

  &:hover {
    background: rgb(215, 215, 215);
    cursor: pointer;
    transition: background 0.5s ease;
  }

  p {
    padding: 0;
    margin: 0;
  }

  @media (max-width: 900px) {
    max-width: 25rem;
  }

  @media (min-width: 1200px) {
    width: 70%;
    max-width: none;
  }
`;

const StyledProfilePictureContainer = styled.div`
  position: relative;
  border-radius: 50px;
  overflow: hidden;
  width: 50px;
  height: 50px;
  object-fit: contain;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const StyledProfileExpandedDetails = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
  width: 100%;
  padding-top: 1rem;
  padding-left: 1rem;
  background: rgb(250, 250, 250);

  @media (max-width: 900px) {
    max-width: 25rem;
  }

  @media (min-width: 1200px) {
    width: 70%;
    max-width: none;
  }
`;

const StyledProfileLine = styled.span`
  display: flex;
  align-items: center;
  justify-content: flex-start;
`;

const StyledSectionTitle = styled.p`
  font-weight: 700;
  padding-right: 0.5rem;
`;

const StyledEmptyStateContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: rgb(100, 100, 100);

  p {
    padding-top: 2rem;
  }
`;

const Profiles = (props) => {
  const {
    changeName,
    changeSport,
    changeGender,
    changeDate,
    changeFirstSectionDone,
    changeDescription,
    changeLocationName,
    changeTeam,
    changeProfileImageName,
    changeProfileImageBlob,
    changeProfileImageCompressedString,
    changeProfileImageType,
    changeSecondSectionDone,
  } = props;

  const [allProfiles, changeAllProfiles] = useState("");
  const [dataLoading, changeDataLoading] = useState(false);
  const [expandedListItem, changeExpandedListItem] = useState("");

  useEffect(() => {
    changeName("");
    changeSport([]);
    changeGender("");
    changeDate("");
    changeFirstSectionDone(false);
    changeDescription("");
    changeLocationName("");
    changeTeam("");
    changeProfileImageName("");
    changeProfileImageBlob("");
    changeProfileImageCompressedString("");
    changeProfileImageType("");
    changeSecondSectionDone(false);
  }, [
    changeName,
    changeSport,
    changeGender,
    changeDate,
    changeFirstSectionDone,
    changeDescription,
    changeLocationName,
    changeTeam,
    changeProfileImageName,
    changeProfileImageBlob,
    changeProfileImageCompressedString,
    changeProfileImageType,
    changeSecondSectionDone,
  ]);

  useEffect(() => {
    changeDataLoading(true);

    axios({
      method: "get",
      url:
        process.env.REACT_APP_ENV === "production"
          ? `${process.env.REACT_APP_PRODUCTION_CLIENT_URL}/api/read`
          : "http://localhost:4000/api/read",
    })
      .then((res) => {
        console.log(res);
        changeAllProfiles(res.data);
        changeDataLoading(false);
      })
      .catch((err) => {
        console.log(err);
        changeDataLoading(false);
      });
  }, []);

  const emptyState = () => {
    return (
      <StyledEmptyStateContainer>
        <SiZeromq color="#dedede" size={200} />
        <p>No profiles yet!</p>
      </StyledEmptyStateContainer>
    );
  };

  return (
    <StyledInputFormSection>
      {dataLoading ? (
        <ClipLoader
          color={"#000"}
          loading={dataLoading}
          css={override}
          size={150}
        />
      ) : allProfiles ? (
        Array.isArray(allProfiles) && allProfiles.length > 0 ? (
          allProfiles.map((profile) => {
            let imageBlob;

            if (profile.profileImage) {
              imageBlob = LZString.decompressFromEncodedURIComponent(
                profile.profileImage
              );
            }

            return (
              <StyledProfileContainer
                key={profile._id}
                onClick={() => {
                  if (expandedListItem !== profile._id) {
                    changeExpandedListItem(profile._id);
                  } else {
                    changeExpandedListItem("");
                  }
                }}
              >
                <StyledProfileListItem>
                  {profile.profileImage ? (
                    <StyledProfilePictureContainer>
                      <StyledProfileImage src={imageBlob} alt="Profile" />
                    </StyledProfilePictureContainer>
                  ) : (
                    <CgProfile size={50} />
                  )}
                  <p>{profile.name}</p>
                  {expandedListItem === profile._id ? (
                    <IoChevronUpOutline />
                  ) : (
                    <IoChevronDownOutline />
                  )}
                </StyledProfileListItem>
                {expandedListItem === profile._id ? (
                  <StyledProfileExpandedDetails>
                    <StyledProfileLine>
                      <StyledSectionTitle>Full name:</StyledSectionTitle>
                      <p>{profile.name}</p>
                    </StyledProfileLine>
                    <StyledProfileLine>
                      <StyledSectionTitle>Gender:</StyledSectionTitle>
                      <p>{profile.gender}</p>
                    </StyledProfileLine>
                    <StyledProfileLine>
                      <StyledSectionTitle>Sports:</StyledSectionTitle>
                      <p>{profile.sport.join(", ")}</p>
                    </StyledProfileLine>
                    <StyledProfileLine>
                      <StyledSectionTitle>Date of birth:</StyledSectionTitle>
                      <p>{profile.date}</p>
                    </StyledProfileLine>
                    <StyledProfileLine>
                      <StyledSectionTitle>Description:</StyledSectionTitle>
                      <p>{profile.description}</p>
                    </StyledProfileLine>
                    <StyledProfileLine>
                      <StyledSectionTitle>Location:</StyledSectionTitle>
                      <p>{profile.location}</p>
                    </StyledProfileLine>
                    <StyledProfileLine>
                      <StyledSectionTitle>Team:</StyledSectionTitle>
                      <p>{profile.team}</p>
                    </StyledProfileLine>
                  </StyledProfileExpandedDetails>
                ) : null}
              </StyledProfileContainer>
            );
          })
        ) : (
          emptyState()
        )
      ) : (
        emptyState()
      )}
    </StyledInputFormSection>
  );
};

export default Profiles;
