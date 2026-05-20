import API from "./axios";

export const getLeads = (params?: any) =>
  API.get("/leads", { params });

export const createLead = (data: any) =>
  API.post("/leads", data);

export const updateLead = (id: string, data: any) =>
  API.put(`/leads/${id}`, data);

export const deleteLead = (id: string) =>
  API.delete(`/leads/${id}`);