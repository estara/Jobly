import React from "react";
import { render } from "@testing-library/react";
import JoblyProvider from './JoblyProvider';

it("renders without crashing", function() {
  render(<JoblyProvider />);
});

it("matches snapshot", function() {
  const {asFragment} = render(<JoblyProvider />);
  expect(asFragment()).toMatchSnapshot();
});