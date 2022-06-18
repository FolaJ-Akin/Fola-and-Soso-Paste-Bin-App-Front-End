import { getSummary } from "./getSummary";

test("getSummary returns a string of just 5 words", () => {
  expect(getSummary("We have not figured out our play by play")).toStrictEqual(
    "We have not figured out..."
  );
  expect(getSummary("test summary")).toStrictEqual("test summary...");
  expect(getSummary("Dont try to even do it")).toStrictEqual(
    "Dont try to even do..."
  );
});
