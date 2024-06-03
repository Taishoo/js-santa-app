import { it, expect, describe } from 'vitest';
import { render } from "@testing-library/react";
import React from "react";

describe('main file', () => {
    it('should render React', () => {
        render(<React.StrictMode/>);
    })
})