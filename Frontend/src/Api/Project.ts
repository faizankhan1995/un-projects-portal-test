import { ProjectModel } from "../models";
import { ApiResponseError } from "../models/ApiResponseError";
import { PaginatedResponse } from "../models/PaginatedResponse";
import axios from "axios";

export async function GetAllProjects(
  urlQuery?: string
): Promise<PaginatedResponse<ProjectModel>> {
  const endpoint = `${process.env.REACT_APP_ServiceEndpoint}/Projects?${urlQuery}`;
  let paginatedResult: PaginatedResponse<ProjectModel> = {};
  try {
    let response = await axios.get(endpoint);
    let pagination = response.headers["x-pagination"];
    paginatedResult.data = response.data;
    paginatedResult.pagination = JSON.parse(pagination);
    return paginatedResult;
  } catch (error) {
    throw new ApiResponseError(error.response.data);
  }
}

export async function GetProject(candidateId: number): Promise<ProjectModel> {
  const endpoint = `${process.env.REACT_APP_ServiceEndpoint}/Projects/${candidateId}`;
  try {
    let response = await axios.get(endpoint);
    return response.data;
  } catch (error) {
    throw new ApiResponseError(error.response.data);
  }
}

export async function AddProject(
  candidate: ProjectModel
): Promise<ProjectModel> {
  const endpoint = `${process.env.REACT_APP_ServiceEndpoint}/Projects`;
  try {
    var res = await axios.post(endpoint, candidate);
    let createProject = res.data;
    return createProject;
  } catch (error) {
    throw new ApiResponseError(error.response.data);
  }
}

export async function UpdateProject(
  candidate: ProjectModel
): Promise<ProjectModel> {
  const endpoint = `${process.env.REACT_APP_ServiceEndpoint}/Projects/${candidate.id}`;
  try {
    var res = await axios.put(endpoint, candidate);
    return res.data;
  } catch (error) {
    throw new ApiResponseError(error.response.data);
  }
}

export async function DeleteProject(candidateId: number) {
  const endpoint = `${process.env.REACT_APP_ServiceEndpoint}/Projects/${candidateId}`;
  try {
    await axios.delete(endpoint);
  } catch (error) {
    throw new ApiResponseError(error.response.data);
  }
}
