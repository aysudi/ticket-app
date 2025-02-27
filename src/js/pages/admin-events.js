import { renderAdminEvents } from "../helpers/renderAdminEvents.js";
import { endpoints } from "../services/api.js";
import controller from "../services/request.js";

document.addEventListener("DOMContentLoaded", async () => {
  console.log("hello");
  const apiResponse = await controller.getAll(endpoints.events);
  renderAdminEvents(apiResponse.data);
});
