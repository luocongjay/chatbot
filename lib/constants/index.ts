export const API_BASE = process.env.NEXT_PUBLIC_ANYTHING;
export const PLATFORM = process.env.NEXT_PUBLIC_PLATFORM as string;

export const SUGGESTS: Record<string, string> = {
  alltick: `您好，我是Alltick的AI客服助手。\n我专注于解答产品套餐、接口、价格、服务相关问题。\n非常高兴能为您提供服务。`,
  creditcard: `您好！欢迎使用PassTo服务。请问您需要了解哪方面的信息？\n例如：账户注册与开通 产品服务 费用说明 数字资产服务 安全保障 客户支持 请告诉我您的具体需求，我会尽力为您提供帮助。`,
  default: "您好！欢迎访问本客服系统",
};

export function getPlatformSuggest(): string {
  return SUGGESTS[PLATFORM] || SUGGESTS.default;
}
