import { prepareResumeForAi } from "../src/utils/aiText";

describe("prepareResumeForAi", () => {
  it("replaces an email address", () => {
    const result = prepareResumeForAi("Mail me at a.b@example.com please");

    expect(result).toContain("[email]");
    expect(result).not.toContain("example.com");
  });

  it("replaces a phone number", () => {
    const result = prepareResumeForAi("Call +91 98765 43210 today");

    expect(result).toContain("[phone]");
    expect(result).not.toContain("98765");
  });

  it("keeps a year range", () => {
    const text = "Worked Jan 2019 - 2023 here";

    expect(prepareResumeForAi(text)).toBe(text);
  });

  it("replaces links", () => {
    const result = prepareResumeForAi("https://github.com/someone and www.linkedin.com/in/someone");

    expect(result).toBe("[link] and [link]");
  });

  it("cuts the text to 12,000 characters", () => {
    expect(prepareResumeForAi("a".repeat(20000)).length).toBe(12000);
  });
});
