import { render } from "@testing-library/react";
import SnapshotComponent from "./SnapshotComponent";

it("snapshot test", () => {
  const { container } = render(<SnapshotComponent text="Vue" />);
  expect(container).toMatchSnapshot();
});
