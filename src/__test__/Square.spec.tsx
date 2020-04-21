import React from "react";
import { shallow } from "enzyme";
import { Square } from "../components/Square";

describe("Squareコンポーネントのテスト", () => {
  describe("propsのテスト", () => {
    const mockFunction = jest.fn();

    test("valueのテスト", () => {
      const wrapper = shallow(<Square value={"X"} onClick={() => {}} />);
      expect(wrapper.text()).toContain("X");
    });

    test("onClickのテスト", () => {
      const wrapper = shallow(
        <Square
          value={"X"}
          onClick={() => {
            mockFunction();
          }}
        />
      );
      wrapper.simulate("click");
      expect(mockFunction).toHaveBeenCalled();
    });
  });
});

// describe("create snapshot", () => {
//   const component = renderer.create(<Square value={"X"} onClick={() => {}} />);
//   let tree = component.toJSON();
//   expect(tree).toMatchSnapshot();
// });
