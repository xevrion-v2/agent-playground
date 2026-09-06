import { NextApiRequest, NextApiResponse } from 'next';

interface HealthCheckResponse {
  status: string;
  data: {
    message: string;
  };
}

const handler = (req: NextApiRequest, res: NextApiResponse<HealthCheckResponse>) => {
  res.status(200).json({
    status: 'success',
    data: {
      message: 'Service is running',
    },
  });
};

export default handler;