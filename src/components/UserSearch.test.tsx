import { render, screen, waitFor } from "@testing-library/react";
import axios from "axios";
import { UserSearch } from "./UserSearch";
import userEvent from "@testing-library/user-event";

jest.mock("axios");
const mockAxios = jest.mocked(axios);

const user = userEvent.setup();

describe("UserSearch", () => {
  beforeEach(() => {
    mockAxios.get.mockReset();
  });

  it("Submit api request by the text input", async () => {
    const userInfo = {
      id: 1,
      name: "Taro",
    };
    const resp = { data: userInfo };
    mockAxios.get.mockResolvedValue(resp);

    render(<UserSearch />);

    const input = screen.getByRole("textbox");
    await user.type(input, userInfo.name);
    const button = screen.getByRole("button");
    await user.click(button);
    expect(mockAxios.get).toHaveBeenCalledWith(`/api/users?query=${userInfo.name}`);
  });

  it("The user information is displayed from api", async () => {
    const userInfo = {
      id: 1,
      name: "Taro",
    };
    const resp = { data: userInfo };
    mockAxios.get.mockResolvedValue(resp);

    render(<UserSearch />);

    const input = screen.getByRole("textbox");
    await user.type(input, userInfo.name);
    const button = screen.getByRole("button");
    await user.click(button);
    await waitFor(() => {
      expect(screen.getByText(userInfo.name)).toBeInTheDocument();
    });
  });
});
