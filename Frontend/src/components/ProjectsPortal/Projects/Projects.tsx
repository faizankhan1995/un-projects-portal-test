import React, { Fragment, useState, useEffect } from "react";
import { Route, useRouteMatch, useHistory } from "react-router-dom";
import {
  Table,
  Button,
  Tooltip,
  Typography,
  message,
  Popconfirm,
  Select,
  Input,
  DatePicker,
} from "antd";
import { ProjectModel } from "../../../models";
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FilterTwoTone,
} from "@ant-design/icons";
import OptionsBar from "../OptionsBar";
import * as ProjectsApiHandler from "../../../Api/Project";
import { FormatDateAsString } from "../../Common/stringUtils";
import { PaginatedResponse } from "../../../models/PaginatedResponse";
import { FormikHelpers } from "formik";
import { CompareElementsById } from "../../Common/stringUtils";
import { ApprovalStatus } from "../../../models/Enumerations";
import ProjectForm from "./ProjectForm";

import { HandleApiError } from "../../../common/errorUtils";
import ContentModal from "../../Common/ContentModal";
import DrawerOptionsBar from "../DrawerOptionsBar";

export const DEFAULT_DELAY_INTERVAL_MS = 1000;

const { Text } = Typography;
const { Option } = Select;

interface IProjectsFilter {
  startDate?: string;
  endDate?: string;
  status?: ApprovalStatus;
}

interface IProjectState {
  data: ProjectModel[];
  pagination: {
    currentPage: number;
    pageSize: number;
    total?: number;
  };
  isLoading: boolean;
  search: {
    searchText: string;
    searchBy: string;
  };

  selectedProjectIds: number[];
}

const initailState: IProjectState = {
  data: [],
  pagination: {
    currentPage: 1,
    pageSize: 10,
  },
  isLoading: true,
  search: {
    searchText: "",
    searchBy: "Title",
  },
  selectedProjectIds: [],
};

const Project: React.FC = () => {
  let { path } = useRouteMatch();
  const history = useHistory();
  const [state, setState] = useState<IProjectState>(initailState);

  const [projectFilters, setProjectFilters] = useState<IProjectsFilter>({});

  const [showFilters, setShowFilters] = useState<boolean>(false);

  async function onFormSubmit(
    project: ProjectModel,
    formOptions: FormikHelpers<ProjectModel>
  ) {
    if (state.selectedProjectIds[0]) {
      // Edit Existing Project
      try {
        project.id = state.selectedProjectIds[0];
        var updatedProject = await ProjectsApiHandler.UpdateProject(project);
        message.success("Project Updated!");
        let otherProjects = state.data.filter(
          (c) => c.id !== updatedProject.id
        );
        setState({
          ...state,
          data: [...otherProjects, updatedProject].sort(CompareElementsById),
        });
      } catch (err) {
        message.error(`Failed to update Project! ${err.title}`);
      }
    } else {
      // Add New Project
      try {
        var res = await ProjectsApiHandler.AddProject(project);
        message.success("Project Added!");
        setState({
          ...state,
          data: [res, ...state.data].sort(CompareElementsById),
        });
      } catch (err) {
        message.error(`Failed to add Project! ${err.title}`);
      }
    }

    formOptions.setSubmitting(false);
    // If Success
    history.goBack();
  }

  function getFilterQuery() {
    let query = `pageSize=${state.pagination.pageSize}&pageNo=${state.pagination.currentPage}`;
    if (projectFilters.startDate) {
      query += `&StartDate=${projectFilters.startDate}`;
    }
    if (projectFilters.endDate) {
      query += `&EndDate=${projectFilters.endDate}`;
    }

    if (projectFilters.status) {
      query += `&ApprovalStatus=${projectFilters.status}`;
    }
    if (state.search.searchText) {
      if (state.search.searchBy) {
        query += `&${state.search.searchBy}=${state.search.searchText}`;
      }
    }
    return query;
  }

  useEffect(() => {
    setState({
      ...state,
      isLoading: true,
    });

    const timer = setTimeout(() => {
      let query: string = getFilterQuery();

      fetchDataAsync(query);
    }, DEFAULT_DELAY_INTERVAL_MS);

    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    state.pagination.pageSize,
    state.pagination.currentPage,
    state.search,
    projectFilters,
  ]);

  async function fetchDataAsync(query: string) {
    try {
      let paginatedResponse: PaginatedResponse<ProjectModel>;

      paginatedResponse = await ProjectsApiHandler.GetAllProjects(query);
      setState({
        ...state,
        isLoading: false,
        data: paginatedResponse.data
          ? paginatedResponse.data.sort(CompareElementsById)
          : [],
        pagination: {
          currentPage: paginatedResponse.pagination?.currentPage!,
          pageSize: paginatedResponse.pagination?.pageSize!,
          total: paginatedResponse.pagination?.total,
        },
      });
    } catch (err) {
      setState({
        ...state,
        isLoading: false,
      });
      HandleApiError(err);
    }
  }

  async function deleteSelectedProjects() {
    let failedCount = 0;
    let deletedProjectIds: number[] = [];

    await Promise.all(
      state.selectedProjectIds.map(async (ProjectId: number) => {
        try {
          await ProjectsApiHandler.DeleteProject(ProjectId);
          deletedProjectIds.push(ProjectId);
        } catch (err) {
          failedCount++;
        }
      })
    );

    message.success(
      `Successfully Deleted ${deletedProjectIds.length} Project(s)`
    );
    message.error(`Failed to Delete ${failedCount} Project(s)`);

    let newData = state.data.filter((c) => !deletedProjectIds.includes(c.id));
    setState({
      ...state,
      data: newData,
      selectedProjectIds: [],
    });
  }

  function onStartDateChange(date: any, dateString: any) {
    setProjectFilters({
      ...projectFilters,
      startDate: dateString,
    });
  }

  function onEndDateChange(date: any, dateString: any) {
    setProjectFilters({
      ...projectFilters,
      endDate: dateString,
    });
  }

  function onSearchTextChange(event: any) {
    let searchedValue = event.currentTarget.value;
    if (searchedValue !== state.search.searchText) {
      setState({
        ...state,
        search: {
          ...state.search,
          searchText: event.currentTarget.value,
        },
      });
    }
  }

  function handleTableChange(pagination: any, filters: any, sorter: any) {
    setState({
      ...state,
      pagination: {
        currentPage: pagination.current,
        pageSize: pagination.pageSize,
      },
    });
  }

  const OptionBarLeftOption = (
    <Fragment>
      <Button
        disabled={state.selectedProjectIds.length > 0}
        icon={<PlusOutlined />}
        className="options-bar-left-options-button"
        onClick={() => history.push(`${path}/add`)}
      />

      <Tooltip title="Edit Project" placement="bottom">
        <Button
          disabled={
            state.selectedProjectIds.length <= 0 ||
            state.selectedProjectIds.length > 1
          }
          icon={<EditOutlined />}
          className="options-bar-left-options-button"
          onClick={() =>
            history.push(`${path}/edit/${state.selectedProjectIds[0]}`)
          }
        />
      </Tooltip>

      <Tooltip title="Delete Project" placement="bottom">
        <Popconfirm
          title={`Are you sure delete selected Project(s)?`}
          onConfirm={deleteSelectedProjects}
          okText="Yes"
          cancelText="No"
        >
          <Button
            icon={<DeleteOutlined />}
            disabled={state.selectedProjectIds.length <= 0}
            danger={true}
            className="options-bar-left-options-button"
          />
        </Popconfirm>
      </Tooltip>
    </Fragment>
  );

  const OptionsBarMiddleOption = (
    <div
      style={{
        width: "100%",
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      <Select
        defaultValue="Title"
        style={{ width: 120 }}
        onChange={(value) => {
          setState({
            ...state,
            search: {
              ...state.search,
              searchBy: value,
            },
          });
        }}
      >
        <Option value="Title">Title</Option>
        <Option value="Id">Id</Option>
      </Select>

      <Input.Search
        style={{ width: 400 }}
        enterButton
        onChange={onSearchTextChange}
      />
    </div>
  );

  const OptionBarRightOption = (
    <Tooltip title="Show Filters" placement="bottom">
      <Button icon={<FilterTwoTone />} onClick={toogleFiltersVisibility}>
        Filters
      </Button>
    </Tooltip>
  );

  function toogleFiltersVisibility() {
    setShowFilters(!showFilters);
  }

  return (
    <Fragment>
      <OptionsBar
        left={OptionBarLeftOption}
        middle={OptionsBarMiddleOption}
        right={OptionBarRightOption}
      />

      <DrawerOptionsBar
        isVisible={showFilters}
        toogleVisibility={toogleFiltersVisibility}
      >
        <Select
          style={{ width: 200 }}
          allowClear
          placeholder="Select Project Status"
          onChange={(val: number) => {
            setProjectFilters({
              ...projectFilters,
              status: val,
            });
          }}
        >
          {Object.values(ApprovalStatus).map((val, index: number) => {
            return typeof val === "number" ? (
              <Option key={index} value={val}>
                {ApprovalStatus[val]}
              </Option>
            ) : null;
          })}
        </Select>

        <DatePicker
          placeholder="Joining Start Date"
          format={"MM/DD/YYYY"}
          onChange={onStartDateChange}
        />

        <DatePicker
          placeholder="Joining End Date"
          format={"MM/DD/YYYY"}
          onChange={onEndDateChange}
        />
      </DrawerOptionsBar>

      <Table<ProjectModel>
        dataSource={state.data}
        bordered
        onChange={handleTableChange}
        loading={state.isLoading}
        rowKey={(d) => d.id}
        rowSelection={{
          onChange: (selectedRowKeys: any) =>
            setState({ ...state, selectedProjectIds: selectedRowKeys }),
        }}
        pagination={{
          current: state.pagination.currentPage,
          pageSize: state.pagination.pageSize,
          total: state.pagination.total,
          pageSizeOptions: ["5", "10", "25", "50", "100", "250"],
          showSizeChanger: true,
          showTotal: (total) =>
            `${
              (state.pagination.currentPage - 1) * state.pagination.pageSize + 1
            } - ${
              (state.pagination.currentPage - 1) * state.pagination.pageSize +
              state.data.length
            } /  ${total}`,
          position: ["bottomCenter"],
        }}
      >
        <Table.Column key="id" title="Id" align="center" dataIndex="id" />

        <Table.Column
          key="title"
          title="Title"
          align="center"
          dataIndex="title"
        />

        <Table.Column
          key="ApprovalStatus"
          title="Status"
          align="center"
          render={(text, Project: ProjectModel) => (
            <Text> {ApprovalStatus[Project.approvalStatus]}</Text>
          )}
        />

        <Table.Column
          key="date"
          title="Date"
          align="center"
          render={(text, row: ProjectModel) => (
            <Text> {FormatDateAsString(row.endDate)} </Text>
          )}
        />
      </Table>

      <Route exact path={`${path}/add`}>
        <ContentModal formTitle="Edit Project">
          <ProjectForm formTitle="Add Project" onSubmit={onFormSubmit} />
        </ContentModal>
      </Route>

      <Route exact path={`${path}/edit/${state.selectedProjectIds[0]}`}>
        <ContentModal formTitle="Edit Project">
          <ProjectForm
            formTitle="Edit Project"
            project={state.data.find(
              (c) => c.id === state.selectedProjectIds[0]
            )}
            onSubmit={onFormSubmit}
          />
        </ContentModal>
      </Route>
    </Fragment>
  );
};
export default Project;
