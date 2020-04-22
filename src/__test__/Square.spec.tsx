import React from "react";
import { shallow, ShallowWrapper } from "enzyme";
import { Square } from "../components/Square";
import { shallowToJson } from "enzyme-to-json";

describe("Squareコンポーネントのテスト", () => {
  const handleClickSpy = jest.fn();
  let wrapper: ShallowWrapper;
  beforeEach(() => {
    wrapper = shallow(
      <Square
        value={"X"}
        onClick={() => {
          handleClickSpy();
        }}
      />
    );
  });

  describe("propsのテスト", () => {
    test("valueの文字列が表示されること", () => {
      expect(wrapper.text()).toContain("X");
      wrapper.setProps({ value: "O" });
      expect(wrapper.text()).toContain("O");
    });

    test("onClickが呼び出されること", () => {
      wrapper.simulate("click");
      expect(handleClickSpy).toHaveBeenCalled();
    });
  });

  test("snapshot", () => {
    const snapshot = shallowToJson(wrapper);
    expect(snapshot).toMatchSnapshot();
  });
});
