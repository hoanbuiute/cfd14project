import axiosInstance from "../utils/axiosInstance";




export const teamsService = {
    getTeams(query = "") {
      return axiosInstance.get(`/teams${query}`);
    },
    getTeamBySlug(slug = "") {
      return axiosInstance.get(`/teams${slug}`);
    },
  };