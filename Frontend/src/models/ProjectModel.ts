import { ApprovalStatus } from "./Enumerations";

export interface ProjectModel {
  id: number;
  title: string;
  paasCode: string;
  approvalStatus: ApprovalStatus;
  fund: string;
  pagValue: number;
  startDate: string;
  endDate: string;
  country: string;
  leadOrgUnit: string;
  themes: string;
  donors: string;
  totalExpenditure: number;
  totalContribution: number;
  totalPsc: number;
}
