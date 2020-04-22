import React from "react";
import { shallow, mount, ReactWrapper } from "enzyme";
import Game from "../components/Game";
import Board from "../components/Board";
import { Square } from "../components/Square";
import { mountToJson } from "enzyme-to-json";

describe("Gameコンポーネントのテスト", () => {
  let wrapper: ReactWrapper;

  beforeEach(() => {
    wrapper = mount(<Game></Game>);
  });

  test("子コンポーネントが存在すること", () => {
    expect(wrapper.find(Board).length).toBe(1);
    expect(wrapper.find(Square).length).toBe(9);
  });

  describe("振る舞いのテスト", () => {
    test("Next Playerが表示されていること", () => {
      const gameInfo = wrapper.find(".game-info div");
      expect(gameInfo.text()).toContain("Next player: X");
      wrapper.find('[data-index="0"]').simulate("click");
      expect(gameInfo.text()).toContain("Next player: O");
    });

    test("勝利者が表示されていること", () => {
      wrapper.setState({
        history: [
          {
            squares: ["X", "X", "X", "O", "O", null, null, null, null]
          }
        ]
      });
      expect(wrapper.find(".game-info div").text()).toContain("winner: X");
    });

    test("履歴が表示されること", () => {
      wrapper.find('[data-index="0"]').simulate("click");
      wrapper.find('[data-index="1"]').simulate("click");
      expect(wrapper.find(".game-info ol li").length).toBe(3);
      expect(wrapper.find(".game-info ol li:first-child").text()).toContain(
        "Go to game start"
      );
      expect(wrapper.find(".game-info ol li:last-child").text()).toContain(
        "Go to move #2"
      );
    });
  });

  test("snapshot", () => {
    const snapshot = mountToJson(wrapper);
    expect(snapshot).toMatchSnapshot();
  });
});
