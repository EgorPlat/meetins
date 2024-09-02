import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Confirmation from "../pages/confirmation/index";
 
global.React = React;

it("Snapshot for Confirmation page is valid", () => {
    const { container } = render(<Confirmation />)
    expect(container).toMatchSnapshot()
})
  