import React, { useState, useEffect } from "react";
import { Card, Switch } from "element-react";
import { useHistory } from "react-router-dom";
import { S3Image } from "aws-amplify-react";
import { API, graphqlOperation } from "aws-amplify";
import { updateImage } from "../graphql/mutations";
export const listImages = /* GraphQL */ `
  query ListImages(
    $filter: ModelImageFilterInput
    $limit: Int
    $nextToken: String
  ) {
    listImages(filter: $filter, limit: $limit, nextToken: $nextToken) {
      items {
        id
        description
        file {
          bucket
          region
          key
        }
        flagged
        tagged
        createdAt
        updatedAt
      }
      nextToken
    }
  }
`;
function HomePage() {
  const [images, setImages] = useState(null);
  const history = useHistory();

  useEffect(() => {
    getImages();
  }, []);
  async function getImages() {
    const result = await API.graphql(graphqlOperation(listImages));
    setImages(result.data.listImages.items);
  }

  async function handleToggle(item) {
    const flagState = item.flagged ? false : true;
    const input = {
      id: item.id,
      flagged: flagState
    };
    await API.graphql(graphqlOperation(updateImage, { input }));
    getImages();
  }

  return (
    <div className="card-list">
      {images &&
        images.map(item => {
          return (
            <div className="card-container">
              <Card bodyStyle={{ padding: 0, minWidth: "200px" }}>
                <S3Image
                  imgKey={item.file.key}
                  theme={{ photoImg: { maxWidth: "100%", maxHeight: "100%" } }}
                />
                <div className="card-body">
                  <h3 className="m-0">{item.description}</h3>
                  <Switch
                    onValue={item.flagged}
                    onText={"👍"}
                    offText={"👎"}
                    onChange={() => handleToggle(item)}
                  />
                </div>
              </Card>
            </div>
          );
        })}
    </div>
  );
}

export default HomePage;
