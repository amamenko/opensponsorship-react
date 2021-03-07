import React from "react";
import {
  Form,
  FormGroup,
  FormFeedback,
  Label,
  Input,
  FormText,
  Button,
} from "reactstrap";
import StyledHeader from "./styled/StyledHeader";
import StyledInputFormSection from "./styled/StyledInputFormSection";
import { Link, Redirect } from "react-router-dom";
import LZString from "lz-string";
import imageCompression from "browser-image-compression";

const About = (props) => {
  const {
    description,
    changeDescription,
    locationName,
    changeLocationName,
    team,
    changeTeam,
    profileImageName,
    changeProfileImageName,
    changeProfileImageBlob,
    changeProfileImageCompressedString,
    profileImageType,
    changeProfileImageType,
    firstSectionDone,
    secondSectionDone,
  } = props;

  const redirectToBasicInfo = () => {
    if (!firstSectionDone) {
      return <Redirect to="/" />;
    }
  };

  const handleFileUpload = async (e) => {
    const name = e.target.value;

    changeProfileImageName(name);

    const last4 = name.trim().slice(-4);
    const splitArr = last4.split(".");

    const imgType = splitArr[splitArr.length - 1].toLowerCase();

    changeProfileImageType(imgType);

    if (["jpg", "png", "jpeg"].includes(imgType)) {
      const imageFile = e.target.files[0];

      const options = {
        maxSizeMB: 0.3,
        maxWidthOrHeight: 300,
        useWebWorker: true,
      };

      try {
        const compressedFile = await imageCompression(imageFile, options);

        changeProfileImageBlob(compressedFile);

        const reader = new FileReader();
        reader.readAsDataURL(compressedFile);

        reader.onloadend = async () => {
          const base64data = reader.result;

          const compressedBase64data = LZString.compressToEncodedURIComponent(
            base64data
          );

          await changeProfileImageCompressedString(compressedBase64data);
        };
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <StyledInputFormSection>
      {redirectToBasicInfo()}
      <StyledHeader>About</StyledHeader>
      <Form>
        <FormGroup>
          <Label for="exampleText">
            Tell us a little bit about yourself (Max. 150 characters).
          </Label>
          <Input
            value={description}
            type="textarea"
            name="text"
            id="exampleText"
            maxLength={150}
            rows={3}
            onChange={(e) => changeDescription(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="locationNameName">Location Name</Label>
          <Input
            value={locationName}
            type="text"
            name="text"
            id="locationNameName"
            placeholder="E.g. New York, NY"
            onChange={(e) => changeLocationName(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="teamName">Team Name</Label>
          <Input
            value={team}
            type="text"
            name="text"
            id="teamName"
            placeholder="E.g. New York Giants"
            onChange={(e) => changeTeam(e.target.value)}
          />
        </FormGroup>
        <FormGroup>
          <Label for="profileImageName">Profile Image (optional)</Label>
          <Input
            type="file"
            name="file"
            id="profileImageName"
            invalid={Boolean(
              profileImageName &&
                !["jpg", "png", "jpeg"].includes(profileImageType)
            )}
            onChange={handleFileUpload}
          />
          <FormFeedback>
            Oops! Only PNG or JPG image files are allowed.
          </FormFeedback>
          <FormText color="muted">Image must be of PNG or JPG type.</FormText>
        </FormGroup>
        <Button color="secondary" size="lg" block>
          <Link to={"/"}>Back to Basic Info</Link>
        </Button>
        <Button disabled={!secondSectionDone} color="primary" size="lg" block>
          <Link
            to={"/summary"}
            className={!secondSectionDone ? "disabled_link" : ""}
          >
            Continue to Summary
          </Link>
        </Button>
      </Form>
    </StyledInputFormSection>
  );
};

export default About;
