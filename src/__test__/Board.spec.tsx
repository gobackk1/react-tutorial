import React from "react";
import Board from "../components/Board";
import { Mark } from "../types";
import { mount, ReactWrapper } from "enzyme";
import { mountToJson } from "enzyme-to-json";

describe("Boardコンポーネントのテスト", () => {
  const mockSquares: Mark[] = [
    "X",
    "O",
    null,
    null,
    null,
    null,
    null,
    null,
    null
  ];
  const handleClickSpy = jest.fn();
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(
      <Board
        squares={mockSquares}
        onClick={() => {
          handleClickSpy();
        }}
      />
    );
  });

  describe("propsのテスト", () => {
    test("squaresが正しく表示されていること", () => {
      expect(wrapper.find('[data-index="0"]').text()).toContain("X");
      expect(wrapper.find('[data-index="1"]').text()).toContain("O");
      for (let i = 2; i < mockSquares.length; i++) {
        expect(wrapper.find(`[data-index="${i}"]`).text()).toContain("");
      }
    });

    test("onClickがSquareへ渡されていること", () => {
      const square = wrapper.find('[data-index="0"]');
      square.simulate("click");
      expect(handleClickSpy).toHaveBeenCalled();
    });
  });

  test("snapshot", () => {
    const snapshot = mountToJson(wrapper);
    expect(snapshot).toMatchSnapshot();
  });
});
