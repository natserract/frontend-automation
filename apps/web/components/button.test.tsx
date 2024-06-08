import { act } from "@testing-library/react";

import { createRenderer } from "@/tests/createRenderer";
import { Button } from "@/components/button";

describe("<Button />", () => {
  const { render } = createRenderer();

  describe("prop: children", () => {
    it("should renders children", () => {
      const { getByTestId } = render(<Button>Click Me!</Button>);
      expect(getByTestId("root").innerHTML).toEqual("Click Me!");

      const button = getByTestId("root");
      act(() => {
        button.focus();
      });
    });
  });
});
