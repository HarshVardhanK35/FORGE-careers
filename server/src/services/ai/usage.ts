import { AiUsage } from "../../models/AiUsage";
import { todayKeyIst } from "../../utils/dates";
import { aiFailure } from "./errors";

// count one AI call for today, or refuse when the daily limit is reached
export async function reserveCall(userId: string, cap: number): Promise<void> {
  const date = todayKeyIst();

  const used = await AiUsage.findOne({ userId, date });
  if ((used?.count ?? 0) >= cap) {
    throw aiFailure("cap_reached", `The daily AI limit of ${cap} calls is reached`);
  }

  // here "$inc" adds one to today's counter
  // "upsert" creates today's document on the first call. 
  await AiUsage.updateOne({ userId, date }, { $inc: { count: 1 } }, { upsert: true });
}
