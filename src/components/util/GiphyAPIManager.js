import { GIPHY_API_KEY } from "./Constants";

class GiphyAPIManager {
  #resultLimit = 1;

  async getGifByText(text) {
    const apiCallResult = await this.#getGiphyAPICall(text);
    const responseData = await apiCallResult.json();

    return this.#handleAPIResult(responseData);
  }

  async #getGiphyAPICall(text) {
    return fetch(
      `https://api.giphy.com/v1/gifs/search?api_key=${GIPHY_API_KEY}&q=${text}&limit=${
        this.#resultLimit
      }`
    );
  }

  #handleAPIResult(result) {
    const data = result.data[0];
    const gifURL = data["embed_url"];

    return gifURL;
  }
}

const apiManager = new GiphyAPIManager();

export default apiManager;
