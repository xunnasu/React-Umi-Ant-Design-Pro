// const express = require("express");
// const cors = require("cors");

// const app = express();
// const PORT = 3001;
// app.use(cors());

// app.get("/api/datasets", (req, res) => {
//   const datasets = {
//     errno: 0,
//     errmsg: "",
//     data: {
//       list: [
//         {
//           dataset_id: "550e8400-e29b-41d4-a716-446655440000",
//           dataset_name: "Open Manipulation Dataset",
//           dataset_version: "v1.2.0",
//           description:
//             "用于具身智能与机器人操作学习的多模态数据集，包含RGB、深度、关节状态和动作轨迹。",
//           robot_model: "Franka Emika Panda",
//           robot_morphology: "7-DOF 单臂机械臂，固定基座",
//           gripper: "Parallel Gripper",
//           rgb_cams: 4,
//           depth_cams: 2,
//           wrist_cams: 1,
//           calibration_data: {
//             camera_model: "pinhole",
//             intrinsics: {
//               fx: 615.3,
//               fy: 615.1,
//               cx: 320,
//               cy: 240,
//             },
//             distortion: {
//               k1: -0.12,
//               k2: 0.03,
//               p1: 0,
//               p2: 0,
//             },
//           },
//           coordinate_system: "Right-handed, Z-up, robot-base frame",
//           total_episodes: 12850,
//           file_size: 980,
//           license: "CC-BY-4.0",
//           file_path: "/data/datasets/open_manipulation/v1.2.0",
//           created_at: "2025-11-01T10:30:00Z",
//           updated_at: "2025-12-15T08:45:00Z",
//         },
//         {
//           dataset_id: "660e8400-e29b-41d4-a716-446655440001",
//           dataset_name: "DROID",
//           dataset_version: "v2.0.0",
//           description: "机器人操作系统数据集，包含多种机器人平台的操作数据",
//           robot_model: "Multiple Models",
//           robot_morphology: "Various",
//           gripper: "Various",
//           rgb_cams: 2,
//           depth_cams: 1,
//           wrist_cams: 0,
//           calibration_data: {},
//           coordinate_system: "Standard",
//           total_episodes: 5000,
//           file_size: 450,
//           license: "MIT",
//           file_path: "/data/datasets/droid/v2.0.0",
//           created_at: "2025-09-15T14:20:00Z",
//           updated_at: "2025-11-30T11:15:00Z",
//         },
//         {
//           dataset_id: "770e8400-e29b-41d4-a716-446655440002",
//           dataset_name: "Open-x embodiment",
//           dataset_version: "v0.9.0",
//           description: "开源具身智能数据集，包含多种环境下的机器人操作数据",
//           robot_model: "Multiple Embodied Agents",
//           robot_morphology: "Various",
//           gripper: "Various",
//           rgb_cams: 3,
//           depth_cams: 2,
//           wrist_cams: 1,
//           calibration_data: {},
//           coordinate_system: "Agent-centric",
//           total_episodes: 8000,
//           file_size: 720,
//           license: "Apache-2.0",
//           file_path: "/data/datasets/open_x_embodiment/v0.9.0",
//           created_at: "2025-10-10T09:00:00Z",
//           updated_at: "2025-12-05T16:30:00Z",
//         },
//       ],
//       total: 3,
//     },
//   };

//   res.json(datasets);
// });

// // Start the server
// app.listen(PORT, () => {
//   console.log(`Node.js server running at http://localhost:${PORT}`);
//   console.log("API endpoint: http://localhost:3001/api/datasets");
// });
