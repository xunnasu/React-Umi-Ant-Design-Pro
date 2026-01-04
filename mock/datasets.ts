import type { Request, Response } from 'express';

// mock datasets data
const datasets = {
  errno: 0,
  errmsg: '',
  data: {
    list: [
      {
        dataset_id: '550e8400-e29b-41d4-a716-446655440000',
        dataset_name: 'Open Manipulation Dataset',
        dataset_version: 'v1.2.0',
        description: '用于具身智能与机器人操作学习的多模态数据集，包含RGB、深度、关节状态和动作轨迹。',
        robot_model: 'Franka Emika Panda',
        robot_morphology: '7-DOF 单臂机械臂，固定基座',
        gripper: 'Parallel Gripper',
        rgb_cams: 4,
        depth_cams: 2,
        wrist_cams: 1,
        calibration_data: {
          camera_model: 'pinhole',
          intrinsics: {
            fx: 615.3,
            fy: 615.1,
            cx: 320,
            cy: 240
          },
          distortion: {
            k1: -0.12,
            k2: 0.03,
            p1: 0,
            p2: 0
          }
        },
        coordinate_system: 'Right-handed, Z-up, robot-base frame',
        total_episodes: 12850,
        file_size: 980,
        license: 'CC-BY-4.0',
        file_path: '/data/datasets/open_manipulation/v1.2.0',
        created_at: '2025-11-01T10:30:00Z',
        updated_at: '2025-12-15T08:45:00Z'
      },
    ],
    total: 3
  }
};

function getDatasets(req: Request, res: Response) {
  return res.json(datasets);
}

export default {
  'GET /api/datasets': getDatasets,
};