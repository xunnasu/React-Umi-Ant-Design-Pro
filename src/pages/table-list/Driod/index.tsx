import { removeRule } from "@/services/ant-design-pro/api";
import type { ActionType, ProColumns } from "@ant-design/pro-components";
import {
  FooterToolbar,
  PageContainer,
  ProDescriptions,
  ProTable,
} from "@ant-design/pro-components";
import {
  FormattedMessage,
  useIntl,
  useModel,
  useParams,
  useRequest,
} from "@umijs/max";
import { Button, Drawer, message, Tag } from "antd";
import dayjs from "dayjs";
import React, { useCallback, useEffect, useRef, useState } from "react";
// import CreateForm from "./components/CreateForm";

const mockEpisodes = {
  errno: 0,
  errmsg: "执行成功",
  data: {
    list: [
      {
        episode_id: "9c1b7a2e-6a6f-4b2d-9e8b-3f4c8e9a1d21",
        dataset_id: "550e8400-e29b-41d4-a716-446655440000",
        raw_file_path:
          "/data/datasets/open_manipulation/v1.2.0/episodes/episode_000128.tfrecord",
        video_path:
          "/data/datasets/open_manipulation/v1.2.0/videos/episode_000128.mp4",
        instructions: {
          language: "en",
          task_name: "pick_and_place",
          steps: [
            "Pick up the red cube from the table",
            "Place the cube into the blue container",
          ],
        },
        is_success: true,
        robot_model: "Franka Emika Panda",
        control_frequency: 30,
        total_frames: 945,
        gripper: "Parallel Gripper",
        extra_metadata: {
          scene_id: "tabletop_scene_03",
          lighting: "indoor_lab",
          object_set: ["red_cube", "blue_container"],
          operator: "teleoperation",
          failure_reason: null,
        },
        created_at: "2025-11-02T14:20:35Z",
        updated_at: "2025-11-02T14:25:10Z",
      },
      {
        episode_id: "a3d4e5f6-7a8b-9c0d-1e2f-3a4b5c6d7e8f",
        dataset_id: "550e8400-e29b-41d4-a716-446655440000",
        raw_file_path:
          "/data/datasets/open_manipulation/v1.2.0/episodes/episode_000129.tfrecord",
        video_path:
          "/data/datasets/open_manipulation/v1.2.0/videos/episode_000129.mp4",
        instructions: {
          language: "en",
          task_name: "push_object",
          steps: ["Push the blue cylinder to the edge of the table"],
        },
        is_success: false,
        robot_model: "Franka Emika Panda",
        control_frequency: 30,
        total_frames: 720,
        gripper: "Parallel Gripper",
        extra_metadata: {
          scene_id: "tabletop_scene_01",
          lighting: "indoor_lab",
          object_set: ["blue_cylinder"],
          operator: "teleoperation",
          failure_reason: "Object fell off the table",
        },
        created_at: "2025-11-03T09:15:22Z",
        updated_at: "2025-11-03T09:20:18Z",
      },
      {
        episode_id: "b7c8d9e0-1f2a-3b4c-5d6e-7f8a9b0c1d2e",
        dataset_id: "550e8400-e29b-41d4-a716-446655440000",
        raw_file_path:
          "/data/datasets/open_manipulation/v1.2.0/episodes/episode_000130.tfrecord",
        video_path:
          "/data/datasets/open_manipulation/v1.2.0/videos/episode_000130.mp4",
        instructions: {
          language: "en",
          task_name: "stack_objects",
          steps: [
            "Stack the red cube on top of the blue cube",
            "Stack the green cube on top of the red cube",
          ],
        },
        is_success: true,
        robot_model: "Franka Emika Panda",
        control_frequency: 30,
        total_frames: 1200,
        gripper: "Parallel Gripper",
        extra_metadata: {
          scene_id: "tabletop_scene_05",
          lighting: "indoor_lab",
          object_set: ["red_cube", "blue_cube", "green_cube"],
          operator: "teleoperation",
          failure_reason: null,
        },
        created_at: "2025-11-04T16:45:00Z",
        updated_at: "2025-11-04T16:50:30Z",
      },
    ],
    total: 3,
  },
};

const mockRequest = async (params: any) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: mockEpisodes.data.list,
        total: mockEpisodes.data.total,
        success: true,
      });
    }, 500);
  });
};

const TableList: React.FC = () => {
  const actionRef = useRef<ActionType | null>(null);
  const [showDetail, setShowDetail] = useState<boolean>(false);
  const [currentRow, setCurrentRow] = useState<any>();
  const [selectedRowsState, setSelectedRows] = useState<any[]>([]);
  const intl = useIntl();
  const [messageApi, contextHolder] = message.useMessage();
  const { run: delRun, loading } = useRequest(removeRule, {
    manual: true,
    onSuccess: () => {
      setSelectedRows([]);
      actionRef.current?.reloadAndRest?.();
      messageApi.success("Deleted successfully and will refresh soon");
    },
    onError: () => {
      messageApi.error("Delete failed, please try again");
    },
  });

  const params = useParams<{ datasetId?: string }>();
  const { initialState } = useModel("@@initialState");
  const datasetId = params.datasetId || initialState?.selectedDatasetId;
  // const selectedDataset = initialState?.datasets?.find((d: any) => d.dataset_id === params.datasetId);

  const selectedDataset = initialState?.datasets?.find(
    (d: any) => d.dataset_id === datasetId
  );
  const headerTitle = selectedDataset
    ? `${selectedDataset.dataset_name} ${selectedDataset.dataset_version}`
    : intl.formatMessage({ id: "pages.searchTable.title" });
  // const headerTitle = selectedDataset
  //   ? `${selectedDataset.dataset_name} ${selectedDataset.dataset_version}`
  //   : intl.formatMessage({
  //       id: 'pages.searchTable.title',
  //       defaultMessage: 'Enquiry form',
  //     });
  useEffect(() => {
    actionRef.current?.reload();
  }, [datasetId]);
  const columns: ProColumns<any>[] = [
    {
      title: "ID",
      dataIndex: "dataset_id",
      copyable: true, // 开启复制
      fixed: "left",
      //  ellipsis: true, //省略
      align: "center",
    },
    {
      title: "任务名称",
      dataIndex: ["instructions", "task_name"],
      align: "center",
    },
    {
      title: "任务描述",
      dataIndex: ["instructions", "steps"],
      align: "center",
      render: (_, record) => {
        const steps = record.instructions?.steps;
        if (!steps || !Array.isArray(steps)) return "-";
        return steps.map((step, index) => (
          <div key={index}>
            {index + 1}. {step}
          </div>
        ));
      },
    },
    // {
    //   title: 'Status',
    //   dataIndex: 'is_success',
    //   width: 100,
    //   render: (_,isSuccess: boolean) => {
    //     return (
    //       <Tag color={isSuccess ? 'green' : 'red'}>
    //         {isSuccess ? 'Success' : 'Failed'}
    //       </Tag>
    //     );
    //   },
    // },
    {
      title: "机器人类型",
      dataIndex: "robot_model",
      align: "center",
    },
    {
      title: "夹爪类型",
      dataIndex: "gripper",
      align: "center",
      valueType: "select",
      valueEnum: {
        "Parallel Gripper": "Parallel Gripper",
        "Serial Gripper": "Serial Gripper",
      },
    },
    {
      title: "是否成功",
      dataIndex: "is_success",
      align: "center",
      render: (_, isSuccess: boolean) => {
        return (
          <Tag color={isSuccess ? "green" : "red"}>
            {isSuccess ? "Success" : "Failed"}
          </Tag>
        );
      },
      valueType: "select",
      valueEnum: {
        true: "Success",
        false: "Failed",
      },
    },
    {
      title: "采集频率",
      dataIndex: "control_frequency",
      align: "center",
      render: (_, freq: { control_frequency?: number }) => {
        console.log("freq", freq);
        return `${freq?.control_frequency} Hz`;
      },
    },
    {
      title: "总帧数",
      dataIndex: "total_frames",
      align: "center",
    },
    {
      title: "创建时间",
      dataIndex: "created_at",
      align: "center",
      render: (_, record) =>
        dayjs(record.created_at).format("YYYY-MM-DD HH:mm:ss"),
      search: {
        transform: (value) => {
          return value ? dayjs(value).format("YYYY-MM-DD HH:mm:ss") : "";
        },
      },
      valueType: "dateTime",
    },
    {
      title: "更新时间",
      dataIndex: "updated_at",
      align: "center",
      render: (_, record) =>
        dayjs(record.updated_at).format("YYYY-MM-DD HH:mm:ss"),
      search: {
        transform: (value) => {
          return value ? dayjs(value).format("YYYY-MM-DD HH:mm:ss") : "";
        },
      },
      valueType: "dateTime",
    },
    {
      title: "操作",
      align: "center",
      fixed: "right",
      hideInSearch:true,
      render: (_, record) => {
        return (
          <div>
            <Button type="link" size="small">
              跳转foxglove
            </Button>
          </div>
        );
      },
    },
  ];
  /**
   *  Delete node
   * @zh-CN 删除节点
   * @param selectedRows
   */
  const handleRemove = useCallback(
    async (selectedRows: any[]) => {
      if (!selectedRows?.length) {
        messageApi.warning("请选择删除项");
        return;
      }
      await delRun({
        data: {
          key: selectedRows.map((row) => row.episode_id),
        },
      });
    },
    [delRun, messageApi.warning]
  );

  return (
    <PageContainer>
      {contextHolder}
      <ProTable<any, any>
        headerTitle={headerTitle}
        actionRef={actionRef}
        rowKey="episode_id"
        search={{
          labelWidth: 80,
           defaultCollapsed: false,
        }}
        // toolBarRender={() => [
        //   <CreateForm key="create" reload={actionRef.current?.reload} />,
        // ]}
        scroll={{ x: 1500 }} //左侧固定需要配合scroll使用 'max-content'
        request={mockRequest}
        columns={columns}
       
       
        // rowSelection={{
        //   onChange: (_, selectedRows) => {
        //     setSelectedRows(selectedRows);
        //   },
        // }}
      />
      {selectedRowsState?.length > 0 && (
        <FooterToolbar
          extra={
            <div>
              <FormattedMessage
                id="pages.searchTable.chosen"
                defaultMessage="Chosen"
              />{" "}
              <a style={{ fontWeight: 600 }}>{selectedRowsState.length}</a>{" "}
              <FormattedMessage
                id="pages.searchTable.item"
                defaultMessage="项"
              />
              &nbsp;&nbsp;
              <span>
                <FormattedMessage
                  id="pages.searchTable.totalServiceCalls"
                  defaultMessage="Total number of service calls"
                />{" "}
                {selectedRowsState.reduce(
                  (pre, item) => pre + (item.callNo ?? 0),
                  0
                )}{" "}
                <FormattedMessage
                  id="pages.searchTable.tenThousand"
                  defaultMessage="万"
                />
              </span>
            </div>
          }
        >
          <Button
            loading={loading}
            onClick={() => {
              handleRemove(selectedRowsState);
            }}
          >
            <FormattedMessage
              id="pages.searchTable.batchDeletion"
              defaultMessage="Batch deletion"
            />
          </Button>
          <Button type="primary">
            <FormattedMessage
              id="pages.searchTable.batchApproval"
              defaultMessage="Batch approval"
            />
          </Button>
        </FooterToolbar>
      )}

      <Drawer
        width={600}
        open={showDetail}
        onClose={() => {
          setCurrentRow(undefined);
          setShowDetail(false);
        }}
        closable={false}
      >
        {currentRow?.episode_id && (
          <ProDescriptions<any>
            column={2}
            title={currentRow?.episode_id}
            request={async () => ({
              data: currentRow || {},
            })}
            params={{
              id: currentRow?.episode_id,
            }}
            columns={columns}
          />
        )}
      </Drawer>
    </PageContainer>
  );
};

export default TableList;
