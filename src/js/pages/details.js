import { renderDetails } from "../helpers/renderDetails.js";
import { endpoints } from "../services/api.js";
import controller from "../services/request.js";

document.addEventListener("DOMContentLoaded", async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const detailID = urlParams.get("id");
  const apiResponse = await controller.getAll(endpoints.events);
  const validEvent = apiResponse.data.find((x) => x.id == detailID);
  renderDetails(validEvent);
});
