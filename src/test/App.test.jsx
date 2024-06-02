import { it, expect, describe } from 'vitest';
import { render, screen, fireEvent } from "@testing-library/react";
import React from "react";
import App from "../App"

describe('How the form and its submit button behaves', () => {
    it('submit should be disabled at the beginning', () => {
        render(<App/>);
        const submitBtn = screen.getByTestId("submit-letter");
        expect(submitBtn).toHaveProperty("disabled", true);
    })

    it('submit should still be disabled if textarea is not empty', () => {
        render(<App/>);
        const submitBtn = screen.getByTestId("submit-letter");
        const textArea = screen.getByTestId("text-area");

        fireEvent.change(textArea, {target: {value: 'Gifts!'}});
        expect(submitBtn).toHaveProperty("disabled", true);
    })

    it('submit should still be disabled if input is not empty', () => {
        render(<App/>);
        const submitBtn = screen.getByTestId("submit-letter");
        const input = screen.getByTestId("input");

        fireEvent.change(input, {target: {value: 'charlie.brown'}});
        expect(submitBtn).toHaveProperty("disabled", true);
    })

    it('submit should be enabled now', () => {
        render(<App/>);
        const submitBtn = screen.getByTestId("submit-letter");
        const textArea = screen.getByTestId("text-area");
        const input = screen.getByTestId("input");

        fireEvent.change(input, {target: {value: "charlie.brown"}});
        fireEvent.change(textArea, {target: {value: "Gift!"}});
        expect(submitBtn).toHaveProperty("disabled", false);
    })
})