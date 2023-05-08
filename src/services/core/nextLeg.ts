import { TNL } from 'tnl-midjourney-api';

const AUTH_TOKEN: string = process.env.NEXT_PUBLIC_THL_API_KEY!;
const tnl = new TNL(AUTH_TOKEN);
export { tnl, AUTH_TOKEN };