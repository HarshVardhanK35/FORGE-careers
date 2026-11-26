import { ROADMAP_SKILLS } from "../src/data/roadmap";
import { buildView, emptyProgress, recordAttempt, RuleError, unlockSkill, updateTopic } from "../src/services/roadmap/rules";
import type { ProgressData } from "../src/services/roadmap/rules";

const NOW = new Date("2026-11-23T10:00:00Z");
const hours = (n: number) => new Date(NOW.getTime() + n * 60 * 60 * 1000);

// JavaScript is the only skill with topics so far
function withJsTicked(): ProgressData {
  const progress = emptyProgress();
  progress.doneTopics = ROADMAP_SKILLS[0].topics.map((topic) => topic.id);
  return progress;
}

const js = (progress: ProgressData, now = NOW) => buildView(progress, now).skills[0];

function code(action: () => void): number | null {
  try {
    action();
    return null;
  } catch (error) {
    return error instanceof RuleError ? error.status : -1;
  }
}

describe("the start", () => {
  it("opens only the first skill, and its levels wait for the topics", () => {
    const view = buildView(emptyProgress(), NOW);
    expect(view.skills[0].unlocked).toBe(true);
    expect(view.skills[1].unlocked).toBe(false);
    expect(view.skills[0].levels.map((level) => level.state)).toEqual(["locked", "locked", "locked"]);
    expect(view.skills[0].levels[0].reason).toBe("Tick every topic to open");
    expect(view.skills[1].levels[0].reason).toBe("Opens with the skill");
  });

  it("opens L1 when every topic is ticked, and keeps L2 and L3 locked", () => {
    const levels = js(withJsTicked()).levels;
    expect(levels.map((level) => level.state)).toEqual(["open", "locked", "locked"]);
    expect(levels[1].reason).toBe("Pass L1 to open");
    expect(levels[2].reason).toBe("Pass L2 to open");
  });

  it("unticking a topic locks the levels again", () => {
    const progress = withJsTicked();
    updateTopic(progress, "js-closures", { done: false });
    expect(js(progress).levels[0].state).toBe("locked");
  });

  it("never opens the tests of a skill that has no topics yet", () => {
    const progress = withJsTicked();
    unlockSkill(progress, "typescript"); // TypeScript has no topics yet
    expect(buildView(progress, NOW).skills[3].levels[0].reason).toBe("Topics coming soon");
  });
});

describe("attempts, passing and waiting", () => {
  it("passes L1 with 19 of 21 and opens L2 at once", () => {
    const progress = withJsTicked();
    expect(recordAttempt(progress, "javascript", 1, 19, NOW)).toEqual({ passed: true, scorePercent: 90 });
    expect(js(progress).levels.map((level) => level.state)).toEqual(["passed", "open", "locked"]);
  });

  it("fails L1 with 18 of 21 and waits 3 hours", () => {
    const progress = withJsTicked();
    expect(recordAttempt(progress, "javascript", 1, 18, NOW).passed).toBe(false);
    expect(js(progress).levels[0].state).toBe("waiting");
    expect(js(progress, hours(2.9)).levels[0].state).toBe("waiting");
    expect(js(progress, hours(3)).levels[0].state).toBe("open");
  });

  it("refuses an attempt while waiting", () => {
    const progress = withJsTicked();
    recordAttempt(progress, "javascript", 1, 10, NOW);
    expect(code(() => recordAttempt(progress, "javascript", 1, 21, hours(1)))).toBe(409);
  });

  it("uses the pass marks of L2 (16 of 18) and L3 (11 of 15), and waits 6 and 12 hours", () => {
    const progress = withJsTicked();
    recordAttempt(progress, "javascript", 1, 21, NOW);

    expect(recordAttempt(progress, "javascript", 2, 15, NOW).passed).toBe(false);
    expect(js(progress, hours(5.9)).levels[1].state).toBe("waiting");
    expect(recordAttempt(progress, "javascript", 2, 16, hours(6)).passed).toBe(true);

    expect(recordAttempt(progress, "javascript", 3, 10, hours(6)).passed).toBe(false);
    expect(js(progress, hours(17.9)).levels[2].state).toBe("waiting");
    expect(recordAttempt(progress, "javascript", 3, 11, hours(18)).passed).toBe(true);
    expect(js(progress, hours(18)).levels.every((level) => level.state === "passed")).toBe(true);
  });

  it("uses fixed sets for attempts 1 to 3 and random questions from attempt 4", () => {
    const progress = withJsTicked();
    const sets = [];
    let now = NOW;
    for (let attempt = 0; attempt < 4; attempt++) {
      sets.push(js(progress, now).levels[0].attemptSet);
      recordAttempt(progress, "javascript", 1, 0, now);
      now = hours(3 * (attempt + 1));
    }
    expect(sets).toEqual([1, 2, 3, null]);
  });

  it("keeps the best score", () => {
    const progress = withJsTicked();
    recordAttempt(progress, "javascript", 1, 10, NOW);
    recordAttempt(progress, "javascript", 1, 5, hours(3));
    expect(js(progress, hours(6)).levels[0].bestScore).toBe(48);
  });

  it("refuses a locked level, a passed level and an impossible score", () => {
    const progress = withJsTicked();
    expect(code(() => recordAttempt(progress, "javascript", 2, 18, NOW))).toBe(409);
    recordAttempt(progress, "javascript", 1, 21, NOW);
    expect(code(() => recordAttempt(progress, "javascript", 1, 21, NOW))).toBe(409);
    expect(code(() => recordAttempt(progress, "javascript", 2, 19, NOW))).toBe(400);
  });
});

describe("Unlock anyway and skips", () => {
  it("marks the unpassed levels of the earlier skills as skipped and opens the skill", () => {
    const progress = withJsTicked();
    recordAttempt(progress, "javascript", 1, 21, NOW);
    unlockSkill(progress, "css");

    const view = buildView(progress, NOW);
    expect(view.skills[0].levels.map((level) => level.state)).toEqual(["passed", "skipped", "skipped"]);
    expect(view.skills[1].unlocked).toBe(true);
  });

  it("opens the skills in between as skipped when a later skill is unlocked", () => {
    const progress = emptyProgress();
    unlockSkill(progress, "react");
    const view = buildView(progress, NOW);
    expect(view.skills[0].levels.every((level) => level.state === "skipped")).toBe(true);
    expect(view.skills[1].levels.every((level) => level.state === "skipped")).toBe(true);
    expect(view.skills[2].unlocked).toBe(true);
  });

  it("lets a skipped level be taken only when the topics are ticked and the level before is passed", () => {
    const progress = emptyProgress();
    unlockSkill(progress, "css");
    expect(js(progress).levels[0].canTake).toBe(false);
    expect(js(progress).levels[0].reason).toBe("Tick every topic to open");

    progress.doneTopics = ROADMAP_SKILLS[0].topics.map((topic) => topic.id);
    const levels = js(progress).levels;
    expect(levels.map((level) => level.canTake)).toEqual([true, false, false]);
    expect(levels[1].reason).toBe("Pass L1 to open");
  });

  it("makes a skipped level 'in progress' when it is taken and failed", () => {
    const progress = withJsTicked();
    unlockSkill(progress, "css");
    recordAttempt(progress, "javascript", 1, 5, NOW);
    expect(js(progress, NOW).levels[0].state).toBe("waiting");
    recordAttempt(progress, "javascript", 1, 19, hours(3));
    expect(js(progress, hours(3)).levels[0].state).toBe("passed");
  });

  it("refuses to unlock the first skill, an open skill, or an unknown skill", () => {
    const progress = emptyProgress();
    expect(code(() => unlockSkill(progress, "javascript"))).toBe(409);
    unlockSkill(progress, "css");
    expect(code(() => unlockSkill(progress, "css"))).toBe(409);
    expect(code(() => unlockSkill(progress, "nope"))).toBe(404);
  });
});

describe("topics and resources", () => {
  it("refuses a tick on an unknown topic", () => {
    expect(code(() => updateTopic(emptyProgress(), "nope", { done: true }))).toBe(404);
  });

  it("saves a trimmed resource, clears it when empty and refuses more than 300 characters", () => {
    const progress = emptyProgress();
    updateTopic(progress, "js-closures", { resource: "  https://javascript.info/closure  " });
    expect(js(progress).topics.find((topic) => topic.id === "js-closures")?.resource).toBe("https://javascript.info/closure");

    updateTopic(progress, "js-closures", { resource: "   " });
    expect(js(progress).topics.find((topic) => topic.id === "js-closures")?.resource).toBe("");

    expect(code(() => updateTopic(progress, "js-closures", { resource: "x".repeat(301) }))).toBe(400);
  });

  it("counts the ticked topics", () => {
    const progress = emptyProgress();
    updateTopic(progress, "js-closures", { done: true });
    updateTopic(progress, "js-closures", { done: true });
    expect(js(progress).topicsDone).toBe(1);
  });
});

describe("fractional points (a question can be half right)", () => {
  it("passes L1 with 19 points and fails with a little less", () => {
    const progress = withJsTicked();
    expect(recordAttempt(progress, "javascript", 1, 18.83, NOW).passed).toBe(false);
    expect(js(progress, hours(3)).levels[0].bestScore).toBe(90);

    const other = withJsTicked();
    expect(recordAttempt(other, "javascript", 1, 19, NOW).passed).toBe(true);
  });

  it("refuses more points than the level has", () => {
    expect(code(() => recordAttempt(withJsTicked(), "javascript", 1, 21.5, NOW))).toBe(400);
  });
});
