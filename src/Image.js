import React, { useState } from "react";
import { Form, Button, Input } from "element-react";
import { PhotoPicker } from "aws-amplify-react";
import { Storage, Auth, API, graphqlOperation } from "aws-amplify";
import { createImage } from "./graphql/mutations";
import { useHistory } from "react-router-dom";
import aws_exports from "./aws-exports";

function Image() {
  const [description, setDescription] = useState("");
  const [imagePreview, setImagePreview] = useState("");
  const [imageFile, setImageFile] = useState("");
  const [isUploading, setIsUploading] = useState(false);
  const history = useHistory();
  async function handleAddImage() {
    try {
      setIsUploading(true);
      const visibility = "public";
      const fileName = `/${visibility}/${Date.now()}-${imageFile.name}`;
      const uploadedFile = await Storage.put(fileName, imageFile.file, {
        contentType: imageFile.type
      });

      //   put a reference to that image in my database using appSync
      const file = {
        key: uploadedFile.key,
        bucket: aws_exports.aws_user_files_s3_bucket,
        region: aws_exports.aws_project_region
      };

      const input = {
        description: description,
        file,
        flagged: false
      };

      const result = await API.graphql(
        graphqlOperation(createImage, { input })
      );

      setIsUploading(false);
      setDescription("");
      setImageFile("");

      history.push("/");
    } catch (err) {
      console.log("Error adding image", err);
    }
  }

  return (
    <div className="flax-center">
      <div>
        <Form className="image-header">
          <Form.Item label="add a new image">
            <Input
              type="text"
              icon="information"
              placeholder="Description"
              onChange={description => setDescription(description)}
            />
          </Form.Item>
          {imagePreview && (
            <img className="image-preview" src={imagePreview}></img>
          )}
          <PhotoPicker
            preview="hidden"
            onLoad={url => setImagePreview(url)}
            onPick={file => setImageFile(file)}
            theme={{
              formContainer: {
                margin: 0,
                padding: "0.8em"
              },
              formSection: {
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center"
              },
              sectionHeader: {
                padding: "0.2em",
                color: "var(--darkAmazonOrange)"
              },
              sectionBody: {
                margin: 0,
                width: "250px"
              }
            }}
          />
          <Form.Item>
            <Button
              disabled={!imageFile || isUploading}
              type="primary"
              onClick={handleAddImage}
              loading={isUploading}
            >
              {isUploading ? "...Is uploading" : "Add Image"}
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
}

export default Image;
