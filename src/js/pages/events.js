import { renderCards } from "../helpers/renderCards.js";
import { endpoints } from "../services/api";
import controller from "../services/request.js";

document.addEventListener("DOMContentLoaded", async () => {
  const apiResponse = await controller.getAll(endpoints.events);
  renderCards(apiResponse.data);
});
