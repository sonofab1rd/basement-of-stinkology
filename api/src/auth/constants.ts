console.log('process.env.BOS_JWT_SECRET', process.env.BOS_JWT_SECRET);

export const jwtConstants = () => ({
  secret: process.env.BOS_JWT_SECRET,
});
