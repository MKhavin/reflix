import React, { useEffect, useState } from "react";
import giphyAPIManager from "./util/GiphyAPIManager";

export default function RentSuccessfulMessage({ filmTitle }) {
  const [gifURL, setGifURL] = useState("");

  useEffect(() => {
    giphyAPIManager.getGifByText(filmTitle).then((result) => setGifURL(result));
  }, []);

  return (
    <>
      <p className="modal-message">
        Rented <strong>"{filmTitle}"</strong> Sucessfully!
      </p>
      <iframe src={gifURL} title="film-gif" />
    </>
  );
}
