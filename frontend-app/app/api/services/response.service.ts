export const generateBadRequest = (message: string): Response => {
  return Response.json({ message }, { status: 400 });
};

export const generateFalsePositive = (reason: string): Response => {
  return Response.json({
    isSuccess: false,
    reason,
  });
};

const generateSuccess = <T>(data?: T): Response => {
  return Response.json({
    isSuccess: true,
    data,
  });
};

export default generateSuccess;
