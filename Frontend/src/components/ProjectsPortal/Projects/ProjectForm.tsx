import React from "react";
import {
  Form,
  FormItem,
  Input,
  SubmitButton,
  Select,
  DatePicker,
} from "formik-antd";
import { Formik } from "formik";
import * as yup from "yup";
import { ProjectModel } from "../../../models";
import { ApprovalStatus } from "../../../models/Enumerations";

const { Option } = Select;
interface ProjectFormProps {
  formTitle: string;
  project?: ProjectModel;
  onSubmit: (values: any, formOptions: any) => any;
}

const ProjectForm: React.FC<ProjectFormProps> = (props: ProjectFormProps) => {
  const validationSchema = yup.object({
    title: yup.string().required("Title Required!"),
    passCode: yup.string().required("PassCode Required!"),
    approvalStatus: yup.number().required("Status Required!").oneOf([1, 2]),
    fund: yup.string().required("Phone Required!"),
    country: yup.string(),
  });
  return (
    <Formik
      initialValues={{ ...props.project }}
      validationSchema={validationSchema}
      onSubmit={props.onSubmit}
      enableReinitialize
    >
      {() => (
        <Form className="form-input" style={{ width: 600 }}>
          <FormItem name="title" label="Title" required>
            <Input name="title" placeholder="Title" />
          </FormItem>

          <FormItem name="passCode" label="Pass Code" required>
            <Input name="passCode" placeholder="Pass Code" />
          </FormItem>

          <FormItem name="fund" label="Fund" required>
            <Input name="fund" placeholder="Fund" />
          </FormItem>

          <FormItem name="country" label="Country">
            <Input name="country" placeholder="Country" />
          </FormItem>

          <FormItem name="approvalStatus" label="Status" required>
            <Select
              name="approvalStatus"
              placeholder="Select Status"
              allowClear
            >
              {Object.values(ApprovalStatus).map((val, index: number) => {
                return typeof val === "number" ? (
                  <Option key={index} value={val}>
                    {ApprovalStatus[val]}
                  </Option>
                ) : null;
              })}
            </Select>
          </FormItem>

          <FormItem name="startDate" label="Start Date">
            <DatePicker name="startDate" />
          </FormItem>

          <FormItem name="endDate" label="End Date">
            <DatePicker name="endDate" />
          </FormItem>

          <SubmitButton className="input-form-submit-button">
            {props.project ? "Update" : "Submit"}
          </SubmitButton>
        </Form>
      )}
    </Formik>
  );
};
export default ProjectForm;
