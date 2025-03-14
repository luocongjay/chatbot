export const API_BASE = process.env.NEXT_PUBLIC_ANYTHING;

export const SUGGESTS = `您好！欢迎使用PassTo服务。请问您需要了解哪方面的信息？\n例如：账户注册与开通 产品服务 费用说明 数字资产服务 安全保障 客户支持 请告诉我您的具体需求，我会尽力为您提供帮助。`;

export function getPlatformSuggest(): string {
  return SUGGESTS;
}
