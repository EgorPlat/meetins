import "@testing-library/jest-dom";
import { getTimerFromSeconds, getCategoryName } from "../shared/helpers/helper";
import { CATEGORY_NAMES } from "../shared/helpers/constants";

it("getTimerFromSeconds(number) => `minutes:seconds` ", () => {
    expect(getTimerFromSeconds(86400)).toBe(`${1440}:${0}`);
});

it("getCategoryName(string) => { ru: string, en: string } || null", () => {
    CATEGORY_NAMES.forEach(category => {
        expect(getCategoryName(category.en)).toEqual(category.ru);
    });
});